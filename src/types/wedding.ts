export interface GuestInfo {
  id: string;
  name: string;
  group?: string; // Ví dụ: "Bạn Chú Rể", "Họ Nhà Trai", "Đồng Nghiệp"
  role?: string;  // "vip", "family", "friend", v.v.
  customGreeting?: string; // Lời nhắn riêng gửi tới khách này
}

export interface RsvpSubmission {
  guestId?: string;
  fullName: string;
  name?: string; // Hỗ trợ tương thích ngược
  phone?: string;
  isAttending: boolean;
  accompanyingGuests: number;
  guestCount?: number; // Hỗ trợ tương thích ngược
  side: 'Nhà trai' | 'Nhà gái' | 'groom' | 'bride';
  wishes?: string;
  turnstileToken?: string;
}

export interface BankAccount {
  ownerName: string;
  bankName: string;
  bankId: string; // Mã chuẩn VietQR (e.g. 'VCB', 'TCB', 'MB', 'ICB')
  accountNumber: string;
  qrUrl?: string; // Custom QR nếu có hoặc tự động sinh VietQR
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface GalleryPhotoItem {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface WishItem {
  id?: string;
  name: string;
  wishes: string;
  createdAt?: string;
  side?: 'groom' | 'bride' | 'Nhà trai' | 'Nhà gái';
}

export interface WeddingConfig {
  groom: {
    name: string;
    fullName: string;
    fatherName?: string;
    motherName: string;
    bank: BankAccount;
    avatarUrl: string;
  };
  bride: {
    name: string;
    fullName: string;
    fatherName?: string;
    motherName: string;
    bank: BankAccount;
    avatarUrl: string;
  };
  heroUrl?: string;
  backgroundUrl?: string;
  event: {
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    isoDateTime: string; // 2026-11-22T09:00:00+07:00
    lunarDate: string; // Ngày Âm lịch
    venueName: string;
    venueAddress: string;
    mapUrl: string;
    mapEmbedUrl?: string;
  };
  music: {
    audioUrl: string;
    songTitle: string;
    artist: string;
  };
  gallery: GalleryPhotoItem[];
  timeline: TimelineEvent[];
  api: {
    baseUrl: string;
    receiverEndpoint: string;
    submitFormEndpoint: string;
    wishesEndpoint: string;
    turnstileSiteKey?: string;
  };
}
