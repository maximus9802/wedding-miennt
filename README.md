# Thiệp Cưới Online — Xuân Phú & Nguyễn Miền 💍

Trang web thiệp cưới online cao cấp, tối ưu hiển thị hoàn hảo trên điện thoại di động (mobile-first), tích hợp hiệu ứng mở phong bì cá nhân hóa, phát nhạc nền lãng mạn, album ảnh cưới, bản đồ chỉ đường và xác nhận tham dự (RSVP).

---

## 🌟 Tính Năng Nổi Bật

1. **Hiệu ứng Mở Phong Bì Cá Nhân Hóa (Personalized Wax-sealed Envelope)**:
   - Tự động nhận diện khách mời qua URL: `?to={id}` (ví dụ: `?to=anh-tuan` hoặc `?to=FAM-01`).
   - Gọi API Backend lấy danh xưng khách mời & hiển thị thiệp mời khắc tên riêng.
   - Con dấu sáp dập nổi chữ lồng **P & M** (Xuân Phú & Nguyễn Miền).
   - Hiệu ứng mở nắp phong bì, bắn pháo hoa kim tuyến (confetti) và tự động bật nhạc nền lãng mạn.
2. **Hero & Countdown Timer**:
   - Đếm ngược từng giây đến **09:00 ngày 15/11/2026**.
   - Tích hợp nút **"Lưu vào Lịch Google"** (1 chạm thêm sự kiện vào điện thoại).
3. **Thời gian & Địa điểm (Google Maps 1 chạm)**:
   - Địa điểm: Nhà văn hóa thôn 5, Đông Am, Tam Cường, Vĩnh Bảo, Hải Phòng.
   - Nút mở ứng dụng **Google Maps** dẫn đường trực tiếp: `https://maps.app.goo.gl/5645vSd99CY43oPZA`.
   - Nút sao chép địa chỉ tiện lợi.
4. **Lịch trình Lễ Cưới (Timeline)**:
   - Đón khách $\rightarrow$ Lễ Thành Hôn $\rightarrow$ Khai tiệc $\rightarrow$ Tiễn khách.
5. **Album ảnh cưới (Photo Gallery & Lightbox)**:
   - Dễ dàng thay thế link ảnh từ Cloudflare hoặc Google Drive.
   - Chạm vào ảnh để phóng to toàn màn hình (Lightbox) xem cực nét trên điện thoại.
6. **Xác nhận tham dự & Sổ lưu bút (RSVP Form)**:
   - Khách xác nhận có đi không, số người đi cùng, khách nhà trai/gái, gửi lời chúc phúc.
   - Kết nối trực tiếp vào API `POST /functions/v1/wedding/submit-form`.
7. **Hộp mừng cưới Online (VietQR)**:
   - Hỗ trợ mã VietQR tự động sinh theo STK của Chú rể và Cô dâu.
   - Nút sao chép số tài khoản nhanh chóng.
8. **Trình phát nhạc nổi (Floating Music Player)**:
   - Nút xoay đĩa nhạc bật/tắt nhạc MP3 bất cứ lúc nào.

---

## 🚀 Hướng Dẫn Chạy Thử Trên Máy (Local)

1. Mở terminal tại thư mục này:
   ```bash
   cd /home/quyvx/Documents/Personal/weeding
   ```
2. Chạy lệnh dev:
   ```bash
   npm run dev
   ```
3. Mở trình duyệt truy cập:
   - Giao diện mặc định: `http://localhost:3000`
   - Xem thử thiệp mời cá nhân hóa cho bạn bè: `http://localhost:3000/?to=anh-tuan`
   - Xem thử thiệp mời cho họ hàng: `http://localhost:3000/?to=FAM-01`
   - Xem thử thiệp VIP: `http://localhost:3000/?to=VIP-01`

---

## ⚙️ Cấu Hình API & Ảnh Cưới

### 1. Kết Nối API Backend
Khi bạn có Base URL của API, tạo file `.env.local` ở thư mục gốc:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-domain-name.com
```
Hệ thống sẽ tự động gọi:
* `GET ${NEXT_PUBLIC_API_BASE_URL}/functions/v1/wedding/receiver?id={id}`
* `POST ${NEXT_PUBLIC_API_BASE_URL}/functions/v1/wedding/submit-form`

### 2. Thay Ảnh Cưới (Cloudflare / Link Ngoài)
Mở file `src/config/wedding.ts`:
* Thay đổi mảng `gallery` bằng danh sách URL ảnh trên Cloudflare R2 / Images của bạn.
* Cập nhật số tài khoản ngân hàng thực tế của Chú rể và Cô dâu trong phần `bank`.
