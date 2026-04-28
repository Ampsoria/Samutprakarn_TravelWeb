# 🌊 Samut Prakan Travel Web App 🇹🇭✨

ยินดีต้อนรับสู่โปรเจ็กต์เว็บไซต์แนะนำการเดินทางและจัดการข้อมูลสถานที่ท่องเที่ยวในจังหวัดสมุทรปราการ! 🗺️📸 
เว็บไซต์นี้ถูกพัฒนาให้มีความสวยงาม ทันสมัย และสามารถทำงานได้จริง โดยมีการใช้ **Node.js** และ **Prisma** เป็นระบบหลังบ้านพร้อมฐานข้อมูล SQLite ครับ 🚀

---

## 🔐 บัญชีเข้าทดสอบระบบ (Demo Credentials)

คุณสามารถทดสอบสวมบทบาทการใช้งานของ **ผู้ใช้งานทั่วไป (User)** และ **ผู้ดูแลระบบ (Admin)** ได้ด้วยบัญชีด้านล่างนี้เลยครับ 👇

### 👤 สำหรับผู้ใช้งานทั่วไป (User Role)
* **📍 เข้าสู่ระบบที่:** [home.html](home.html)
* **📧 Email:** `somchai@email.com`
* **🔑 Password:** `password`

### 🛠️ สำหรับผู้ดูแลระบบ (Admin Role)
* **📍 เข้าสู่ระบบที่:** home.html (ระบบจะพาไปหน้า Admin Dashboard อัตโนมัติเมื่อตรวจพบ Role: Admin)
* **📧 Email:** `admin@samutprakan.com`
* **🔑 Password:** `admin`

*(💡 หมายเหตุ: หรือคุณสามารถลอง "สมัครสมาชิกใหม่" (Register) ด้วยตนเองในหน้าแรกได้เลย ข้อมูลจะถูกบันทึกไว้ใน Browser ของคุณทันทีครับ)*

---

## 🌟 ฟีเจอร์เด่น (Key Features)

- 💾 **Fully Functional via Database & API:** ไม่ใช่แค่หน้าตา Mockup แต่ฟังก์ชันทั้งหมด (เพิ่ม/ลบ/แก้ไขข้อมูล, สมัครสมาชิก, คอมเมนต์, ค้นหา) สามารถใช้งานและบันทึกข้อมูลลงฐานข้อมูลได้จริง
- 📸 **Authentic Images:** ดึงรูปภาพสถานที่ท่องเที่ยวอันสวยงามของจริงจาก Wikipedia Commons
- 🌐 **Bilingual System (TH/EN):** สลับภาษาไทย-อังกฤษได้อย่างไร้รอยต่อ ทั้งระบบหน้าบ้าน (User) และหลังบ้าน (Admin)
- 🎨 **Modern & Premium UI/UX:** ดีไซน์กระจก (Glassmorphism), สีสันสดใส, เอฟเฟกต์การชี้ (Hover), และความลื่นไหลระดับแอปพลิเคชันจริง
- 📱 **100% Responsive Design:** รองรับการใช้งานอย่างสมบูรณ์แบบบนสมาร์ทโฟน แท็บเล็ต และคอมพิวเตอร์
- ❤️ **Personalized Experience:** มีระบบเลือกความสนใจ (Tags), หน้าต่าง Profile ที่บันทึกรายการโปรด (Bookmarks)
- 🛠️ **Comprehensive Admin Panel:** ระบบหลังบ้านที่ครบจบในตัวเดียว:
  - 📊 ดูภาพรวมสถิติ (Dashboard)
  - 👥 แบน/จัดการผู้ใช้งาน (User Management)
  - 🏝️ เพิ่ม/ลบ สถานที่ท่องเที่ยวต่างๆ (Place Management)
  - ⭐ อนุมัติ/ลบ รีวิวจากผู้ใช้งาน (Review Moderation)

---

## � โครงสร้างโปรเจ็กต์ (Project Structure)

```text
Samutprakan_Travelweb/
├── css/             # แหล่งรวมสไตล์ชีต (Global, Layout, Components)
├── js/              # ไฟล์ JavaScript หลัก (main.js จัดการข้อมูล/localStorage)
├── login.html       # หน้า เข้าสู่ระบบ/สมัครสมาชิก
├── home.html        # หน้าหลัก (แนะนำสถานที่, ฮิตติดเทรนด์) (จุดเริ่มต้น)
├── search.html      # หน้าค้นหาและใช้ตัวกรอง
├── detail.html      # หน้าดูรายละเอียดสถานที่และอ่านรีวิว
├── profile.html     # หน้าโปรไฟล์ผู้ใช้และรายการโปรด (Bookmark)
├── stats.html       # หน้าแสดงสถิติการท่องเที่ยว
└── admin-*.html     # หน้าสำหรับผู้ดูแลระบบ (Dashboard, Places, Users, Reviews)
```

---

## 🚀 วิธีการติดตั้งและรันโปรเจ็กต์ (Getting Started)

โปรเจ็กต์นี้ใช้ **Node.js** เป็นเซิร์ฟเวอร์ และ **Prisma** ในการจัดการฐานข้อมูล (SQLite)

### ขั้นตอนการรัน
1. โคลน (Clone) หรือดาวน์โหลดโปรเจ็กต์นี้ลงในเครื่องของคุณ และเปิด Terminal ในโฟลเดอร์นี้
2. ติดตั้ง Dependencies ด้วยคำสั่ง:
   ```bash
   npm install
   ```
3. เริ่มรันโปรเจ็กต์ด้วยคำสั่ง:
   ***วิธีนี้ต้องใช้สิทธิ์ Administrator ในการตั้งค่าครั้งแรกครั้งเดียว:
   คลิกที่ปุ่ม Windows หรือช่องค้นหา พิมพ์คำว่า PowerShell
   คลิกขวาที่ Windows PowerShell แล้วเลือก Run as Administrator (รันในฐานะผู้ดูแลระบบ)
   คัดลอกคำสั่งนี้ Set-ExecutionPolicy RemoteSigned แล้วกด Enter: แล้วกด Y
   ***จากนั้นเข้า Termanal ของ IDE พิมคำสั่ง npm run dev

4. เปิดเว็บเบราว์เซอร์แล้วเข้าไปที่ `http://localhost:3000`
5. เข้าสู่ระบบด้วยบัญชี Demo ข้างต้น แล้วสนุกได้เลย! 🎉�

---
*Created with ❤️ for Samut Prakan Tourism.*
