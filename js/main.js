document.addEventListener('DOMContentLoaded', () => {

    /* --- Interactive Tags (Auth Page) --- */
    const tagBtns = document.querySelectorAll('.tag-btn');
    tagBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('active');
        });
    });

    /* --- Auth Page Tab Switch --- */
    const showLoginBtn = document.getElementById('showLogin');
    const showRegisterBtn = document.getElementById('showRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (showLoginBtn && showRegisterBtn && loginForm && registerForm) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginBtn.classList.add('active');
            showRegisterBtn.classList.remove('active');
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        });

        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showRegisterBtn.classList.add('active');
            showLoginBtn.classList.remove('active');
            registerForm.style.display = 'block';
            loginForm.style.display = 'none';
        });
    }

});

/* === Language Translation Dictionary === */
const translations = {
    th: {
        'nav_home': 'หน้าแรก',
        'nav_search': 'ค้นหา',
        'nav_stats': 'สถิติ',
        'nav_profile': 'โปรไฟล์',
        'nav_admin': 'AdminPanel',
        'auth_title': 'ยินดีต้อนรับสู่<br><span style="color: var(--primary-orange);">สมุทรปราการ</span>',
        'auth_login': 'เข้าสู่ระบบ',
        'auth_register': 'สมัครสมาชิก',
        'auth_email': 'อีเมล',
        'auth_password': 'รหัสผ่าน',
        'auth_forgot': 'ลืมรหัสผ่าน?',
        'auth_name': 'ชื่อ - นามสกุล',
        'auth_interest': 'เลือกสิ่งที่คุณสนใจ (เพื่อแนะนำสถานที่)',
        'auth_btn_login': 'เข้าสู่ระบบ',
        'auth_btn_register': 'สร้างบัญชีและเริ่มเดินทาง',
        'auth_admin_demo': 'เข้าสู่ระบบในฐานะ Admin (Demo)',
        'tag_cafe': '☕ คาเฟ่',
        'tag_temple': '🛕 วัดและธรรมะ',
        'tag_nature': '🌳 ธรรมชาติ',
        'tag_photo': '📸 จุดถ่ายรูป',
        'tag_food': '🍽️ ร้านอาหารเด็ด',
        'home_hello': 'สวัสดี, สมชาย! 👋',
        'home_hero': 'คุณอยากไปไหน<br>ใน<span style="color: var(--primary-orange);">สมุทรปราการ</span>วันนี้?',
        'home_search': 'ค้นหาสถานที่, อำเภอ, ประเภท...',
        'home_search_btn': 'ค้นหา',
        'home_recom': 'แนะนำสำหรับคุณ (สายเข้าวัด)',
        'home_view_all': 'ดูทั้งหมด >',
        'home_trending': 'กำลังมาแรง 🔥',
        'badge_temple': 'วัดและธรรมะ',
        'badge_art': 'ศิลปวัฒนธรรม',
        'badge_history': 'สถานที่ประวัติศาสตร์',
        'badge_nature': 'ธรรมชาติ',
        'badge_cafe': 'คาเฟ่',
        'badge_shopping': 'ช้อปปิ้ง/อาหาร',
        'search_title': 'ค้นหา',
        'search_placeholder': 'หาอะไรอยู่เอ่ย...',
        'search_found': 'พบ 24 สถานที่',
        'search_sort': 'เรียงตาม: <strong style="color:var(--text-dark);">ยอดนิยม</strong>',
        'filter_category': 'หมวดหมู่',
        'filter_amphoe': 'อำเภอ',
        'filter_apply': 'ใช้การตั้งค่า',
        'filter_clear': 'ล้างตัวกรอง',
        'detail_about': 'เกี่ยวกับสถานที่',
        'detail_next': 'ไปไหนต่อดี? (สถานที่ใกล้เคียง)',
        'detail_review': 'รีวิวจากนักเดินทาง',
        'detail_write_review': 'เขียนรีวิว',
        'profile_title': 'โปรไฟล์ของฉัน',
        'profile_edit': 'แก้ไขโปรไฟล์',
        'profile_reviewed': 'รีวิวแล้ว',
        'profile_saved': 'บันทึกไว้',
        'profile_bookmarks': 'รายการโปรดที่บันทึกไว้ (Bookmarks)',
        'stats_title': 'สถิติการเดินทาง',
        'stats_trend_title': 'เทรนด์การเช็คอิน (สมุทรปราการ)',
        'stats_trend_sub': 'เจาะลึกความนิยมในแต่ละเดือน',
        'stats_top5': '5 อันดับ ประเภทสถานที่ยอดฮิต',
        'admin_overview': 'ภาพรวม (Dashboard)',
        'admin_users': 'จัดการผู้ใช้งาน',
        'admin_places': 'จัดการสถานที่',
        'admin_reviews': 'ตรวจสอบรีวิว',
        'admin_logout': 'ออกจากระบบ',
        'admin_add_place': '+ เพิ่มสถานที่ใหม่',
        'admin_search_place': 'พิมพ์ชื่อเพื่อค้นหา...',
        'admin_nav_dash': 'ภาพรวม (Dashboard)',
        'admin_nav_users': 'จัดการผู้ใช้งาน',
        'admin_nav_places': 'จัดการสถานที่',
        'admin_nav_reviews': 'ตรวจสอบรีวิว',
        'admin_dash_title': 'ภาพรวม (Dashboard)',
        'admin_dash_stat_users': 'ผู้ใช้งานทั้งหมด',
        'admin_dash_stat_places': 'สถานที่ในระบบ',
        'admin_dash_stat_reviews': 'รีวิวที่รออนุมัติ',
        'admin_dash_chart_title': 'ความนิยมแบ่งตามหมวดหมู่',
        'admin_users_title': 'จัดการผู้ใช้งาน (Users)',
        'admin_users_search': 'ค้นหาชื่อ หรืออีเมล...',
        'admin_users_th_name': 'ชื่อ - นามสกุล',
        'admin_users_th_email': 'อีเมล',
        'admin_users_th_role': 'บทบาท (Role)',
        'admin_users_th_date': 'วันที่สมัคร',
        'admin_users_th_action': 'จัดการ',
        'admin_role_user': 'User',
        'admin_role_admin': 'Admin',
        'admin_action_edit': 'แก้ไข',
        'admin_action_suspend': 'ระงับ',
        'admin_action_delete': 'ลบ',
        'admin_places_title': 'จัดการสถานที่',
        'admin_places_add': '+ เพิ่มสถานที่ใหม่',
        'admin_places_search': 'พิมพ์ชื่อเพื่อค้นหา...',
        'admin_places_filter_all': 'ทั้งหมด (หมวดหมู่)',
        'admin_places_modal_title': 'เพิ่มสถานที่ใหม่',
        'admin_places_form_name': 'ชื่อสถานที่',
        'admin_places_form_name_placeholder': 'ตัวอย่าง: วัดบางพลีใหญ่ใน',
        'admin_places_form_cat': 'หมวดหมู่',
        'admin_places_form_amphoe': 'อำเภอ',
        'amphoe_mueang': 'เมืองสมุทรปราการ',
        'amphoe_bang_phli': 'บางพลี',
        'amphoe_phra_pradaeng': 'พระประแดง',
        'admin_places_form_desc': 'รายละเอียด',
        'admin_places_form_desc_placeholder': 'พิมพ์คำบรรยายสถานที่...',
        'admin_places_form_image': 'อัปโหลดรูปภาพ',
        'admin_places_form_upload': '+ ลากและวางไฟล์รูปภาพ (JPG, PNG)',
        'admin_places_form_upload_sub': 'ลากไฟล์ลงกล่องนี้ หรือคลิกเพื่อค้นหา',
        'admin_places_form_cancel': 'ยกเลิก',
        'admin_places_form_save': 'บันทึกข้อมูล',
        'admin_reviews_title': 'ตรวจสอบรีวิว',
        'admin_reviews_filter_pending': 'สถานะ: รอตรวจสอบ',
        'admin_reviews_filter_approved': 'สถานะ: อนุมัติแล้ว',
        'admin_reviews_filter_all': 'สถานะ: ทั้งหมด',
        'admin_review_status_pending': 'รอตรวจสอบ',
        'admin_review_status_approved': 'อนุมัติแล้ว',
        'admin_review_place': 'สถานที่:',
        'place_bangpu': 'สถานตากอากาศบางปู',
        'place_anciant_city': 'เมืองโบราณ',
        'place_erawan': 'พิพิธภัณฑ์ช้างเอราวัณ',
        'admin_review_by': 'โดย:',
        'admin_review_approve': '✅ อนุมัติ',
        'admin_review_delete': '🗑️ ลบทิ้ง',
        'admin_review_remove': '🗑️ ลบออก',
        'place_asokaram': 'วัดอโศการาม',
        'place_bangkrajao': 'คุ้งบางกระเจ้า',
        'place_observatory': 'หอชมเมืองสมุทรปราการ',
        'place_sailom': 'ร้านสายลม บางปู',
        'place_bang_nam_phueng': 'ตลาดน้ำบางน้ำผึ้ง',
        'place_crocodile': 'ฟาร์มจระเข้สมุทรปราการ'
    },
    en: {
        'nav_home': 'Home',
        'nav_search': 'Search',
        'nav_stats': 'Stats',
        'nav_profile': 'Profile',
        'nav_admin': 'AdminPanel',
        'auth_title': 'Welcome to<br><span style="color: var(--primary-orange);">Samut Prakan</span>',
        'auth_login': 'Login',
        'auth_register': 'Register',
        'auth_email': 'Email',
        'auth_password': 'Password',
        'auth_forgot': 'Forgot Password?',
        'auth_name': 'Full Name',
        'auth_interest': 'Select your interests (for recommendations)',
        'auth_btn_login': 'Login',
        'auth_btn_register': 'Create Account & Start Journey',
        'auth_admin_demo': 'Login as Admin (Demo)',
        'tag_cafe': '☕ Cafe',
        'tag_temple': '🛕 Temple & Dharma',
        'tag_nature': '🌳 Nature',
        'tag_photo': '📸 Photo Spots',
        'tag_food': '🍽️ Great Food',
        'home_hello': 'Hello, Somchai! 👋',
        'home_hero': 'Where do you want to go<br>in <span style="color: var(--primary-orange);">Samut Prakan</span> today?',
        'home_search': 'Search places, districts, categories...',
        'home_search_btn': 'Search',
        'home_recom': 'Recommended for You (Temple Lover)',
        'home_view_all': 'View All >',
        'home_trending': 'Trending Now 🔥',
        'badge_temple': 'Temple',
        'badge_art': 'Art & Culture',
        'badge_history': 'Historical Place',
        'badge_nature': 'Nature',
        'badge_cafe': 'Cafe',
        'badge_shopping': 'Shopping/Food',
        'search_title': 'Search',
        'search_placeholder': 'What are you looking for...',
        'search_found': 'Found 24 Places',
        'search_sort': 'Sort by: <strong style="color:var(--text-dark);">Popularity</strong>',
        'filter_category': 'Category',
        'filter_amphoe': 'District',
        'filter_apply': 'Apply Filters',
        'filter_clear': 'Clear Filters',
        'detail_about': 'About this place',
        'detail_next': 'Where to next? (Nearby places)',
        'detail_review': 'Traveler Reviews',
        'detail_write_review': 'Write Review',
        'profile_title': 'My Profile',
        'profile_edit': 'Edit Profile',
        'profile_reviewed': 'Reviewed',
        'profile_saved': 'Saved',
        'profile_bookmarks': 'Bookmarked Places',
        'stats_title': 'Travel Statistics',
        'stats_trend_title': 'Check-in Trends (Samut Prakan)',
        'stats_trend_sub': 'Deep dive into monthly popularity',
        'stats_top5': 'Top 5 Popular Categories',
        'admin_overview': 'Overview (Dashboard)',
        'admin_users': 'Manage Users',
        'admin_places': 'Manage Places',
        'admin_reviews': 'Moderate Reviews',
        'admin_logout': 'Logout',
        'admin_add_place': '+ Add New Place',
        'admin_search_place': 'Type name to search...',
        'admin_nav_dash': 'Dashboard',
        'admin_nav_users': 'Manage Users',
        'admin_nav_places': 'Manage Places',
        'admin_nav_reviews': 'Moderate Reviews',
        'admin_dash_title': 'Dashboard',
        'admin_dash_stat_users': 'Total Users',
        'admin_dash_stat_places': 'Total Places',
        'admin_dash_stat_reviews': 'Pending Reviews',
        'admin_dash_chart_title': 'Popularity by Category',
        'admin_users_title': 'Manage Users',
        'admin_users_search': 'Search name or email...',
        'admin_users_th_name': 'Full Name',
        'admin_users_th_email': 'Email',
        'admin_users_th_role': 'Role',
        'admin_users_th_date': 'Date Joined',
        'admin_users_th_action': 'Actions',
        'admin_role_user': 'User',
        'admin_role_admin': 'Admin',
        'admin_action_edit': 'Edit',
        'admin_action_suspend': 'Suspend',
        'admin_action_delete': 'Delete',
        'admin_places_title': 'Manage Places',
        'admin_places_add': '+ Add New Place',
        'admin_places_search': 'Type name to search...',
        'admin_places_filter_all': 'All Categories',
        'admin_places_modal_title': 'Add New Place',
        'admin_places_form_name': 'Place Name',
        'admin_places_form_name_placeholder': 'Example: Wat Bang Phli Yai Nai',
        'admin_places_form_cat': 'Category',
        'admin_places_form_amphoe': 'District',
        'amphoe_mueang': 'Mueang Samut Prakan',
        'amphoe_bang_phli': 'Bang Phli',
        'amphoe_phra_pradaeng': 'Phra Pradaeng',
        'admin_places_form_desc': 'Description',
        'admin_places_form_desc_placeholder': 'Write place description...',
        'admin_places_form_image': 'Upload Image',
        'admin_places_form_upload': '+ Drag and drop image file (JPG, PNG)',
        'admin_places_form_upload_sub': 'Drag file here or click to browse',
        'admin_places_form_cancel': 'Cancel',
        'admin_places_form_save': 'Save Data',
        'admin_reviews_title': 'Moderate Reviews',
        'admin_reviews_filter_pending': 'Status: Pending',
        'admin_reviews_filter_approved': 'Status: Approved',
        'admin_reviews_filter_all': 'Status: All',
        'admin_review_status_pending': 'Pending',
        'admin_review_status_approved': 'Approved',
        'admin_review_place': 'Place:',
        'place_bangpu': 'Bang Pu Recreation Center',
        'place_anciant_city': 'Ancient City',
        'place_erawan': 'Erawan Museum',
        'admin_review_by': 'By:',
        'admin_review_approve': '✅ Approve',
        'admin_review_delete': '🗑️ Delete',
        'admin_review_remove': '🗑️ Remove',
        'place_asokaram': 'Wat Asokaram',
        'place_bangkrajao': 'Bang Kra Jao',
        'place_observatory': 'Observation Tower',
        'place_sailom': 'Sailom Bangpu',
        'place_bang_nam_phueng': 'Bang Nam Phueng Market',
        'place_crocodile': 'Crocodile Farm'
    }
};

