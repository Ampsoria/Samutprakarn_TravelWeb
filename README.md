# 🌊 Samut Prakan Travel Web App 🇹🇭✨

ยินดีต้อนรับสู่โปรเจ็กต์เว็บไซต์แนะนำการเดินทางและจัดการข้อมูลสถานที่ท่องเที่ยวในจังหวัดสมุทรปราการ! 🗺️📸 

---

## 🔐 บัญชีเข้าทดสอบระบบ (Demo Credentials)

### 🛠️ สำหรับผู้ดูแลระบบ (Admin Role)
* **📍 เข้าสู่ระบบที่:** [login.html](login.html) → กดปุ่ม "🛠️ เข้าสู่ระบบ Admin"
* **📧 Email:** `admin@samutprakan.com`
* **🔑 Password:** `admin123`
* ระบบจะพาไปหน้า Admin Dashboard อัตโนมัติ

### 👤 สำหรับผู้ใช้งานทั่วไป (User Role)
* **📍 เข้าสู่ระบบที่:** [login.html](login.html)
* **📧 Email:** `somchai@email.com`
* **🔑 Password:** `password123`

> 💡 **หมายเหตุ:** สามารถเข้าเว็บดูสถานที่ท่องเที่ยวได้โดยไม่ต้อง Login  
> Login จำเป็นสำหรับ**ให้ดาว/เขียนรีวิว**เท่านั้น

---

## 🌟 ฟีเจอร์เด่น (Key Features)

- 🖼️ **Image Upload:** อัปโหลดรูปสถานที่ได้โดยตรง (JPG, PNG, WebP สูงสุด 5MB)
- 🌐 **Bilingual System (TH/EN):** สลับภาษาไทย-อังกฤษได้ทั้งระบบ
- 🎨 **Modern & Premium UI/UX:** ดีไซน์ทันสมัย, Glassmorphism, Hover effects
- 📱 **100% Responsive Design:** รองรับสมาร์ทโฟน แท็บเล็ต และคอมพิวเตอร์
- 🛠️ **Admin Panel:** ระบบหลังบ้านครบจบ:
  - 📊 Dashboard สถิติ
  - 🏝️ เพิ่ม/แก้ไข/ลบ สถานที่ + อัปโหลดรูป
  - 👥 จัดการผู้ใช้งาน
  - ⭐ อนุมัติ/ลบ รีวิว

---

## 📁 โครงสร้างโปรเจ็กต์ (Project Structure)

```text
Samutprakan_Travelweb/
├── css/             # สไตล์ชีต (Global, Layout, Components)
├── js/              # JavaScript (api.js, main.js)
├── server/          # Backend (Express, Prisma, API routes)
├── prisma/          # Database schema & seed data
├── uploads/         # รูปภาพที่อัปโหลด
├── home.html        # หน้าหลัก (Landing page — ไม่ต้อง Login)
├── login.html       # หน้าเข้าสู่ระบบ / สมัครสมาชิก
├── search.html      # หน้าค้นหาสถานที่
├── detail.html      # หน้ารายละเอียดสถานที่
├── profile.html     # หน้าโปรไฟล์ผู้ใช้
├── stats.html       # หน้าสถิติ
└── admin-*.html     # หน้า Admin (Dashboard, Places, Users, Reviews)
```

---

## 🚀 วิธีการรันโปรเจ็กต์ (Getting Started)

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. สร้างฐานข้อมูลและ seed ข้อมูลเริ่มต้น
npx prisma db push
npx prisma db seed

# 3. รันเซิร์ฟเวอร์
node server/index.js

# 4. เปิดเบราว์เซอร์ไปที่
# http://localhost:3000
```

---

## 🗄️ ดูฐานข้อมูล (Database Viewer)

```bash
npx prisma studio
```

เปิดเบราว์เซอร์ไปที่ **http://localhost:5555** จะเห็นข้อมูลทุก table:
Users, Places, Reviews, Bookmarks, PlaceImages, Categories ฯลฯ  
สามารถดู แก้ไข เพิ่ม ลบข้อมูลได้โดยตรง

---
*Created with ❤️ for Samut Prakan Tourism.*
