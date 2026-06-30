# Rinjani UI - Panel Components

Komponen Panel (Layout, Navbar, Sidebar) saat ini telah dirombak menggunakan pola **Props Tree** untuk memastikan arsitektur yang bersih, modular, dan terhindar dari *prop drilling*.

## 📝 TODO: Dinamisasi Komponen Navbar

Saat ini, `NavbarNotification` dan `NavbarUserAccount` masih bersifat statis (hanya merender *props* mentah tanpa *state management* atau *action* asinkron tingkat lanjut). Berikut adalah langkah-langkah selanjutnya yang perlu kita kembangkan:

### 1. Dinamisasi `NavbarNotification`
- [ ] **State Management:** Tambahkan fitur *loading state* (contoh: *skeleton loader*) saat data notifikasi sedang diambil dari API.
- [ ] **Aksi "Mark as Read":** Saat ini klik pada notifikasi belum memiliki *feedback* visual (seperti mengubah *background* atau menghapus tanda "New"). Perlu ada *event handler* `onRead` atau *state* lokal untuk membedakan mana yang belum/sudah dibaca.
- [ ] **Pagination / Infinite Scroll:** Jika notifikasinya sangat banyak, kita harus memikirkan cara me-render *list* yang panjang di dalam *dropdown* (misal: tombol *Load More* di bagian bawah sebelum tombol *View All*).
- [ ] **Badge Dinamis:** Angka pada ikon *bell* saat ini hanya mendeteksi panjang dari *array*. Seharusnya angka tersebut mewakili jumlah pesan dengan *flag* `isRead: false`.

### 2. Dinamisasi `NavbarUserAccount`
- [ ] **Manajemen Peran yang Dinamis:** Pengecekan akses *Settings* saat ini sangat kaku (`SETTINGS_ROLE_CODES = ['super', 'admin']`). Kita harus memberikan fleksibilitas (*props*) agar pengguna *library* bisa menentukan secara spesifik role apa saja yang berhak melihat menu *Settings*, atau cukup meneruskan struktur menu akun tersebut sebagai *array*.
- [ ] **Aksi Asinkron saat Logout:** Ketika tombol "Sign Out" ditekan, sebaiknya kita menyematkan ikon *spinner* atau indikator *loading* di dalam tombol secara alami (mengubah `LogOutIcon` menjadi *spinner*).
- [ ] **Menu Profil yang Lebih Bebas:** Daripada hanya menyediakan tombol *Settings* dan *Sign Out*, akan sangat keren jika pengembang bisa menyelipkan menu-menu baru (seperti "Billing", "My Profile", dsb) tanpa harus membongkar komponen. (Catatan: Mungkin kita butuh properti `menuItems` tambahan khusus untuk akun).

### 3. Integrasi Dropdown & Mobile Responsiveness
- [ ] **Swipe Gesture:** Pastikan pada layar sentuh (HP), elemen-elemen *dropdown* bisa ditutup dengan melakukan *swipe* atau menyentuh area luar dengan lebih natural.
- [ ] **Tooltip:** Tambahkan *tooltip* sederhana ketika layar berada di ukuran desktop dan pengguna menyorot ikon atau foto profil tanpa mengkliknya.

---

> **Catatan:** Semua ide di atas bertujuan agar Panel Rinjani UI bukan sekadar UI mentah, tapi juga siap diintegrasikan dengan logika aplikasi tingkat lanjut.