/* === Language Toggle Initialization === */
document.addEventListener('DOMContentLoaded', () => {

    // Initialize Language from localStorage or default to 'th'
    let currentLang = localStorage.getItem('appLang') || 'th';

    // Function to apply translations
    const applyTranslations = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        // Set active class on toggle buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    // Apply init language
    applyTranslations(currentLang);

    // Add click listeners to switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentLang = e.target.getAttribute('data-lang');
            localStorage.setItem('appLang', currentLang);
            applyTranslations(currentLang);
        });
    });
});

/* === Database is now on the backend (Prisma + SQLite) === */
/* initDb() removed — data comes from /api/places, /api/auth, etc. */
const initDb = () => { /* no-op: backend handles data */ };
initDb();

/* ==== DEAD CODE BELOW (kept for reference, replaced by api.js) ==== */
if (false) { // ------- DISABLED: old mock localStorage data -------
    const PLACES_VERSION = 7;
    const _oldInitDb = () => {
    const storedVersion = parseInt(localStorage.getItem('travelPlacesVersion') || '0');
    if (!localStorage.getItem('travelPlaces') || storedVersion < PLACES_VERSION) {
        const initialPlaces = [
            {
                id: 1, nameTh: 'สถานตากอากาศบางปู', nameEn: 'Bang Pu Recreation Center', category: 'nature', amphoe: 'mueang', img: 'https://cms.dmpcdn.com/travel/2020/11/16/819aa990-27db-11eb-8c49-6ff1aae212a5_original.jpg', rating: 4.8, price: 0,
                descTh: 'สถานตากอากาศริมทะเลอ่าวไทย เป็นจุดดูนกนางนวลอพยพจากไซบีเรียในช่วงฤดูหนาว มีสะพานสุขตาทอดยาวออกไปในทะเล ร้านอาหารทะเลวิวสวย',
                descEn: 'A seaside retreat on the Gulf of Thailand, famous for migratory seagulls from Siberia in winter. Features a long pier and seafood restaurants with stunning views.'
            },
            {
                id: 2, nameTh: 'วัดอโศการาม', nameEn: 'Wat Asokaram', category: 'temple', amphoe: 'mueang', img: 'https://cms.dmpcdn.com/travel/2020/08/05/c0db8050-d6ca-11ea-b266-05fb6365be92_original.jpg', rating: 4.7, price: 0,
                descTh: 'วัดที่มีสถาปัตยกรรมสีขาวสวยงาม บรรยากาศสงบเงียบ เหมาะแก่การปฏิบัติธรรมและถ่ายรูป ตั้งอยู่ริมทะเลบางปู',
                descEn: 'A serene temple with beautiful white architecture, perfect for meditation and photography, located near the coast of Bang Pu.'
            },
            {
                id: 3, nameTh: 'เมืองโบราณ', nameEn: 'Ancient City (Muang Boran)', category: 'history', amphoe: 'mueang', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Samutprakarn_Ancient_Siam_2.jpg/800px-Samutprakarn_Ancient_Siam_2.jpg', rating: 4.9, price: 400,
                descTh: 'พิพิธภัณฑ์กลางแจ้งที่ใหญ่ที่สุดในโลก รวบรวมสถานที่สำคัญทางวัฒนธรรมไทยจากทั่วประเทศกว่า 121 แห่ง ปั่นจักรยานชมได้ทั้งวัน',
                descEn: 'The world\'s largest open-air museum, showcasing over 121 replicas of Thailand\'s cultural landmarks. Great for cycling and sightseeing.'
            },
            {
                id: 4, nameTh: 'พิพิธภัณฑ์ช้างเอราวัณ', nameEn: 'Erawan Museum', category: 'art', amphoe: 'mueang', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Erawan_Museum_2019.jpg/800px-Erawan_Museum_2019.jpg', rating: 4.8, price: 250,
                descTh: 'สถานที่ศักดิ์สิทธิ์ที่มีรูปปั้นช้างสามเศียรขนาดมหึมา ภายในจัดแสดงศิลปวัตถุล้ำค่าหลายชิ้น ผสมผสานศิลปะ วัฒนธรรม และศาสนาอย่างงดงาม',
                descEn: 'A sacred place with a massive three-headed elephant statue, housing priceless art collections blending art, culture, and religion.'
            },
            {
                id: 5, nameTh: 'ตลาดน้ำบางน้ำผึ้ง', nameEn: 'Bang Nam Phueng Floating Market', category: 'food', amphoe: 'phra_pradaeng', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Bang_Nam_Phueng_Floating_Market_05.jpg/800px-Bang_Nam_Phueng_Floating_Market_05.jpg', rating: 4.6, price: 0,
                descTh: 'ตลาดน้ำชุมชนในคุ้งบางกะเจ้า ขายสินค้าพื้นบ้าน อาหารคาวหวาน ผลไม้สด บรรยากาศริมคลองอันร่มรื่น เปิดวันเสาร์-อาทิตย์',
                descEn: 'A community floating market in Bang Kra Jao, selling local treats, fruit, and savory dishes in a lush canal-side setting. Open weekends.'
            },
            {
                id: 6, nameTh: 'คุ้งบางกระเจ้า', nameEn: 'Bang Kra Jao (Green Lung)', category: 'nature', amphoe: 'phra_pradaeng', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Bang_Krachao_from_Chao_Phraya_Sky_Park.jpg/800px-Bang_Krachao_from_Chao_Phraya_Sky_Park.jpg', rating: 4.7, price: 0,
                descTh: 'ปอดของกรุงเทพฯ พื้นที่สีเขียวขนาดใหญ่ เหมาะสำหรับปั่นจักรยาน พายเรือคายัค และสัมผัสวิถีชีวิตริมน้ำ',
                descEn: 'Known as the "Lung of Bangkok", a large green area perfect for cycling, kayaking, and experiencing riverside lifestyle.'
            },
            {
                id: 7, nameTh: 'ฟาร์มจระเข้สมุทรปราการ', nameEn: 'Samut Prakan Crocodile Farm & Zoo', category: 'nature', amphoe: 'mueang', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Samutprakarn_CrocodileFarm1.jpg/800px-Samutprakarn_CrocodileFarm1.jpg', rating: 4.3, price: 300,
                descTh: 'ฟาร์มจระเข้ที่ใหญ่ที่สุดในประเทศไทย มีจระเข้กว่า 60,000 ตัว พร้อมโชว์จระเข้และสวนสัตว์ ครอบครัวชื่นชอบ',
                descEn: 'Thailand\'s largest crocodile farm with over 60,000 crocodiles, featuring crocodile shows and a zoo. Great for families.'
            },
            {
                id: 8, nameTh: 'วัดพระสมุทรเจดีย์', nameEn: 'Wat Phra Samut Chedi', category: 'temple', amphoe: 'phra_samut_chedi', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Wat_Phra_Samut_Chedi_%28I%29.jpg/800px-Wat_Phra_Samut_Chedi_%28I%29.jpg', rating: 4.5, price: 0,
                descTh: 'พระเจดีย์กลางน้ำ สัญลักษณ์ของจังหวัดสมุทรปราการ เป็นวัดที่มีพุทธศาสนิกชนมากราบไหว้สักการะมาอย่างยาวนาน',
                descEn: 'The iconic "Chedi in the water", symbol of Samut Prakan province, a revered temple for Buddhist worship for centuries.'
            },
            {
                id: 9, nameTh: 'ป้อมพระจุลจอมเกล้า', nameEn: 'Phra Chulachomklao Fort', category: 'history', amphoe: 'phra_samut_chedi', img: 'https://www.samutprakan.go.th/wp-content/uploads/2021/05/11_re-1.jpg', rating: 4.4, price: 0,
                descTh: 'ป้อมปืนสมัยรัชกาลที่ 5 สร้างเพื่อป้องกันประเทศจากภัยคุกคามทางทะเล เป็นสถานที่ทางประวัติศาสตร์ที่สำคัญยิ่ง',
                descEn: 'A Rama V-era fort built to defend the kingdom from sea threats. An important historical site in Thai history.'
            },
            {
                id: 10, nameTh: 'วัดบางพลีใหญ่ใน', nameEn: 'Wat Bang Phli Yai Nai', category: 'temple', amphoe: 'bang_phli', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Wat_Bang_Phli_Yai_Nai_01.jpg/800px-Wat_Bang_Phli_Yai_Nai_01.jpg', rating: 4.6, price: 0,
                descTh: 'วัดสำคัญประดิษฐานหลวงพ่อโต พระพุทธรูปปางมารวิชัยสมัยสุโขทัย ผู้คนนิยมมาขอพรเพื่อความเป็นสิริมงคล',
                descEn: 'An important temple housing Luang Pho To, a Sukhothai-era Buddha image. Popular for blessings and merit-making.'
            },
            {
                id: 11, nameTh: 'หอชมเมืองสมุทรปราการ', nameEn: 'Samut Prakan Observation Tower', category: 'art', amphoe: 'mueang', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Samut_Prakan_Observation_Tower.jpg/800px-Samut_Prakan_Observation_Tower.jpg', rating: 4.5, price: 100,
                descTh: 'จุดชมวิว 360 องศาของจังหวัดสมุทรปราการ มองเห็นแม่น้ำเจ้าพระยาและเมืองโดยรอบ พร้อมนิทรรศการประวัติศาสตร์ท้องถิ่น',
                descEn: '360-degree observatory of Samut Prakan province, overlooking the Chao Phraya River and surrounding city with local history exhibits.'
            },
            {
                id: 12, nameTh: 'ตลาดคลองสวน 100 ปี', nameEn: 'Khlong Suan 100 Years Market', category: 'food', amphoe: 'bang_bo', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Khlong_Suan_Market.JPG/800px-Khlong_Suan_Market.JPG', rating: 4.4, price: 0,
                descTh: 'ตลาดเก่าแก่ริมคลองอายุกว่า 100 ปี รักษาวิถีชีวิตดั้งเดิมไว้ มีอาหารท้องถิ่นและขนมโบราณ ซึมซับบรรยากาศย้อนยุค',
                descEn: 'A century-old canal-side market preserving traditional lifestyle with local foods and vintage snacks. Perfect for cultural immersion.'
            },
            {
                id: 13, nameTh: 'วัดโปรดเกศเชษฐาราม', nameEn: 'Wat Protket Chettharam', category: 'temple', amphoe: 'phra_pradaeng', img: 'https://www.samutprakan.go.th/wp-content/uploads/2021/06/1_ree-2.jpg', rating: 4.3, price: 0,
                descTh: 'วัดเก่าแก่ในย่านพระประแดง มีสถาปัตยกรรมอันงดงาม เป็นวัดไทยพุทธเพียงวัดเดียวที่มีเอกลักษณ์เฉพาะตัวในย่านนี้',
                descEn: 'An ancient temple in Phra Pradaeng with beautiful architecture, the only Thai Buddhist temple with a unique style in this area.'
            },
            {
                id: 14, nameTh: 'สวนสุขภาพลัดโพธิ์', nameEn: 'Lat Pho Park', category: 'nature', amphoe: 'phra_pradaeng', img: 'https://palanla.com/ckeditor/upload/files/id37/domestic_location/Lat%20Pho%20Park/001.jpg', rating: 4.2, price: 0,
                descTh: 'สวนสาธารณะที่ร่มรื่น ริมแม่น้ำเจ้าพระยา มีเส้นทางวิ่งและปั่นจักรยาน เหมาะกับการออกกำลังกายและพักผ่อนหย่อนใจ',
                descEn: 'A lush public park along the Chao Phraya River with jogging and cycling paths, ideal for exercise and relaxation.'
            },
            {
                id: 15, nameTh: 'วัดกลางวรวิหาร', nameEn: 'Wat Klang Worawihan', category: 'temple', amphoe: 'mueang', img: 'https://upload.wikimedia.org/wikipedia/commons/2/22/%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3_%E0%B8%AD.%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87_%E0%B8%88.%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%97%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3_%2815%29.jpg', rating: 4.4, price: 0,
                descTh: 'วัดใจกลางเมืองสมุทรปราการ สร้างในสมัยอยุธยา ภายในมีพระอุโบสถเก่าแก่และพระพุทธรูปสำคัญ',
                descEn: 'A temple in the heart of Samut Prakan city, built during the Ayutthaya period with an ancient ordination hall.'
            },
            {
                id: 16, nameTh: 'พิพิธภัณฑ์ทหารเรือ', nameEn: 'Royal Thai Navy Museum', category: 'history', amphoe: 'mueang', img: 'https://www.navy.mi.th/storage/frontend/editor/1bdfe2cc-54a1-4a1c-bf2a-ef8b78db2ea7.jfif', rating: 4.2, price: 0,
                descTh: 'จัดแสดงอาวุธ ยุทโธปกรณ์ และประวัติศาสตร์ราชนาวีไทย ตั้งอยู่ในบริเวณโรงเรียนนายเรือ',
                descEn: 'Displays weapons, equipment, and the history of the Royal Thai Navy, located within the Naval Academy.'
            },
            {
                id: 17, nameTh: 'ป้อมผีเสื้อสมุทร', nameEn: 'Phi Suea Samut Fort', category: 'history', amphoe: 'phra_samut_chedi', img: 'https://cms.dmpcdn.com/travel/2021/05/19/44e480e0-b85c-11eb-9ca2-73594b023eb0_original.jpg', rating: 4.3, price: 0,
                descTh: 'ป้อมบนเกาะกลางแม่น้ำเจ้าพระยา มีรูปทรงคล้ายผีเสื้อกางปีก สร้างเพื่อป้องกันประเทศ ปัจจุบันเป็นพิพิธภัณฑ์',
                descEn: 'A butterfly-shaped fort on an island in the Chao Phraya River, built for national defense, now a museum.'
            },
            {
                id: 18, nameTh: 'วัดบางพลีใหญ่กลาง', nameEn: 'Wat Bang Phli Yai Klang', category: 'temple', amphoe: 'bang_phli', img: 'https://cms.dmpcdn.com/ugcarticle/2024/07/04/23ab7ea0-3960-11ef-9aad-89e9aa31b573_webp_original.webp', rating: 4.5, price: 0,
                descTh: 'หรือ "วัดพระนอน" ประดิษฐานพระปางไสยาสน์องค์ใหญ่ที่สุดในประเทศไทย สร้างความประทับใจแต่แรกเห็น',
                descEn: 'Also known as "Sleeping Buddha Temple", housing the largest reclining Buddha in Thailand. Impressive from first sight.'
            },
            {
                id: 19, nameTh: 'สวนศรีนครเขื่อนขันธ์', nameEn: 'Sri Nakhon Khuean Khan Park', category: 'nature', amphoe: 'phra_pradaeng', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Sri_Nakhon_Khuean_Khan_Park_09.JPG/1024px-Sri_Nakhon_Khuean_Khan_Park_09.JPG', rating: 4.6, price: 0,
                descTh: 'สวนสาธารณะขนาดใหญ่ในคุ้งบางกะเจ้า มีเส้นทางเดิน ปั่นจักรยาน และจุดชมนก เหมาะกับครอบครัวและท่องเที่ยวเชิงอนุรักษ์',
                descEn: 'A large public park in Bang Kra Jao with walking trails, cycling paths, and birdwatching spots. Perfect for eco-tourism.'
            },
            {
                id: 20, nameTh: 'วัดไพชยนต์พลเสพย์ราชวรวิหาร', nameEn: 'Wat Phaichiyon Phonlasep', category: 'temple', amphoe: 'phra_pradaeng', img: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AD%E0%B8%B8%E0%B9%82%E0%B8%9A%E0%B8%AA%E0%B8%96%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%84%E0%B8%9E%E0%B8%8A%E0%B8%A2%E0%B8%99%E0%B8%95%E0%B9%8C%E0%B8%9E%E0%B8%A5%E0%B9%80%E0%B8%AA%E0%B8%9E%E0%B8%A2%E0%B9%8C%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%A7%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg', rating: 4.3, price: 0,
                descTh: 'วัดเก่าแก่ในพระประแดง มีโบสถ์และวิหารอันงดงามสะท้อนศิลปะไทยโบราณ สงบร่มรื่นเหมาะแก่การสักการะ',
                descEn: 'An ancient temple in Phra Pradaeng with beautiful chapel and halls reflecting traditional Thai art, serene and peaceful.'
            }
        ];
        localStorage.setItem('travelPlaces', JSON.stringify(initialPlaces));
        localStorage.setItem('travelPlacesVersion', PLACES_VERSION.toString());
    }

    // 2. Initial Users
    if (!localStorage.getItem('travelUsers')) {
        const initialUsers = [
            { id: 1, name: 'Admin System', email: 'admin@samutprakan.com', password: 'admin', role: 'admin', date: '01/03/2026' },
            { id: 2, name: 'Somchai Jaidee', email: 'somchai@email.com', password: 'password', role: 'user', date: '05/03/2026' }
        ];
        localStorage.setItem('travelUsers', JSON.stringify(initialUsers));
    }

    // 3. Initial Pending Reviews Data (for admin)
    if (!localStorage.getItem('adminPendingReviews')) {
        const initialPending = [
            { id: 101, place: 'สถานตากอากาศบางปู', user: 'Jane Doe', rating: 5, comment: 'นกเยอะมากกก ข้าวเกรียบอร่อย', date: '10/03/2026' },
            { id: 102, place: 'วัดอโศการาม', user: 'Sommai', rating: 4, comment: 'สงบเงียบ เหมาะแก่การปฏิบัติธรรม', date: '09/03/2026' }
        ];
        localStorage.setItem('adminPendingReviews', JSON.stringify(initialPending));
    }
};

_oldInitDb();
} // ------- END DISABLED old mock data -------

