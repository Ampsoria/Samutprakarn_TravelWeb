const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Seed Categories
  const categories = [
    { slug: 'nature', nameTh: 'ธรรมชาติ', nameEn: 'Nature', icon: '🌳', sortOrder: 1 },
    { slug: 'temple', nameTh: 'วัดและธรรมะ', nameEn: 'Temple & Dharma', icon: '🛕', sortOrder: 2 },
    { slug: 'history', nameTh: 'สถานที่ประวัติศาสตร์', nameEn: 'Historical Place', icon: '🏛️', sortOrder: 3 },
    { slug: 'art', nameTh: 'ศิลปวัฒนธรรม', nameEn: 'Art & Culture', icon: '🎨', sortOrder: 4 },
    { slug: 'food', nameTh: 'ช้อปปิ้ง/อาหาร', nameEn: 'Shopping/Food', icon: '🍽️', sortOrder: 5 },
    { slug: 'cafe', nameTh: 'คาเฟ่', nameEn: 'Cafe', icon: '☕', sortOrder: 6 },
    { slug: 'shopping', nameTh: 'ช้อปปิ้ง', nameEn: 'Shopping', icon: '🛍️', sortOrder: 7 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log('  ✅ Categories seeded');

  // 2. Seed Amphoes
  const amphoes = [
    { slug: 'mueang', nameTh: 'เมืองสมุทรปราการ', nameEn: 'Mueang Samut Prakan', sortOrder: 1 },
    { slug: 'bang_phli', nameTh: 'บางพลี', nameEn: 'Bang Phli', sortOrder: 2 },
    { slug: 'phra_pradaeng', nameTh: 'พระประแดง', nameEn: 'Phra Pradaeng', sortOrder: 3 },
    { slug: 'phra_samut_chedi', nameTh: 'พระสมุทรเจดีย์', nameEn: 'Phra Samut Chedi', sortOrder: 4 },
    { slug: 'bang_bo', nameTh: 'บางบ่อ', nameEn: 'Bang Bo', sortOrder: 5 },
  ];

  for (const amp of amphoes) {
    await prisma.amphoe.upsert({
      where: { slug: amp.slug },
      update: amp,
      create: amp,
    });
  }
  console.log('  ✅ Amphoes seeded');

  // 3. Seed Admin User
  const adminPasswordHash = await bcrypt.hash('admin123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@samutprakan.com' },
    update: {},
    create: {
      email: 'admin@samutprakan.com',
      passwordHash: adminPasswordHash,
      fullName: 'Admin System',
      role: 'admin',
      interests: 'nature,temple,history',
    },
  });
  console.log('  ✅ Admin user seeded');

  // 4. Seed Places (all 20 places from original main.js)
  const placesData = [
    {
      nameTh: 'สถานตากอากาศบางปู', nameEn: 'Bang Pu Recreation Center',
      slug: 'bang-pu-recreation-center', category: 'nature', amphoe: 'mueang', price: 0,
      descriptionTh: 'สัมผัสลมทะเลและชมพระอาทิตย์ตกที่สวยที่สุดในสมุทรปราการ! สถานตากอากาศบางปูเป็นสถานที่พักผ่อนหย่อนใจระดับตำนาน ไฮไลท์เด็ดคือการมาให้อาหารฝูงนกนางนวลอพยพสีขาวนับพันตัวที่หนีหนาวจากไซบีเรียในช่วงเดือนพฤศจิกายนถึงเมษายน เดินทอดน่องบน "สะพานสุขตา" ที่ทอดยาวออกไปในอ่าวไทย พร้อมลิ้มลองอาหารทะเลสดใหม่ที่ร้านอาหารศาลาสุขใจในบรรยากาศสุดโรแมนติก',
      descriptionEn: 'Experience the sea breeze and the most breathtaking sunset in Samut Prakan! Bang Pu is a legendary coastal retreat. The absolute highlight is feeding thousands of white migratory seagulls escaping the Siberian winter from November to April. Stroll along the "Sukta Pier" stretching into the Gulf of Thailand, and indulge in fresh seafood at the pavilion restaurant with a truly romantic vibe.',
      imageUrl: 'images/bangpu.jpg',
    },
    {
      nameTh: 'วัดอโศการาม', nameEn: 'Wat Asokaram',
      slug: 'wat-asokaram', category: 'temple', amphoe: 'mueang', price: 0,
      descriptionTh: 'ค้นพบความสงบที่แท้จริงท่ามกลางสถาปัตยกรรมอันงดงามวิจิตร วัดอโศการามโดดเด่นด้วย "พระธุตังคเจดีย์" เจดีย์หมู่สีขาวบริสุทธิ์ 13 องค์ที่ตั้งตระหง่านตัดกับสีฟ้าของท้องฟ้า บรรยากาศภายในวัดร่มรื่นท่ามกลางป่าชายเลนและสายลมทะเล เหมาะอย่างยิ่งสำหรับการหลีกหนีความวุ่นวายมาปฏิบัติธรรม หรือเดินชมความงามของศิลปะพุทธศาสนาที่หาชมได้ยาก',
      descriptionEn: 'Discover true tranquility amidst magnificent architecture. Wat Asokaram is renowned for its "Phra Thutangkha Chedi", a stunning group of 13 pure white stupas standing elegantly against the blue sky. Surrounded by mangrove forests and sea breeze, the temple offers a peaceful sanctuary perfect for meditation retreats or simply admiring rare Buddhist artistry.',
      imageUrl: 'images/wataso.jpg',
    },
    {
      nameTh: 'เมืองโบราณ', nameEn: 'Ancient City (Muang Boran)',
      slug: 'ancient-city', category: 'history', amphoe: 'mueang', price: 400,
      descriptionTh: 'ท่องไปทั่วเมืองไทยในวันเดียว! เมืองโบราณคือพิพิธภัณฑ์กลางแจ้งที่ใหญ่ที่สุดในโลก ครอบคลุมพื้นที่กว่า 800 ไร่ ที่นี่จำลองและรวบรวมสถาปัตยกรรม วัดวาอาราม ปราสาท และสถานที่สำคัญทางประวัติศาสตร์จากทั่วทุกภูมิภาคของไทยมาไว้ในที่เดียว คุณสามารถเช่าจักรยานปั่นรับลม หรือนั่งรถรางชมความอลังการของศิลปะไทยที่ถูกรังสรรค์ขึ้นอย่างประณีต',
      descriptionEn: 'Travel all over Thailand in a single day! The Ancient City is the world\'s largest open-air museum, spanning over 320 acres. It features incredibly accurate replicas and relocated structures of temples, palaces, and historical landmarks from every region of Thailand. Rent a bicycle or take a tram to explore this breathtaking masterpiece of Thai architectural heritage.',
      imageUrl: 'images/muengboran.jpg',
    },
    {
      nameTh: 'พิพิธภัณฑ์ช้างเอราวัณ', nameEn: 'Erawan Museum',
      slug: 'erawan-museum', category: 'art', amphoe: 'mueang', price: 250,
      descriptionTh: 'ตื่นตากับประติมากรรมลอยตัวรูปช้าง 3 เศียรที่ทำจากทองแดงเคาะมือขนาดมหึมาที่สุดในโลก! พิพิธภัณฑ์ช้างเอราวัณไม่ได้เป็นเพียงจุดถ่ายรูปที่อลังการ แต่ภายในยังซ่อนการตกแต่งที่วิจิตรตระการตา ผสมผสานศิลปะตะวันออกและตะวันตกเข้าด้วยกันอย่างลงตัว พร้อมจัดแสดงโบราณวัตถุและศิลปวัตถุล้ำค่าที่ประเมินค่าไม่ได้ เป็นอีกหนึ่งแลนด์มาร์คที่ต้องมาเยือนสักครั้งในชีวิต',
      descriptionEn: 'Marvel at the world\'s largest hand-carved copper sculpture of a three-headed elephant! The Erawan Museum is not just a spectacular photo spot; inside, it reveals an astonishingly ornate interior that flawlessly blends Eastern and Western art. Housing priceless antiques and religious artifacts spanning centuries, it is an absolute must-visit landmark of magnificent proportions.',
      imageUrl: 'images/cang.jpg',
    },
    {
      nameTh: 'ตลาดน้ำบางน้ำผึ้ง', nameEn: 'Bang Nam Phueng Floating Market',
      slug: 'bang-nam-phueng-market', category: 'food', amphoe: 'phra_pradaeng', price: 0,
      descriptionTh: 'สวรรค์ของคนรักการกิน! ตลาดน้ำบางน้ำผึ้งซ่อนตัวอยู่ใน "คุ้งบางกะเจ้า" ท่ามกลางธรรมชาติที่ร่มรื่น ที่นี่เต็มไปด้วยเสน่ห์ของตลาดชุมชนดั้งเดิม อัดแน่นไปด้วยของกินท้องถิ่น ขนมไทยโบราณที่หาทานยาก อาหารทะเลเผา และผลไม้สดจากสวน เดินชิมไปตามริมคลอง หรือจะนั่งเรือพายชมวิถีชีวิตชาวบ้านก็เป็นประสบการณ์ที่น่าประทับใจ (เปิดเฉพาะเสาร์-อาทิตย์และวันหยุดนักขัตฤกษ์)',
      descriptionEn: 'A true paradise for food lovers! Hidden within the lush nature of the "Green Lung" (Bang Kra Jao), Bang Nam Phueng Floating Market exudes the charm of a traditional community market. It\'s packed with local delicacies, rare traditional Thai desserts, grilled seafood, and fresh orchard fruits. Stroll along the canal tasting treats, or take a rowboat ride to experience local life. (Open weekends and public holidays only).',
      imageUrl: 'images/bangnampeang.png',
    },
    {
      nameTh: 'คุ้งบางกะเจ้า', nameEn: 'Bang Kra Jao (Green Lung)',
      slug: 'bang-kra-jao', category: 'nature', amphoe: 'phra_pradaeng', price: 0,
      descriptionTh: 'หลีกหนีมลพิษเมืองกรุงมาสูดอากาศบริสุทธิ์ที่ "ปอดของกรุงเทพฯ" คุ้งบางกะเจ้าคือพื้นที่สีเขียวรูปกระเพาะหมูที่โอบล้อมด้วยแม่น้ำเจ้าพระยา กิจกรรมยอดฮิตคือการเช่าจักรยานปั่นลัดเลาะไปตามเส้นทางป่าชายเลน แวะพักจิบกาแฟที่คาเฟ่ร่มรื่นในสวน แวะชมพิพิธภัณฑ์ปลากัดไทย และสัมผัสวิถีชีวิตสโลว์ไลฟ์ที่อยู่ห่างจากตึกระฟ้าเพียงแค่ข้ามแม่น้ำ',
      descriptionEn: 'Escape the city pollution and breathe fresh air at the "Green Lung of Bangkok". Bang Kra Jao is a massive pig-stomach-shaped green oasis surrounded by the Chao Phraya River. The most popular activity here is cycling through elevated paths in the mangrove forests, stopping by hidden garden cafes, visiting the Siamese Fighting Fish Gallery, and enjoying a slow-life vibe just a river-crossing away from skyscrapers.',
      imageUrl: 'images/kung.jpg',
    },
    {
      nameTh: 'ฟาร์มจระเข้สมุทรปราการ', nameEn: 'Samut Prakan Crocodile Farm & Zoo',
      slug: 'crocodile-farm', category: 'nature', amphoe: 'mueang', price: 300,
      descriptionTh: 'ตื่นเต้นเร้าใจไปกับฟาร์มจระเข้ที่ใหญ่ที่สุดในโลก! ที่นี่คือบ้านของจระเข้กว่า 60,000 ตัวหลากหลายสายพันธุ์ พลาดไม่ได้กับการแสดงจับจระเข้ด้วยมือเปล่าสุดหวาดเสียวที่โด่งดังไปทั่วโลก นอกจากนี้ยังมีโซนสวนสัตว์ที่ให้คุณได้ใกล้ชิดกับช้าง เสือ ลิงชิมแปนซี และนกนานาชนิด เป็นจุดหมายปลายทางที่เหมาะสำหรับการพาลูกหลานมาเปิดประสบการณ์ใหม่ๆ',
      descriptionEn: 'Get your adrenaline pumping at the world\'s largest crocodile farm! Home to over 60,000 crocodiles of various species, the absolute highlight is the world-renowned, heart-stopping bare-handed crocodile wrestling show. The venue also features a zoo zone where you can get up close with elephants, tigers, chimpanzees, and exotic birds. A thrilling destination perfect for family adventures.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Samutprakarn_CrocodileFarm2.jpg/960px-Samutprakarn_CrocodileFarm2.jpg',
    },
    {
      nameTh: 'วัดพระสมุทรเจดีย์', nameEn: 'Wat Phra Samut Chedi',
      slug: 'wat-phra-samut-chedi', category: 'temple', amphoe: 'phra_samut_chedi', price: 0,
      descriptionTh: 'สักการะสิ่งศักดิ์สิทธิ์คู่บ้านคู่เมือง "พระสมุทรเจดีย์" หรือที่ชาวบ้านเรียกขานว่า "พระเจดีย์กลางน้ำ" ปูชนียสถานอันทรงคุณค่าที่อยู่คู่สมุทรปราการมาตั้งแต่สมัยรัชกาลที่ 2 แม้ปัจจุบันกาลเวลาจะทำให้แผ่นดินงอกเชื่อมต่อจนไม่ได้ตั้งอยู่กลางน้ำแล้ว แต่ความงดงามขององค์เจดีย์สีขาวและงานนมัสการองค์พระสมุทรเจดีย์ประจำปียังคงยิ่งใหญ่และเปี่ยมไปด้วยศรัทธา',
      descriptionEn: 'Pay respects to the provincial symbol, "Phra Samut Chedi", traditionally known as the "Pagoda in the Water". Built during the reign of King Rama II, this sacred monument has immense historical and spiritual significance. Although natural land reclamation means it no longer sits completely in the water, its stunning white structure and the grand annual temple fair continue to draw devoted crowds from all over.',
      imageUrl: 'images/prasamutjede.jpg',
    },
    {
      nameTh: 'ป้อมพระจุลจอมเกล้า', nameEn: 'Phra Chulachomklao Fort',
      slug: 'phra-chulachomklao-fort', category: 'history', amphoe: 'phra_samut_chedi', price: 0,
      descriptionTh: 'ย้อนรอยประวัติศาสตร์การปกป้องอธิปไตยของชาติ ณ ป้อมปราการริมปากแม่น้ำเจ้าพระยาที่สร้างขึ้นในสมัยรัชกาลที่ 5 สัมผัสปืนใหญ่ "ปืนเสือหมอบ" ของจริงที่เคยใช้ปกป้องแผ่นดินไทยในวิกฤตการณ์ ร.ศ. 112 เดินชมเรือหลวงแม่กลองที่ปลดประจำการแล้ว และเพลิดเพลินกับเส้นทางศึกษาธรรมชาติป่าชายเลน พร้อมแวะชิมอาหารทะเลสดๆ ที่สโมสรทหารเรือ',
      descriptionEn: 'Step back in history to a time of national defense at this Chao Phraya river mouth fortress built by King Rama V. See the actual "Disappearing Guns" used to defend Thailand during the Franco-Siamese War of 1893 (R.S. 112 incident). Explore the decommissioned HTMS Mae Klong warship, walk through the mangrove nature trails, and dine on fresh seafood at the navy club.',
      imageUrl: 'images/bompajun.jpg',
    },
    {
      nameTh: 'วัดบางพลีใหญ่ใน', nameEn: 'Wat Bang Phli Yai Nai',
      slug: 'wat-bang-phli-yai-nai', category: 'temple', amphoe: 'bang_phli', price: 0,
      descriptionTh: 'กราบขอพร "หลวงพ่อโต" พระพุทธรูปศักดิ์สิทธิ์ปางมารวิชัยสมัยสุโขทัยที่เล่าขานกันว่าลอยน้ำมาตามตำนานพระพุทธรูป 3 พี่น้อง วัดนี้เป็นศูนย์รวมจิตใจของชาวบางพลี มีประเพณี "รับบัว" อันยิ่งใหญ่ที่เป็นเอกลักษณ์หนึ่งเดียวในโลก จัดขึ้นอย่างตระการตาในทุกๆ ปีช่วงเทศกาลออกพรรษา',
      descriptionEn: 'Seek blessings from "Luang Pho To", a highly revered Sukhothai-era Buddha statue which, according to legend, floated down the river. As the spiritual heart of Bang Phli district, this temple is globally famous for hosting the spectacular "Lotus Throwing Festival" (Rap Bua), a unique water-borne merit-making tradition held annually at the end of Buddhist Lent.',
      imageUrl: 'images/watbangphiyiania.jpg',
    },
    {
      nameTh: 'หอชมเมืองสมุทรปราการ', nameEn: 'Samut Prakan Observation Tower',
      slug: 'observation-tower', category: 'art', amphoe: 'mueang', price: 100,
      descriptionTh: 'เปิดมุมมองใหม่ด้วยการชมวิวพานอรามา 360 องศาบนหอคอยสูงระฟ้า! ดื่มด่ำกับทัศนียภาพของโค้งแม่น้ำเจ้าพระยาที่ทอดตัวลงสู่อ่าวไทย ปากน้ำเมืองสมุทรปราการ และวิวเมืองกรุงเทพฯ แบบสุดลูกหูลูกตา ภายในยังจัดแสดงนิทรรศการอินเตอร์แอคทีฟ "ร้อยเรื่องราวเมืองปากน้ำ" ที่เล่าประวัติศาสตร์ของจังหวัดได้อย่างสนุกสนานและล้ำสมัย',
      descriptionEn: 'Gain a whole new perspective with a 360-degree panoramic view from this towering landmark! Soak in the breathtaking vistas of the Chao Phraya River curving into the Gulf of Thailand, the bustling Pak Nam city, and the distant Bangkok skyline. Inside, the tower features a highly interactive and modern exhibition detailing the rich history and evolution of Samut Prakan province in a fun, engaging way.',
      imageUrl: 'images/towel.jpg',
    },
    {
      nameTh: 'ตลาดคลองสวน 100 ปี', nameEn: 'Khlong Suan 100 Years Market',
      slug: 'khlong-suan-market', category: 'food', amphoe: 'bang_bo', price: 0,
      descriptionTh: 'นั่งไทม์แมชชีนกลับไปสัมผัสบรรยากาศตลาดเก่าแก่ที่มีอายุยาวนานกว่าศตวรรษ ตลาดคลองสวน 100 ปี ตั้งอยู่บนรอยต่อระหว่างสมุทรปราการและฉะเชิงเทรา โดดเด่นด้วยห้องแถวไม้เรียงรายริมคลอง เสน่ห์ของที่นี่คือกลิ่นอายคลาสสิกของร้านโชห่วย ร้านตัดผมโบราณ และสวรรค์ของนักชิมที่มีทั้งเป็ดพะโล้ กาแฟโบราณ และขนมหวานยุคเก่าที่ยังคงรสชาติออริจินัล',
      descriptionEn: 'Take a time machine back to a century-old traditional market. Spanning the border of Samut Prakan and Chachoengsao, Khlong Suan 100 Years Market features rows of classic wooden shop-houses along the canal. Its charm lies in the vintage atmosphere of old grocery stores, antique barbershops, and a food lover\'s paradise offering famous braised duck, traditional Thai coffee, and authentic retro snacks.',
      imageUrl: 'images/Klongsuan.jpg',
    },
    {
      nameTh: 'วัดโปรดเกศเชษฐาราม', nameEn: 'Wat Protket Chettharam',
      slug: 'wat-protket-chettharam', category: 'temple', amphoe: 'phra_pradaeng', price: 0,
      descriptionTh: 'ชื่นชมความวิจิตรของศิลปะไทยบริสุทธิ์ วัดโปรดเกศเชษฐารามเป็นพระอารามหลวงชั้นตรี และเป็นวัดพุทธศาสนาแบบไทยแท้เพียงแห่งเดียวในย่านพระประแดงที่ล้อมรอบด้วยวัดพุทธแนวมอญ โดดเด่นด้วยพระมณฑปที่มุงหลังคาด้วยกระเบื้องเคลือบสีอย่างงดงาม และสถาปัตยกรรมที่สะท้อนถึงงานช่างฝีมือชั้นสูงในยุคต้นกรุงรัตนโกสินทร์',
      descriptionEn: 'Admire the exquisite beauty of pure Thai architecture. Wat Protket Chettharam is a royal temple and notably the only authentic Thai-style Buddhist temple in the Phra Pradaeng area, which is otherwise dominated by Mon-style temples. It stands out with its beautifully crafted pavilion topped with colored glazed tiles, showcasing the high-tier craftsmanship of the early Rattanakosin era.',
      imageUrl: 'images/watpodgate.jpg',
    },
    {
      nameTh: 'สวนสุขภาพลัดโพธิ์', nameEn: 'Lat Pho Park',
      slug: 'lat-pho-park', category: 'nature', amphoe: 'phra_pradaeng', price: 0,
      descriptionTh: 'พักผ่อนหย่อนใจใต้ร่มเงาสะพานแขวนขนาดยักษ์ สวนสุขภาพลัดโพธิ์ตั้งอยู่บริเวณใต้สะพานภูมิพล 1 และ 2 เป็นพื้นที่สีเขียวที่ออกแบบมาอย่างสวยงามพร้อมวิวแม่น้ำเจ้าพระยา มีรูปหล่อในหลวงรัชกาลที่ 9 ทรงงานที่ประชาชนนิยมมากราบไหว้ ช่วงเย็นจะมีแสงไฟจากสะพานสาดส่องลงมา เป็นจุดถ่ายรูปและสถานที่วิ่งออกกำลังกายที่โรแมนติกที่สุดแห่งหนึ่ง',
      descriptionEn: 'Relax under the shadow of giant suspension bridges. Lat Pho Park, located beneath the majestic Bhumibol Bridges 1 and 2, is a beautifully landscaped green space with sweeping views of the Chao Phraya River. It features a revered statue of King Rama IX. In the evenings, the bridges illuminate, creating a breathtaking and romantic backdrop perfect for photography, jogging, or evening strolls.',
      imageUrl: 'images/parkludpo.jpg',
    },
    {
      nameTh: 'วัดกลางวรวิหาร', nameEn: 'Wat Klang Worawihan',
      slug: 'wat-klang-worawihan', category: 'temple', amphoe: 'mueang', price: 0,
      descriptionTh: 'สัมผัสกลิ่นอายประวัติศาสตร์ในวัดคู่บ้านคู่เมืองสมุทรปราการ วัดกลางวรวิหารเป็นพระอารามหลวงเก่าแก่ที่สร้างขึ้นตั้งแต่สมัยอยุธยาตอนปลาย ภายในพระอุโบสถประดิษฐานพระพุทธรูปปางมารวิชัยที่งดงาม และมีจิตรกรรมฝาผนังอันทรงคุณค่า นอกจากนี้ยังมีเจดีย์ทรงระฆังคว่ำศิลปะอยุธยาที่สมบูรณ์ เป็นศูนย์รวมศรัทธาของชาวปากน้ำอย่างแท้จริง',
      descriptionEn: 'Experience historical charm at the principal temple of Samut Prakan. Wat Klang Worawihan is an ancient royal temple built during the late Ayutthaya period. Its ordination hall enshrines a beautiful Mara-subduing Buddha statue and preserves invaluable traditional murals. The temple also features a perfectly preserved Ayutthaya-style bell-shaped stupa, remaining a spiritual anchor for the local people.',
      imageUrl: 'images/watkang.jpg',
    },
    {
      nameTh: 'พิพิธภัณฑ์ทหารเรือ', nameEn: 'Royal Thai Navy Museum',
      slug: 'navy-museum', category: 'history', amphoe: 'mueang', price: 0,
      descriptionTh: 'ดำดิ่งสู่โลกแห่งการเดินเรือและประวัติศาสตร์ราชนาวีไทย! พิพิธภัณฑ์แห่งนี้รวบรวมยุทโธปกรณ์ อาวุธปืนโบราณ เครื่องแบบทหารเรือ และโมเดลเรือรบสำคัญๆ มากมาย ไฮไลท์คือเรือดำน้ำจำลองและยุทโธปกรณ์ที่เคยใช้ในสงครามจริง ผู้ที่ชื่นชอบประวัติศาสตร์การทหารและเทคโนโลยีทางเรือจะต้องตื่นตาตื่นใจกับของสะสมที่หาดูได้ยากเหล่านี้',
      descriptionEn: 'Dive deep into the maritime world and the history of the Royal Thai Navy! This museum exhibits a fascinating collection of naval equipment, antique artillery, uniforms, and detailed models of significant warships. Highlights include submarine replicas and actual weaponry used in past conflicts. Military history buffs and naval tech enthusiasts will be completely captivated by these rare artifacts.',
      imageUrl: 'images/navym.jfif',
    },
    {
      nameTh: 'ป้อมผีเสื้อสมุทร', nameEn: 'Phi Suea Samut Fort',
      slug: 'phi-suea-samut-fort', category: 'history', amphoe: 'phra_samut_chedi', price: 0,
      descriptionTh: 'ผจญภัยในป้อมปราการบนเกาะร้างกลางแม่น้ำ! ป้อมผีเสื้อสมุทรตั้งอยู่บนเกาะกลางแม่น้ำเจ้าพระยา ต้องนั่งเรือข้ามไปเท่านั้น สร้างขึ้นสมัยรัชกาลที่ 2 ด้วยรูปทรงคล้ายผีเสื้อกางปีก ปัจจุบันรายล้อมด้วยป่าชายเลนที่อุดมสมบูรณ์และเงียบสงบ ภายในมีปืนใหญ่อาร์มสตรองและคุกโบราณ เป็นสถานที่ท่องเที่ยวแนวลึกลับเชิงประวัติศาสตร์ที่น้อยคนจะรู้จัก',
      descriptionEn: 'Embark on an adventure to a fortress on a deserted river island! Phi Suea Samut Fort, accessible only by a short boat ride, sits on an island in the Chao Phraya River. Built during King Rama II\'s reign, its layout resembles a butterfly spreading its wings. Now surrounded by serene mangrove forests, it houses Armstrong cannons and ancient dungeons. A brilliant off-the-beaten-path historical mystery.',
      imageUrl: 'images/bom.jpg',
    },
    {
      nameTh: 'วัดบางพลีใหญ่กลาง', nameEn: 'Wat Bang Phli Yai Klang',
      slug: 'wat-bang-phli-yai-klang', category: 'temple', amphoe: 'bang_phli', price: 0,
      descriptionTh: 'สักการะ "พระศากยมุนีศรีสุเมธบพิตร" พระพุทธรูปปางไสยาสน์ (พระนอน) ที่มีขนาดยาวที่สุดในประเทศไทย! ความอลังการขององค์พระที่ยาวถึง 53 เมตรสร้างความตื่นตาตื่นใจแก่ผู้มาเยือน นอกจากนี้ ภายในองค์พระนอนยังถูกสร้างเป็นห้องคูหา 4 ชั้น ที่ประกอบด้วยภาพจิตรกรรมฝาผนัง นรก-สวรรค์ และห้องโถงปฏิบัติธรรม นับเป็นประติมากรรมที่น่าทึ่งอย่างยิ่ง',
      descriptionEn: 'Pay reverence to the longest reclining Buddha statue in Thailand! Measuring an astonishing 53 meters in length, the sheer scale of the "Phra Sakyamuni Si Sumet Bophit" is simply awe-inspiring. What makes it even more incredible is that the interior of the statue is hollow and features four floors containing murals of heaven and hell, as well as meditation halls. A truly mind-boggling architectural marvel.',
      imageUrl: 'images/watbangphiyiaklang.jpg',
    },
    {
      nameTh: 'สวนศรีนครเขื่อนขันธ์', nameEn: 'Sri Nakhon Khuean Khan Park',
      slug: 'sri-nakhon-khuean-khan-park', category: 'nature', amphoe: 'phra_pradaeng', price: 0,
      descriptionTh: 'สวรรค์ของนักปั่นและนักดูนก สวนศรีนครเขื่อนขันธ์ตั้งอยู่ในคุ้งบางกะเจ้า พื้นที่กว่า 200 ไร่แห่งนี้เต็มไปด้วยพรรณไม้ป่าชายเลนและไม้ยืนต้น มีหอดูวิวนกสูง 7 เมตรที่เป็นมุมถ่ายรูปฮิปสเตอร์สุดฮิต เช่าจักรยานมาปั่นรับโอโซน แวะให้อาหารปลา หรือจะปูเสื่อปิกนิกใต้ร่มไม้ ที่นี่คือจุดชาร์จแบตชีวิตชั้นดีในวันหยุด',
      descriptionEn: 'A haven for cyclists and bird watchers. Sri Nakhon Khuean Khan Park is located in the Bang Kra Jao peninsula. Covering over 80 acres, it is densely packed with mangrove and perennial flora. It features a 7-meter-tall bird-watching tower that has become a highly popular photography spot. Rent a bike to soak up the ozone, feed the fish, or enjoy a picnic under the trees. The ultimate weekend recharge spot.',
      imageUrl: 'images/park.jpg',
    },
    {
      nameTh: 'วัดไพชยนต์พลเสพย์ราชวรวิหาร', nameEn: 'Wat Phaichiyon Phonlasep',
      slug: 'wat-phaichiyon-phonlasep', category: 'temple', amphoe: 'phra_pradaeng', price: 0,
      descriptionTh: 'ชมศิลปะปูนปั้นที่สวยงามตระการตา วัดนี้เป็นพระอารามหลวงชั้นโทที่สร้างขึ้นในสมัยรัชกาลที่ 2 โดดเด่นด้วยพระอุโบสถและพระวิหารที่ไม่มีช่อฟ้าใบระกาตามแบบพระราชนิยมในรัชกาลที่ 3 ลวดลายปูนปั้นประดับหน้าบันและซุ้มประตูหน้าต่างมีความประณีตงดงามมาก บรรยากาศภายในวัดเงียบสงบ ร่มรื่น และเต็มไปด้วยกลิ่นอายของประวัติศาสตร์',
      descriptionEn: 'Admire spectacularly intricate stucco art. This second-class royal temple was built during the reign of King Rama II. It stands out with its ordination hall and vihara that uniquely lack the traditional Thai roof finials (Chofa), following the popular royal style of King Rama III. The stucco patterns decorating the gables and window frames are remarkably exquisite. The temple grounds are peaceful, shaded, and steeped in history.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AD%E0%B8%B8%E0%B9%82%E0%B8%9A%E0%B8%AA%E0%B8%96%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%84%E0%B8%9E%E0%B8%8A%E0%B8%A2%E0%B8%99%E0%B8%95%E0%B9%8C%E0%B8%9E%E0%B8%A5%E0%B9%80%E0%B8%AA%E0%B8%9E%E0%B8%A2%E0%B9%8C%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%A7%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg',
    },
  ];

  for (const placeData of placesData) {
    const { imageUrl, ...placeFields } = placeData;
    const place = await prisma.place.upsert({
      where: { slug: placeData.slug },
      update: placeFields,
      create: placeFields,
    });

    // Create or update cover image
    const existingImage = await prisma.placeImage.findFirst({
      where: { placeId: place.id, isCover: true },
    });
    if (existingImage) {
      await prisma.placeImage.update({
        where: { id: existingImage.id },
        data: { imageUrl: imageUrl, altText: placeData.nameTh },
      });
    } else {
      await prisma.placeImage.create({
        data: {
          placeId: place.id,
          imageUrl: imageUrl,
          altText: placeData.nameTh,
          isCover: true,
          sortOrder: 0,
        },
      });
    }
  }
  console.log('  ✅ 20 Places seeded with cover images');

  // 5. No Demo Reviews
  console.log('  ✅ Skipped demo reviews (Real use mode)');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
