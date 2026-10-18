import { GuestInfo, RsvpSubmission, WishItem } from '@/types/wedding';
import { weddingConfig } from '@/config/wedding';

/**
 * Format slug or code into friendly display name as fallback
 */
function formatIdToFallbackName(id: string): string {
  if (!id) return '';
  // Check for common prefix like VIP-01, FAM-01
  if (/^[A-Z]+-\d+$/i.test(id)) {
    return `Khách Quý (${id.toUpperCase()})`;
  }

  // Convert kebab-case or snake-case like "anh-tuan" -> "Anh Tuan"
  return id
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Fetch guest info by ID from Backend Edge Function
 */
export async function fetchGuestInfo(id: string): Promise<GuestInfo | null> {
  if (!id || id.trim() === '') {
    return null;
  }

  const { baseUrl, receiverEndpoint } = weddingConfig.api;

  if (baseUrl) {
    try {
      const targetUrl = `${baseUrl.replace(/\/$/, '')}${receiverEndpoint}?id=${encodeURIComponent(id)}`;
      const res = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!res.ok) {
        console.warn(`[API] Failed to fetch guest info for id "${id}": HTTP ${res.status}`);
        return {
          id,
          name: formatIdToFallbackName(id),
          group: 'Khách Quý',
        };
      }

      const data = await res.json();
      return {
        id,
        name: data.name || formatIdToFallbackName(id),
        group: data.group || data.role || 'Khách Mời',
        role: data.role,
        customGreeting: data.customGreeting || data.greeting,
      };
    } catch (err) {
      console.error('[API] Error calling receiver API:', err);
      return {
        id,
        name: formatIdToFallbackName(id),
        group: 'Khách Quý',
      };
    }
  }

  // Fallback demo mode when baseUrl is not configured yet
  return {
    id,
    name: formatIdToFallbackName(id),
    group: id.toUpperCase().includes('FAM') ? 'Gia Đình & Họ Hàng' : 'Bạn Bè Thân Thiết',
    customGreeting: 'Rất mong được đón tiếp bạn và người thương trong ngày hạnh phúc của tụi mình!',
  };
}

/**
 * Submit RSVP confirmation form to Edge Function
 */
export async function submitRsvp(
  submission: RsvpSubmission
): Promise<{ success: boolean; message?: string }> {
  const { baseUrl, submitFormEndpoint } = weddingConfig.api;

  if (baseUrl) {
    try {
      const targetUrl = `${baseUrl.replace(/\/$/, '')}${submitFormEndpoint}`;

      const payload = {
        fullName: (submission.fullName || submission.name || '').trim(),
        isAttending: Boolean(submission.isAttending),
        accompanyingGuests: submission.isAttending
          ? Number(submission.accompanyingGuests ?? submission.guestCount ?? 0)
          : 0,
        side:
          submission.side === 'Nhà gái' || submission.side === 'bride'
            ? 'Nhà gái'
            : 'Nhà trai',
        wishes: (submission.wishes || '').trim(),
        turnstileToken: submission.turnstileToken || '',
      };

      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok || resData.success === false) {
        console.error('[API] RSVP submit failed:', resData);
        return {
          success: false,
          message:
            resData.error ||
            resData.message ||
            'Không thể gửi phản hồi. Vui lòng thử lại sau giây lát!',
        };
      }

      // Notify other components (like FloatingWishes) that a new wish has been submitted
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('wedding:wish-submitted'));
      }

      return {
        success: true,
        message: resData.message || 'Gửi xác nhận thành công!',
      };
    } catch (err) {
      console.error('[API] Network error submitting RSVP:', err);
      return {
        success: false,
        message: 'Lỗi kết nối mạng. Vui lòng kiểm tra lại đường truyền!',
      };
    }
  }

  // Simulation fallback in local development when no baseUrl
  await new Promise((resolve) => setTimeout(resolve, 800));
  console.log('[Dev Mode Mock RSVP Submitted]:', submission);
  return {
    success: true,
    message: 'Gửi xác nhận tham dự thành công!',
  };
}

const DEFAULT_MOCK_WISHES: WishItem[] = [
  {
    id: '1',
    name: 'Anh Tuấn & Gia Đình',
    wishes: 'Chúc hai em Phú & Miền trăm năm hạnh phúc, đầu bạc răng long, mãi mãi mặn nồng như thuở ban đầu! 💖',
    side: 'Nhà trai',
  },
  {
    id: '2',
    name: 'Gia đình Bác Ba',
    wishes: 'Chúc mừng hai cháu! Chúc hai cháu một đời an yên, luôn yêu thương, nhường nhịn và cùng nhau thấu hiểu!',
    side: 'Nhà trai',
  },
  {
    id: '3',
    name: 'Chị Lan & Bé Bắp',
    wishes: 'Chúc mừng ngày hạnh phúc của em gái Miền và em rể Phú! Chúc gia đình nhỏ luôn ngập tràn tiếng cười!',
    side: 'Nhà gái',
  },
  {
    id: '4',
    name: 'Hội Bạn Thân Chú Rể',
    wishes: 'Chúc mừng người anh em đã chính thức tìm được bến đỗ bình yên! Trăm năm tình viên mãn, bạc đầu nghĩa phu thê!',
    side: 'Nhà trai',
  },
  {
    id: '5',
    name: 'Bạn Thu Thảo',
    wishes: 'Cô dâu Miền hôm nay xinh đẹp tuyệt trần! Chúc hai bạn một hành trình mới ngập tràn niềm vui và may mắn!',
    side: 'Nhà gái',
  },
  {
    id: '6',
    name: 'Team Đồng Nghiệp Chú Rể',
    wishes: 'Cả team chúc vợ chồng Phú - Miền luôn tràn đầy hạnh phúc, sự nghiệp thăng hoa, gia đình viên mãn!',
    side: 'Nhà trai',
  },
];

/**
 * Fetch wishes from Backend API (get-wedding-wishes) or fallback to mock wishes
 */
export async function fetchWishes(page = 1, limit = 50): Promise<WishItem[]> {
  const { baseUrl, wishesEndpoint } = weddingConfig.api;

  if (baseUrl) {
    try {
      let endpoint = wishesEndpoint || '/functions/v1/get-wedding-wishes';
      if (!endpoint.includes('?')) {
        endpoint += `?page=${page}&limit=${limit}`;
      }
      const targetUrl = `${baseUrl.replace(/\/$/, '')}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

      const res = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        // Support { data: [...] }, direct array [...], or { wishes: [...] }
        const rawList = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
            ? data.data
            : Array.isArray(data.wishes)
              ? data.wishes
              : [];

        if (rawList.length > 0) {
          const mappedList: WishItem[] = rawList
            .map((item: Record<string, unknown>, idx: number) => ({
              id: String(item.id || idx),
              name: String(item.fullName || item.full_name || item.name || 'Người thương gửi chúc'),
              wishes: String(item.wishes || item.message || item.content || ''),
              createdAt: item.createdAt ? String(item.createdAt) : item.created_at ? String(item.created_at) : undefined,
              side:
                item.side === 'Nhà gái' || item.side === 'bride'
                  ? ('Nhà gái' as const)
                  : ('Nhà trai' as const),
            }))
            .filter((item: WishItem) => item.wishes && item.wishes.trim() !== '');

          if (mappedList.length > 0) {
            return mappedList;
          }
        }
      }
    } catch (err) {
      console.error('[API] Error fetching wishes from API:', err);
    }
  }

  return DEFAULT_MOCK_WISHES;
}