/* === Demo Quick Login (uses real API) === */
window.demoLogin = async function (role) {
    try {
        const email = role === 'admin' ? 'admin@samutprakan.com' : 'somchai@email.com';
        const password = role === 'admin' ? 'admin123' : 'password';
        const data = await AuthAPI.login(email, password);
        if (data.user.role === 'admin') {
            window.location.href = 'admin-dash.html';
        } else {
            window.location.href = 'home.html';
        }
    } catch (err) {
        alert(err.message || 'เกิดข้อผิดพลาด / Error');
    }
};

/* === Functional Features: Auth (uses real API) === */
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            const btn = loginForm.querySelector('button[type="submit"]');
            if (btn) btn.disabled = true;

            try {
                const data = await AuthAPI.login(email, password);
                if (data.user.role === 'admin') {
                    window.location.href = 'admin-dash.html';
                } else {
                    window.location.href = 'home.html';
                }
            } catch (err) {
                alert(err.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง / Invalid Credentials');
            } finally {
                if (btn) btn.disabled = false;
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = registerForm.querySelectorAll('input[type="text"]')[0].value;
            const email = registerForm.querySelector('input[type="email"]').value;
            const password = registerForm.querySelector('input[type="password"]').value;
            const btn = registerForm.querySelector('button[type="submit"]');

            // Validate password length
            if (password.length < 8) {
                const lang = localStorage.getItem('appLang') || 'th';
                alert(lang === 'en'
                    ? 'Password must be at least 8 characters'
                    : 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
                return;
            }

            if (btn) btn.disabled = true;

            try {
                await AuthAPI.register(email, password, name, '');
                alert('ลงทะเบียนสำเร็จ / Registered Successfully');
                window.location.href = 'home.html';
            } catch (err) {
                alert(err.message || 'เกิดข้อผิดพลาด / Error');
            } finally {
                if (btn) btn.disabled = false;
            }
        });
    }
});

/* === Functional Features: Profile & Reviews === */
document.addEventListener('DOMContentLoaded', () => {

    const defaultUser = {
        name: 'นายโอ่ง อัลปาก้า',
        tags: 'ธรรมชาติ, คาเฟ่'
    };

    function loadProfile() {
        let userProfile = JSON.parse(localStorage.getItem('travelUserProfile'));
        if (!userProfile) {
            userProfile = defaultUser;
            localStorage.setItem('travelUserProfile', JSON.stringify(userProfile));
        }

        // Update Profile Page Display if elements exist
        const displayName = document.getElementById('displayName');
        const displayTags = document.getElementById('displayTags');
        const displayAvatar = document.getElementById('displayAvatar');

        if (displayName && displayTags && displayAvatar) {
            displayName.textContent = userProfile.name;
            displayAvatar.textContent = userProfile.name.charAt(0);

            // Render tags
            const tagsArray = userProfile.tags.split(',').map(t => t.trim()).filter(t => t);
            displayTags.innerHTML = tagsArray.map(t => `<span class="badge" style="margin-right:4px;">${t}</span>`).join('');
        }
    }

    loadProfile();

    // Expose functions globally for onclick
    window.openEditProfile = () => {
        const modal = document.getElementById('editProfileModal');
        if (modal) {
            let userProfile = JSON.parse(localStorage.getItem('travelUserProfile')) || defaultUser;
            document.getElementById('editNameInput').value = userProfile.name;
            document.getElementById('editTagsInput').value = userProfile.tags;
            modal.style.display = 'flex';
        }
    };

    window.closeEditProfile = () => {
        const modal = document.getElementById('editProfileModal');
        if (modal) modal.style.display = 'none';
    };

    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = document.getElementById('editNameInput').value;
            const newTags = document.getElementById('editTagsInput').value;

            localStorage.setItem('travelUserProfile', JSON.stringify({
                name: newName,
                tags: newTags
            }));

            closeEditProfile();
            loadProfile();

            const lang = localStorage.getItem('appLang') || 'th';
            alert(lang === 'en' ? 'Profile updated!' : 'อัปเดตโปรไฟล์เรียบร้อย!');
        });
    }

    // --- Review Management ---
    function loadReviews() {
        const reviewsContainer = document.getElementById('reviewsContainer');
        if (!reviewsContainer) return;

        let savedReviews = JSON.parse(localStorage.getItem('travelPlaceReviews')) || [];

        const dynamicReviews = document.querySelectorAll('.dynamic-review');
        dynamicReviews.forEach(r => r.remove());

        let userProfile = JSON.parse(localStorage.getItem('travelUserProfile')) || defaultUser;

        let htmlString = '';
        savedReviews.forEach(rev => {
            let stars = '⭐'.repeat(parseInt(rev.rating));
            htmlString += `
                <div class="review-card dynamic-review" style="border-left: 4px solid var(--primary-orange);">
                    <div class="review-header">
                        <div class="flex items-center gap-2">
                            <div class="avatar" style="width:32px; height:32px; font-size:14px; background:var(--primary-orange); color:white; display:flex; justify-content:center; align-items:center;">${userProfile.name.charAt(0)}</div>
                            <span class="font-weight-600" style="font-family: var(--font-heading);">${userProfile.name}</span>
                        </div>
                        <div class="text-small" style="color:var(--primary-orange);">${stars}</div>
                    </div>
                    <p class="text-small text-muted mt-2">${rev.comment}</p>
                    <span class="text-small text-muted mt-2" style="font-size: 0.75rem; display:block;">${rev.date}</span>
                </div>
            `;
        });

        reviewsContainer.insertAdjacentHTML('afterbegin', htmlString);
    }

    loadReviews();

    window.openReviewModal = () => {
        const modal = document.getElementById('reviewModal');
        if (modal) modal.style.display = 'flex';
    };

    window.closeReviewModal = () => {
        const modal = document.getElementById('reviewModal');
        if (modal) modal.style.display = 'none';
    };

    const writeReviewForm = document.getElementById('writeReviewForm');
    if (writeReviewForm) {
        writeReviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const rating = document.getElementById('reviewRating').value;
            const comment = document.getElementById('reviewComment').value;

            let savedReviews = JSON.parse(localStorage.getItem('travelPlaceReviews')) || [];
            savedReviews.unshift({
                rating: rating,
                comment: comment,
                date: new Date().toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric' })
            });

            localStorage.setItem('travelPlaceReviews', JSON.stringify(savedReviews));

            closeReviewModal();
            document.getElementById('reviewRating').value = '5';
            document.getElementById('reviewComment').value = '';

            loadReviews();

            const lang = localStorage.getItem('appLang') || 'th';
            alert(lang === 'en' ? 'Review posted!' : 'โพสต์รีวิวเรียบร้อย!');
        });
    }

});

/* === Functional Features: Admin Panel === */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Manage Places ---
    const adminPlacesList = document.getElementById('adminPlacesList');
    if (adminPlacesList) {

        window.loadAdminPlaces = async () => {
            let places = [];
            try {
                const data = await PlacesAPI.getAll();
                places = (data.places || []).map(fixPlaceImage);
            } catch { places = []; }

            // Apply search & category filter from admin page inputs
            const searchInput = document.getElementById('adminSearchInput');
            const catFilter = document.getElementById('adminCatFilter');
            const query = searchInput ? searchInput.value.toLowerCase() : '';
            const catValue = catFilter ? catFilter.value : '';

            let filtered = places.filter(p => {
                const matchQuery = !query ||
                    (p.nameTh && p.nameTh.toLowerCase().includes(query)) ||
                    (p.nameEn && p.nameEn.toLowerCase().includes(query));
                const matchCat = !catValue || p.category === catValue;
                return matchQuery && matchCat;
            });

            // Update count badge
            const countBadge = document.getElementById('placeCountBadge');
            if (countBadge) countBadge.textContent = `${filtered.length} สถานที่`;

            if (filtered.length === 0) {
                adminPlacesList.innerHTML = '<p style="padding:24px; text-align:center; color:var(--text-muted);">ไม่พบสถานที่</p>';
                return;
            }
            let html = '';
            filtered.forEach(p => {
                const imgSrc = p.img || '';
                const escapedNameTh = (p.nameTh || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
                const escapedNameEn = (p.nameEn || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
                const escapedImg = (imgSrc || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
                html += `
                <div class="place-item">
                    <img src="${imgSrc}" class="place-item-img" onerror="handleImgError(this)" data-slug="${p.slug || ''}" alt="${p.nameTh}">
                    <div class="place-item-info">
                        <div class="flex items-center gap-2 mb-1">
                            <h3 data-i18n="place_dynamic">${p.nameTh}</h3>
                            <span class="badge" data-i18n="badge_${p.category}">${p.category}</span>
                        </div>
                        <p class="text-small text-muted">อำเภอ: ${p.amphoe} • ID: ${p.id}</p>
                    </div>
                    <div class="place-actions">
                        <button class="btn btn-outline" style="padding: 6px 16px;" onclick="openEditModal(${p.id}, '${escapedNameTh}', '${escapedNameEn}', '${p.category}', '${p.amphoe}', ${p.price || 0}, '${escapedImg}')">✏️ แก้ไข</button>
                        <button class="btn" style="padding: 6px 16px; background:#FEE2E2; color:#DC2626;" onclick="deleteAdminPlace(${p.id})">🗑️ ลบ</button>
                    </div>
                </div>`;
            });
            adminPlacesList.innerHTML = html;
        };

        window.deleteAdminPlace = async (id) => {
            if (confirm('คุณต้องการลบสถานที่นี้ใช่หรือไม่? / Are you sure you want to delete this place?')) {
                try {
                    await PlacesAPI.delete(id);
                    loadAdminPlaces();
                } catch (err) {
                    alert(err.message || 'Error deleting place');
                }
            }
        };

        // Note: Add/Edit form submit handlers are now in admin-places.html inline script

        loadAdminPlaces();
    }

    // --- 2. Manage Users ---
    const adminUsersTableBody = document.getElementById('adminUsersTableBody');
    if (adminUsersTableBody) {

        window.loadAdminUsers = async () => {
            let users = [];
            try {
                const data = await UsersAPI.getAll();
                users = data.users || [];
            } catch { users = []; }
            if (users.length === 0) {
                adminUsersTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">ไม่พบผู้ใช้งาน</td></tr>';
                return;
            }
            let html = '';
            users.forEach(u => {
                const badgeColor = u.role === 'admin' ? '#FEF3C7; color:#D97706' : '#E0F2FE; color:#0284C7';
                html += `
                <tr>
                    <td class="text-muted">#${u.id || 1000}</td>
                    <td class="font-weight-600">${u.fullName || u.name || '-'}</td>
                    <td>${u.email}</td>
                    <td><span class="badge" style="background:${badgeColor};">${u.role.toUpperCase()}</span></td>
                    <td class="text-muted">${u.createdAt ? new Date(u.createdAt).toLocaleDateString('th-TH') : (u.date || '-')}</td>
                    <td>
                        <div class="action-btns">
                            <button class="btn btn-outline" style="padding: 4px 12px; font-size: 0.8rem;">แก้ไข</button>
                            ${u.role !== 'admin' ? `<button class="btn" style="padding: 4px 12px; font-size: 0.8rem; background:#FEE2E2; color:#DC2626;" onclick="deleteAdminUser(${u.id})">แบน</button>` : ''}
                        </div>
                    </td>
                </tr>`;
            });
            adminUsersTableBody.innerHTML = html;
        };

        window.deleteAdminUser = async (id) => {
            if (confirm('คุณต้องการแบนผู้ใช้นี้ใช่หรือไม่? / Ban this user?')) {
                try {
                    await UsersAPI.delete(id);
                    loadAdminUsers();
                } catch (err) {
                    alert(err.message || 'Error');
                }
            }
        };

        loadAdminUsers();
    }

    // --- 3. Manage Reviews ---
    const adminReviewsList = document.getElementById('adminReviewsList');
    if (adminReviewsList) {

        window.loadAdminReviews = () => {
            const pending = JSON.parse(localStorage.getItem('adminPendingReviews')) || [];
            if (pending.length === 0) {
                adminReviewsList.innerHTML = '<p style="padding:16px; text-align:center; background:white; border-radius:8px; border:1px solid #E5E7EB;">ไม่มีรีวิวรอตรวจสอบ</p>';
                return;
            }
            let html = '';
            pending.forEach(r => {
                let stars = '⭐'.repeat(r.rating);
                html += `
                <div class="review-admin-card">
                    <div class="review-admin-info">
                        <span class="review-status status-pending">รอตรวจสอบ</span>
                        <h3 style="font-size:1.1rem; margin-bottom:4px;">สถานที่: <span>${r.place}</span></h3>
                        <p class="text-small text-muted mb-2">โดย: ${r.user} • ${r.date}</p>
                        <div style="color:var(--primary-orange);" class="mb-1">${stars}</div>
                        <p class="text-body" style="color:var(--text-dark); background:#F9FAFB; padding:12px; border-radius:8px; border:1px solid #E5E7EB;">
                            ${r.comment}
                        </p>
                    </div>
                    <div class="actions">
                        <button class="btn btn-primary" onclick="approveReview(${r.id})">✅ อนุมัติ</button>
                        <button class="btn btn-outline" style="color:#DC2626; border-color:#FCA5A5;" onclick="deleteReview(${r.id})">🗑️ ลบทิ้ง</button>
                    </div>
                </div>`;
            });
            adminReviewsList.innerHTML = html;
        };

        window.approveReview = (id) => {
            if (confirm('อนุมัติรีวิวนี้หรือไม่? / Approve?')) {
                let pending = JSON.parse(localStorage.getItem('adminPendingReviews')) || [];
                const review = pending.find(r => r.id === id);
                if (review) {
                    // Logic to add to public reviews
                    let publicReviews = JSON.parse(localStorage.getItem('travelPlaceReviews')) || [];
                    publicReviews.unshift(review);
                    localStorage.setItem('travelPlaceReviews', JSON.stringify(publicReviews));

                    // Remove from pending
                    pending = pending.filter(r => r.id !== id);
                    localStorage.setItem('adminPendingReviews', JSON.stringify(pending));
                    loadAdminReviews();
                }
            }
        };

        window.deleteReview = (id) => {
            if (confirm('ลบรีวิวนี้ทิ้งหรือไม่? / Delete?')) {
                let pending = JSON.parse(localStorage.getItem('adminPendingReviews')) || [];
                pending = pending.filter(r => r.id !== id);
                localStorage.setItem('adminPendingReviews', JSON.stringify(pending));
                loadAdminReviews();
            }
        };

        loadAdminReviews();
    }
});

/* === Functional Features: Search === */
document.addEventListener('DOMContentLoaded', () => {
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    const searchInput = document.getElementById('searchInputField');
    const catFilters = document.querySelectorAll('.cat-filter');

    if (searchResultsGrid) {

        // Read query parameter 'q'
        const urlParams = new URLSearchParams(window.location.search);
        const qParam = urlParams.get('q');
        if (qParam && searchInput) {
            searchInput.value = qParam;
        }

        const renderResults = async () => {
            let placesData;
            try {
                placesData = await PlacesAPI.getAll();
            } catch { placesData = { places: [] }; }
            const places = placesData.places || [];

            // Get active category filters
            const activeCats = Array.from(catFilters)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            // Get search query
            const query = (searchInput ? searchInput.value.toLowerCase() : '');

            // Filter logic
            const filtered = places.filter(p => {
                const matchCat = activeCats.length === 0 || activeCats.includes(p.category);
                const matchQuery = !query ||
                    (p.nameTh && p.nameTh.toLowerCase().includes(query)) ||
                    (p.nameEn && p.nameEn.toLowerCase().includes(query));
                return matchCat && matchQuery;
            });

            // Update result count header if it exists
            const searchFoundH2 = document.querySelector('h2.h3[data-i18n="search_found"]');
            if (searchFoundH2) {
                const lang = localStorage.getItem('appLang') || 'th';
                searchFoundH2.textContent = lang === 'en' ? `Found ${filtered.length} places` : `พบ ${filtered.length} สถานที่`;
            }

            // Render HTML
            if (filtered.length === 0) {
                searchResultsGrid.innerHTML = '<div style="grid-column: 1/-1; padding:32px; text-align:center; color:var(--text-muted); background:white; border-radius:8px;">ไม่พบผลลัพธ์ที่ตรงกับการค้นหา / No results found</div>';
                return;
            }

            let html = '';
            filtered.forEach(p => {
                const isFree = p.price === 0;
                const priceText = isFree ? 'ฟรี' : `${p.price} ฿`;
                html += `
                <a href="detail.html?id=${p.id}" class="result-card">
                    <img src="${p.img}" class="result-img" alt="${p.nameTh}">
                    <div class="result-body">
                        <div class="flex justify-between items-center mb-1">
                            <span class="badge" data-i18n="badge_${p.category}">หมวดหมู่</span>
                            <span class="text-small">⭐ ${p.rating.toFixed(1)}</span>
                        </div>
                        <h3 class="mb-1" style="font-size:1.15rem;" data-i18n="place_dynamic">${p.nameTh}</h3>
                        <p class="text-small text-muted mb-2">อ.${p.amphoe}</p>
                        <div class="price-tag">${priceText}</div>
                    </div>
                </a>`;
            });
            searchResultsGrid.innerHTML = html;
        };

        // Event listeners
        if (searchInput) {
            searchInput.addEventListener('input', renderResults);
        }
        catFilters.forEach(cb => {
            cb.addEventListener('change', renderResults);
        });

        // Clear filter button (optional robust handler)
        const clearBtn = document.querySelector('button[data-i18n="filter_clear"]');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                catFilters.forEach(cb => cb.checked = false);
                if (searchInput) searchInput.value = '';
                renderResults();
            });
        }

        // Apply filters button (mobile standard)
        const applyBtn = document.querySelector('button[data-i18n="filter_apply"]');
        if (applyBtn) {
            applyBtn.addEventListener('click', renderResults);
        }

        renderResults();
    }
});

/* === Fallback Image Map — REAL place photos from Thai CDNs/Wikimedia === */
const PLACE_IMAGES = {
    'bang-pu-recreation-center': 'https://cms.dmpcdn.com/travel/2020/11/16/819aa990-27db-11eb-8c49-6ff1aae212a5_original.jpg',
    'wat-asokaram': 'https://cms.dmpcdn.com/travel/2020/08/05/c0db8050-d6ca-11ea-b266-05fb6365be92_original.jpg',
    'ancient-city': 'https://cms.dmpcdn.com/travel/2019/05/02/7ecbdde1-7cab-4008-abdc-41d45454e8ea_original.JPG',
    'erawan-museum': 'https://www.samutprakan.go.th/wp-content/uploads/2021/05/2_re.jpg',
    'bang-nam-phueng-market': 'https://cms.dmpcdn.com/travel/2021/05/27/c2e404b0-be87-11eb-a5a4-9dfc1c045b4c_original.jpg',
    'bang-kra-jao': 'https://cms.dmpcdn.com/travel/2021/04/16/00742a70-9e66-11eb-a246-8149e6aa8572_original.jpg',
    'crocodile-farm': 'https://www.samutprakan.go.th/wp-content/uploads/2021/05/9_re.jpg',
    'wat-phra-samut-chedi': 'https://cms.dmpcdn.com/travel/2020/10/19/92c647b0-11f8-11eb-9694-8b6ba006509f_original.JPG',
    'phra-chulachomklao-fort': 'https://www.samutprakan.go.th/wp-content/uploads/2021/05/11_re-1.jpg',
    'wat-bang-phli-yai-nai': 'https://cms.dmpcdn.com/travel/2021/04/23/bd1d13f0-a3ff-11eb-a5a4-9dfc1c045b4c_original.jpg',
    'observation-tower': 'https://cms.dmpcdn.com/travel/2022/08/23/08dbd660-22c6-11ed-b57f-bd03a8915442_original.jpg',
    'khlong-suan-market': 'https://cms.dmpcdn.com/travel/2021/03/17/99a4fc10-86f7-11eb-9cb4-c36141a0e445_original.jpg',
    'wat-protket-chettharam': 'https://www.samutprakan.go.th/wp-content/uploads/2021/06/1_ree-2.jpg',
    'lat-pho-park': 'https://palanla.com/ckeditor/upload/files/id37/domestic_location/Lat%20Pho%20Park/001.jpg',
    'wat-klang-worawihan': 'https://upload.wikimedia.org/wikipedia/commons/2/22/%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3_%E0%B8%AD.%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87_%E0%B8%88.%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%97%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3_%2815%29.jpg',
    'navy-museum': 'https://www.navy.mi.th/storage/frontend/editor/1bdfe2cc-54a1-4a1c-bf2a-ef8b78db2ea7.jfif',
    'phi-suea-samut-fort': 'https://cms.dmpcdn.com/travel/2021/05/19/44e480e0-b85c-11eb-9ca2-73594b023eb0_original.jpg',
    'wat-bang-phli-yai-klang': 'https://cms.dmpcdn.com/ugcarticle/2024/07/04/23ab7ea0-3960-11ef-9aad-89e9aa31b573_webp_original.webp',
    'sri-nakhon-khuean-khan-park': 'https://www.samutprakan.go.th/wp-content/uploads/2021/05/11_re.jpg',
    'wat-phaichiyon-phonlasep': 'https://upload.wikimedia.org/wikipedia/commons/5/5d/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AD%E0%B8%B8%E0%B9%82%E0%B8%9A%E0%B8%AA%E0%B8%96%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%84%E0%B8%9E%E0%B8%8A%E0%B8%A2%E0%B8%99%E0%B8%95%E0%B9%8C%E0%B8%9E%E0%B8%A5%E0%B9%80%E0%B8%AA%E0%B8%9E%E0%B8%A2%E0%B9%8C%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%A7%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg',
};

/** Fix missing/broken place images using the fallback map */
function fixPlaceImage(place) {
    const fallback = PLACE_IMAGES[place.slug];
    // Apply fallback when DB image is missing or uses Wikimedia /thumb/ (gets blocked)
    if (!place.img || place.img === 'null' || place.img === '') {
        place.img = fallback || null;
    } else if (fallback && place.img.includes('/wikipedia/commons/thumb/')) {
        // Wikimedia thumb URLs are often hotlink-blocked; use direct URL
        place.img = fallback;
    }
    return place;
}

/** Global image error handler — tries PLACE_IMAGES fallback when DB image fails */
window.handleImgError = function(img) {
    const slug = img.getAttribute('data-slug');
    const fallback = slug ? PLACE_IMAGES[slug] : null;
    // Already tried fallback? Use gradient placeholder
    if (img.getAttribute('data-tried-fallback')) {
        img.style.background = 'linear-gradient(135deg,#e8d5b7,#c4956a)';
        img.style.objectFit = 'contain';
        img.alt = img.alt || 'รูปภาพ';
        return;
    }
    if (fallback && img.src !== fallback) {
        img.setAttribute('data-tried-fallback', '1');
        img.src = fallback;
    } else {
        img.style.background = 'linear-gradient(135deg,#e8d5b7,#c4956a)';
    }
};

/* === Functional Features: Home, Detail, Profile Dynamic Rendering === */
document.addEventListener('DOMContentLoaded', async () => {

    // --- Home Page Rendering ---
    const homeRecomScroll = document.getElementById('homeRecomScroll');
    const homeTrendingGrid = document.getElementById('homeTrendingGrid');

    if (homeRecomScroll || homeTrendingGrid) {
        let places = [];
        try {
            const data = await PlacesAPI.getAll();
            places = (data.places || []).map(fixPlaceImage);
        } catch { places = []; }

        // --- Hero Photo Collage (use 3 best images) ---
        const heroCollage = document.getElementById('heroCollage');
        if (heroCollage && places.length >= 3) {
            const imgs = places.filter(p => p.img).slice(0, 3);
            heroCollage.innerHTML = imgs.map((p, i) =>
                `<img src="${p.img}" alt="${p.nameTh}" data-slug="${p.slug}" style="animation-delay:${i * 150}ms" class="animate-fade-in" onerror="handleImgError(this)"/>`
            ).join('');
        }

        // --- Popular Destinations (Large cards with price + rating) ---
        if (homeRecomScroll) {
            let html = '';
            places.slice(0, 8).forEach(p => {
                const priceText = p.price === 0 ? 'ฟรี' : `฿ ${p.price}`;
                html += `
                <a href="detail.html?id=${p.id}" class="dest-card animate-fade-in-up" style="text-decoration:none; color:inherit;">
                    <img src="${p.img}" class="dest-card-img" alt="${p.nameTh}" data-slug="${p.slug}"
                         onerror="handleImgError(this)">
                    <h3 class="dest-card-name">${p.nameTh}</h3>
                    <div class="dest-card-meta">
                        <span class="dest-card-price">${priceText}</span>
                        <span style="color: var(--text-light);">•</span>
                        <span class="dest-card-rating">
                            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            ${p.rating || '0.0'}
                        </span>
                    </div>
                </a>`;
            });
            homeRecomScroll.innerHTML = html;
        }

        // --- Trending Section (Horizontal cards) ---
        if (homeTrendingGrid) {
            let html = '';
            const sortedByRating = [...places].sort((a, b) => b.rating - a.rating).slice(0, 6);
            sortedByRating.forEach(p => {
                const priceText = p.price === 0 ? 'ฟรี' : `${p.price} ฿`;
                html += `
                <a href="detail.html?id=${p.id}" class="trending-card" style="text-decoration:none; color:inherit;">
                    <img src="${p.img}" class="trending-img" alt="${p.nameTh}" data-slug="${p.slug}"
                         onerror="handleImgError(this)">
                    <div class="trending-info">
                        <h4>${p.nameTh}</h4>
                        <p>อ.${p.amphoe} · ${priceText} · ⭐ ${p.rating || '0.0'}</p>
                    </div>
                </a>`;
            });
            homeTrendingGrid.innerHTML = html;
        }

        // --- All Places Grid (Travellow destination cards) ---
        const homeAllPlacesGrid = document.getElementById('homeAllPlacesGrid');
        if (homeAllPlacesGrid) {
            let allHtml = '';
            places.forEach(p => {
                const priceText = p.price === 0 ? 'ฟรี' : `฿ ${p.price}`;
                allHtml += `
                <a href="detail.html?id=${p.id}" class="dest-card animate-fade-in-up" style="text-decoration:none; color:inherit;">
                    <img src="${p.img}" class="dest-card-img" alt="${p.nameTh}" data-slug="${p.slug}" style="height: 220px;"
                         onerror="handleImgError(this)">
                    <h3 class="dest-card-name">${p.nameTh}</h3>
                    <div class="dest-card-meta">
                        <span class="dest-card-price">${priceText}</span>
                        <span style="color: var(--text-light);">•</span>
                        <span>อ.${p.amphoe}</span>
                        <span style="color: var(--text-light);">•</span>
                        <span class="dest-card-rating">
                            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            ${p.rating || '0.0'}
                        </span>
                    </div>
                </a>`;
            });
            homeAllPlacesGrid.innerHTML = allHtml;
        }
    }

    // --- Detail Page Rendering ---
    const detailContentContainer = document.getElementById('detailContentContainer');
    if (detailContentContainer) {
        // Parse URL params for Place ID
        const urlParams = new URLSearchParams(window.location.search);
        let placeId = parseInt(urlParams.get('id'));

        let places = [];
        try {
            const data = await PlacesAPI.getAll();
            places = (data.places || []).map(fixPlaceImage);
        } catch { places = []; }
        let place = places.find(p => p.id === placeId);

        // Fallback to first place if not found
        if (!place && places.length > 0) {
            place = places[0];
            placeId = place.id;
        }

        if (place) {
            // Update UI Elements
            document.getElementById('detailHeroImage').src = place.img;
            document.getElementById('detailHeroImage').alt = place.nameTh;
            document.getElementById('detailTitle').textContent = place.nameTh;
            document.getElementById('detailBadge').innerHTML = `หมวดหมู่`; // Could enhance to real text
            document.getElementById('detailBadge').setAttribute('data-i18n', `badge_${place.category}`);

            document.getElementById('detailLocation').innerHTML = `
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                อ.${place.amphoe} สมุทรปราการ
            `;

            document.getElementById('detailRating').innerHTML = `
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span style="color:var(--text-dark); font-weight:600;">${place.rating.toFixed(1)}</span> (รีวิว)
            `;

            const priceText = place.price === 0 ? 'ฟรี (Free)' : `฿${place.price} หรือมากกว่า`;
            document.getElementById('detailPrice').innerHTML = `
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ${priceText}
            `;

            const lang = localStorage.getItem('appLang') || 'th';
            const descText = lang === 'en' ? (place.descEn || place.nameEn) : (place.descTh || place.nameTh);
            document.getElementById('detailDesc').textContent = descText;

            // Next Stop Recommendation (Render 2 random other places)
            const detailNextContainer = document.getElementById('detailNextContainer');
            if (detailNextContainer) {
                const otherPlaces = places.filter(p => p.id !== placeId);
                let nextHtml = '';
                otherPlaces.slice(0, 2).forEach(p => {
                    nextHtml += `
                    <a href="detail.html?id=${p.id}" class="place-card" style="min-width: unset; width: 100%;">
                        <img src="${p.img}" class="place-img" alt="${p.nameTh}" style="height: 120px;">
                        <div class="place-content" style="padding: 12px;">
                            <h3 style="font-size: 1rem;">${p.nameTh}</h3>
                            <p class="text-small text-muted">อ.${p.amphoe}</p>
                        </div>
                    </a>`;
                });
                detailNextContainer.innerHTML = nextHtml;
            }

            // Bookmark feature logic
            const favBtnAction = document.getElementById('favBtnAction');
            if (favBtnAction) {
                // Initialize bookmark state
                let bookmarks = JSON.parse(localStorage.getItem('travelBookmarks')) || [];
                if (bookmarks.includes(placeId)) {
                    favBtnAction.style.color = '#EF4444'; // Red
                    favBtnAction.querySelector('svg').setAttribute('fill', 'currentColor');
                } else {
                    favBtnAction.style.color = '#9CA3AF'; // Gray out
                    favBtnAction.querySelector('svg').setAttribute('fill', 'none');
                    favBtnAction.querySelector('svg').setAttribute('stroke', 'currentColor');
                    favBtnAction.querySelector('svg').setAttribute('stroke-width', '2');
                }

                // Handle click action
                window.toggleBookmark = function () {
                    let bms = JSON.parse(localStorage.getItem('travelBookmarks')) || [];
                    if (bms.includes(placeId)) {
                        bms = bms.filter(id => id !== placeId);
                        favBtnAction.style.color = '#9CA3AF';
                        favBtnAction.querySelector('svg').setAttribute('fill', 'none');
                        favBtnAction.querySelector('svg').setAttribute('stroke', 'currentColor');
                        favBtnAction.querySelector('svg').setAttribute('stroke-width', '2');
                    } else {
                        bms.push(placeId);
                        favBtnAction.style.color = '#EF4444';
                        favBtnAction.querySelector('svg').setAttribute('fill', 'currentColor');
                        favBtnAction.querySelector('svg').removeAttribute('stroke');
                    }
                    localStorage.setItem('travelBookmarks', JSON.stringify(bms));
                };
                favBtnAction.setAttribute('onclick', 'toggleBookmark()');
            }
        }
    }

    // --- Profile Bookmarks Rendering ---
    const profileBookmarksList = document.getElementById('profileBookmarksList');
    if (profileBookmarksList) {
        window.loadProfileBookmarks = () => {
            const places = JSON.parse(localStorage.getItem('travelPlaces')) || [];
            let bookmarks = JSON.parse(localStorage.getItem('travelBookmarks')) || [];

            if (bookmarks.length === 0) {
                profileBookmarksList.innerHTML = '<p style="padding:16px; text-align:center; color:var(--text-muted); background:white; border-radius:8px; border:1px solid #E5E7EB;">ยังไม่มีสถานที่ที่บันทึกไว้</p>';
                return;
            }

            let html = '';
            bookmarks.forEach(bmId => {
                const p = places.find(place => place.id === bmId);
                if (p) {
                    html += `
                    <div class="list-card">
                        <img src="${p.img}" class="list-img" alt="${p.nameTh}">
                        <div class="list-body">
                            <div class="flex justify-between items-center w-100">
                                <span class="badge mb-1" data-i18n="badge_${p.category}">หมวดหมู่</span>
                                <button class="remove-btn" title="ลบออกจากรายการโปรด" onclick="removeBookmark(${p.id})">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <h3 style="font-size:1.1rem; margin-bottom:4px;">${p.nameTh}</h3>
                            <p class="text-small text-muted">อ.${p.amphoe}</p>
                            <a href="detail.html?id=${p.id}" class="text-small mt-2" style="color:var(--primary-orange); font-weight:600;">ดูรายละเอียด ></a>
                        </div>
                    </div>`;
                }
            });
            profileBookmarksList.innerHTML = html;
        };

        window.removeBookmark = (id) => {
            let bookmarks = JSON.parse(localStorage.getItem('travelBookmarks')) || [];
            bookmarks = bookmarks.filter(bmId => bmId !== id);
            localStorage.setItem('travelBookmarks', JSON.stringify(bookmarks));
            loadProfileBookmarks();
        };

        loadProfileBookmarks();
    }
});
