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

  // 3. Seed Users
  const adminPasswordHash = await bcrypt.hash('admin123', 12);
  const userPasswordHash = await bcrypt.hash('password', 12);

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

  const demoUser = await prisma.user.upsert({
    where: { email: 'somchai@email.com' },
    update: {},
    create: {
      email: 'somchai@email.com',
      passwordHash: userPasswordHash,
      fullName: 'Somchai Jaidee',
      role: 'user',
      interests: 'temple,nature,cafe',
    },
  });
  console.log('  ✅ Users seeded (admin + demo)');

  // 4. Seed Places (all 20 places from original main.js)
  const placesData = [
    {
      nameTh: 'สถานตากอากาศบางปู', nameEn: 'Bang Pu Recreation Center',
      slug: 'bang-pu-recreation-center', category: 'nature', amphoe: 'mueang', price: 0,
      descriptionTh: 'สถานตากอากาศริมทะเลอ่าวไทย เป็นจุดดูนกนางนวลอพยพจากไซบีเรียในช่วงฤดูหนาว มีสะพานสุขตาทอดยาวออกไปในทะเล ร้านอาหารทะเลวิวสวย',
      descriptionEn: 'A seaside retreat on the Gulf of Thailand, famous for migratory seagulls from Siberia in winter. Features a long pier and seafood restaurants with stunning views.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Bang_Pu_Seaside_Resort_-_Samut_Prakan_-_panoramio.jpg/800px-Bang_Pu_Seaside_Resort_-_Samut_Prakan_-_panoramio.jpg',
    },
    {
      nameTh: 'วัดอโศการาม', nameEn: 'Wat Asokaram',
      slug: 'wat-asokaram', category: 'temple', amphoe: 'mueang', price: 0,
      descriptionTh: 'วัดที่มีสถาปัตยกรรมสีขาวสวยงาม บรรยากาศสงบเงียบ เหมาะแก่การปฏิบัติธรรมและถ่ายรูป ตั้งอยู่ริมทะเลบางปู',
      descriptionEn: 'A serene temple with beautiful white architecture, perfect for meditation and photography, located near the coast of Bang Pu.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Wat_Asokaram_Temple_Samut_Prakan.jpg/800px-Wat_Asokaram_Temple_Samut_Prakan.jpg',
    },
    {
      nameTh: 'เมืองโบราณ', nameEn: 'Ancient City (Muang Boran)',
      slug: 'ancient-city', category: 'history', amphoe: 'mueang', price: 400,
      descriptionTh: 'พิพิธภัณฑ์กลางแจ้งที่ใหญ่ที่สุดในโลก รวบรวมสถานที่สำคัญทางวัฒนธรรมไทยจากทั่วประเทศกว่า 121 แห่ง ปั่นจักรยานชมได้ทั้งวัน',
      descriptionEn: 'The world\'s largest open-air museum, showcasing over 121 replicas of Thailand\'s cultural landmarks. Great for cycling and sightseeing.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Samutprakarn_Ancient_Siam_2.jpg/800px-Samutprakarn_Ancient_Siam_2.jpg',
    },
    {
      nameTh: 'พิพิธภัณฑ์ช้างเอราวัณ', nameEn: 'Erawan Museum',
      slug: 'erawan-museum', category: 'art', amphoe: 'mueang', price: 250,
      descriptionTh: 'สถานที่ศักดิ์สิทธิ์ที่มีรูปปั้นช้างสามเศียรขนาดมหึมา ภายในจัดแสดงศิลปวัตถุล้ำค่าหลายชิ้น ผสมผสานศิลปะ วัฒนธรรม และศาสนาอย่างงดงาม',
      descriptionEn: 'A sacred place with a massive three-headed elephant statue, housing priceless art collections blending art, culture, and religion.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Erawan_Museum_2019.jpg/800px-Erawan_Museum_2019.jpg',
    },
    {
      nameTh: 'ตลาดน้ำบางน้ำผึ้ง', nameEn: 'Bang Nam Phueng Floating Market',
      slug: 'bang-nam-phueng-market', category: 'food', amphoe: 'phra_pradaeng', price: 0,
      descriptionTh: 'ตลาดน้ำชุมชนในคุ้งบางกะเจ้า ขายสินค้าพื้นบ้าน อาหารคาวหวาน ผลไม้สด บรรยากาศริมคลองอันร่มรื่น เปิดวันเสาร์-อาทิตย์',
      descriptionEn: 'A community floating market in Bang Kra Jao, selling local treats, fruit, and savory dishes in a lush canal-side setting. Open weekends.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Bang_Nam_Phueng_Floating_Market_05.jpg/800px-Bang_Nam_Phueng_Floating_Market_05.jpg',
    },
    {
      nameTh: 'คุ้งบางกระเจ้า', nameEn: 'Bang Kra Jao (Green Lung)',
      slug: 'bang-kra-jao', category: 'nature', amphoe: 'phra_pradaeng', price: 0,
      descriptionTh: 'ปอดของกรุงเทพฯ พื้นที่สีเขียวขนาดใหญ่ เหมาะสำหรับปั่นจักรยาน พายเรือคายัค และสัมผัสวิถีชีวิตริมน้ำ',
      descriptionEn: 'Known as the "Lung of Bangkok", a large green area perfect for cycling, kayaking, and experiencing riverside lifestyle.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Bang_Krachao_from_Chao_Phraya_Sky_Park.jpg/800px-Bang_Krachao_from_Chao_Phraya_Sky_Park.jpg',
    },
    {
      nameTh: 'ฟาร์มจระเข้สมุทรปราการ', nameEn: 'Samut Prakan Crocodile Farm & Zoo',
      slug: 'crocodile-farm', category: 'nature', amphoe: 'mueang', price: 300,
      descriptionTh: 'ฟาร์มจระเข้ที่ใหญ่ที่สุดในประเทศไทย มีจระเข้กว่า 60,000 ตัว พร้อมโชว์จระเข้และสวนสัตว์ ครอบครัวชื่นชอบ',
      descriptionEn: 'Thailand\'s largest crocodile farm with over 60,000 crocodiles, featuring crocodile shows and a zoo. Great for families.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Samutprakarn_CrocodileFarm1.jpg/800px-Samutprakarn_CrocodileFarm1.jpg',
    },
    {
      nameTh: 'วัดพระสมุทรเจดีย์', nameEn: 'Wat Phra Samut Chedi',
      slug: 'wat-phra-samut-chedi', category: 'temple', amphoe: 'phra_samut_chedi', price: 0,
      descriptionTh: 'พระเจดีย์กลางน้ำ สัญลักษณ์ของจังหวัดสมุทรปราการ เป็นวัดที่มีพุทธศาสนิกชนมากราบไหว้สักการะมาอย่างยาวนาน',
      descriptionEn: 'The iconic "Chedi in the water", symbol of Samut Prakan province, a revered temple for Buddhist worship for centuries.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Wat_Phra_Samut_Chedi_%28I%29.jpg/800px-Wat_Phra_Samut_Chedi_%28I%29.jpg',
    },
    {
      nameTh: 'ป้อมพระจุลจอมเกล้า', nameEn: 'Phra Chulachomklao Fort',
      slug: 'phra-chulachomklao-fort', category: 'history', amphoe: 'phra_samut_chedi', price: 0,
      descriptionTh: 'ป้อมปืนสมัยรัชกาลที่ 5 สร้างเพื่อป้องกันประเทศจากภัยคุกคามทางทะเล เป็นสถานที่ทางประวัติศาสตร์ที่สำคัญยิ่ง',
      descriptionEn: 'A Rama V-era fort built to defend the kingdom from sea threats. An important historical site in Thai history.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Phra_Chulachomklao_Fort_%28II%29.jpg/800px-Phra_Chulachomklao_Fort_%28II%29.jpg',
    },
    {
      nameTh: 'วัดบางพลีใหญ่ใน', nameEn: 'Wat Bang Phli Yai Nai',
      slug: 'wat-bang-phli-yai-nai', category: 'temple', amphoe: 'bang_phli', price: 0,
      descriptionTh: 'วัดสำคัญประดิษฐานหลวงพ่อโต พระพุทธรูปปางมารวิชัยสมัยสุโขทัย ผู้คนนิยมมาขอพรเพื่อความเป็นสิริมงคล',
      descriptionEn: 'An important temple housing Luang Pho To, a Sukhothai-era Buddha image. Popular for blessings and merit-making.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Wat_Bang_Phli_Yai_Nai_01.jpg/800px-Wat_Bang_Phli_Yai_Nai_01.jpg',
    },
    {
      nameTh: 'หอชมเมืองสมุทรปราการ', nameEn: 'Samut Prakan Observation Tower',
      slug: 'observation-tower', category: 'art', amphoe: 'mueang', price: 100,
      descriptionTh: 'จุดชมวิว 360 องศาของจังหวัดสมุทรปราการ มองเห็นแม่น้ำเจ้าพระยาและเมืองโดยรอบ พร้อมนิทรรศการประวัติศาสตร์ท้องถิ่น',
      descriptionEn: '360-degree observatory of Samut Prakan province, overlooking the Chao Phraya River and surrounding city with local history exhibits.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Samut_Prakan_City_Hall.jpg/800px-Samut_Prakan_City_Hall.jpg',
    },
    {
      nameTh: 'ตลาดคลองสวน 100 ปี', nameEn: 'Khlong Suan 100 Years Market',
      slug: 'khlong-suan-market', category: 'food', amphoe: 'bang_bo', price: 0,
      descriptionTh: 'ตลาดเก่าแก่ริมคลองอายุกว่า 100 ปี รักษาวิถีชีวิตดั้งเดิมไว้ มีอาหารท้องถิ่นและขนมโบราณ ซึมซับบรรยากาศย้อนยุค',
      descriptionEn: 'A century-old canal-side market preserving traditional lifestyle with local foods and vintage snacks. Perfect for cultural immersion.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Khlong_Suan_100-Year_Market_05.jpg/800px-Khlong_Suan_100-Year_Market_05.jpg',
    },
    {
      nameTh: 'วัดโปรดเกศเชษฐาราม', nameEn: 'Wat Protket Chettharam',
      slug: 'wat-protket-chettharam', category: 'temple', amphoe: 'phra_pradaeng', price: 0,
      descriptionTh: 'วัดเก่าแก่ในย่านพระประแดง มีสถาปัตยกรรมอันงดงาม เป็นวัดไทยพุทธเพียงวัดเดียวที่มีเอกลักษณ์เฉพาะตัวในย่านนี้',
      descriptionEn: 'An ancient temple in Phra Pradaeng with beautiful architecture, the only Thai Buddhist temple with a unique style in this area.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Wat_Protkat_Chettharam_Ratchaworawihan_1.jpg/800px-Wat_Protkat_Chettharam_Ratchaworawihan_1.jpg',
    },
    {
      nameTh: 'สวนสุขภาพลัดโพธิ์', nameEn: 'Lat Pho Park',
      slug: 'lat-pho-park', category: 'nature', amphoe: 'phra_pradaeng', price: 0,
      descriptionTh: 'สวนสาธารณะที่ร่มรื่น ริมแม่น้ำเจ้าพระยา มีเส้นทางวิ่งและปั่นจักรยาน เหมาะกับการออกกำลังกายและพักผ่อนหย่อนใจ',
      descriptionEn: 'A lush public park along the Chao Phraya River with jogging and cycling paths, ideal for exercise and relaxation.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Lat_Pho_Park_Phra_Pradaeng.jpg/800px-Lat_Pho_Park_Phra_Pradaeng.jpg',
    },
    {
      nameTh: 'วัดกลางวรวิหาร', nameEn: 'Wat Klang Worawihan',
      slug: 'wat-klang-worawihan', category: 'temple', amphoe: 'mueang', price: 0,
      descriptionTh: 'วัดใจกลางเมืองสมุทรปราการ สร้างในสมัยอยุธยา ภายในมีพระอุโบสถเก่าแก่และพระพุทธรูปสำคัญ',
      descriptionEn: 'A temple in the heart of Samut Prakan city, built during the Ayutthaya period with an ancient ordination hall.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3_%E0%B8%AD.%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87_%E0%B8%88.%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%97%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3_%2815%29.jpg',
    },
    {
      nameTh: 'พิพิธภัณฑ์ทหารเรือ', nameEn: 'Royal Thai Navy Museum',
      slug: 'navy-museum', category: 'history', amphoe: 'mueang', price: 0,
      descriptionTh: 'จัดแสดงอาวุธ ยุทโธปกรณ์ และประวัติศาสตร์ราชนาวีไทย ตั้งอยู่ในบริเวณโรงเรียนนายเรือ',
      descriptionEn: 'Displays weapons, equipment, and the history of the Royal Thai Navy, located within the Naval Academy.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Royal_Thai_Navy_Headquarters.jpg/800px-Royal_Thai_Navy_Headquarters.jpg',
    },
    {
      nameTh: 'ป้อมผีเสื้อสมุทร', nameEn: 'Phi Suea Samut Fort',
      slug: 'phi-suea-samut-fort', category: 'history', amphoe: 'phra_samut_chedi', price: 0,
      descriptionTh: 'ป้อมบนเกาะกลางแม่น้ำเจ้าพระยา มีรูปทรงคล้ายผีเสื้อกางปีก สร้างเพื่อป้องกันประเทศ ปัจจุบันเป็นพิพิธภัณฑ์',
      descriptionEn: 'A butterfly-shaped fort on an island in the Chao Phraya River, built for national defense, now a museum.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Phi_Suea_Samut_Fort.jpg/800px-Phi_Suea_Samut_Fort.jpg',
    },
    {
      nameTh: 'วัดบางพลีใหญ่กลาง', nameEn: 'Wat Bang Phli Yai Klang',
      slug: 'wat-bang-phli-yai-klang', category: 'temple', amphoe: 'bang_phli', price: 0,
      descriptionTh: 'หรือ "วัดพระนอน" ประดิษฐานพระปางไสยาสน์องค์ใหญ่ที่สุดในประเทศไทย สร้างความประทับใจแต่แรกเห็น',
      descriptionEn: 'Also known as "Sleeping Buddha Temple", housing the largest reclining Buddha in Thailand. Impressive from first sight.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Wat_Bang_Phli_Yai_Nai_01.jpg/1024px-Wat_Bang_Phli_Yai_Nai_01.jpg',
    },
    {
      nameTh: 'สวนศรีนครเขื่อนขันธ์', nameEn: 'Sri Nakhon Khuean Khan Park',
      slug: 'sri-nakhon-khuean-khan-park', category: 'nature', amphoe: 'phra_pradaeng', price: 0,
      descriptionTh: 'สวนสาธารณะขนาดใหญ่ในคุ้งบางกะเจ้า มีเส้นทางเดิน ปั่นจักรยาน และจุดชมนก เหมาะกับครอบครัวและท่องเที่ยวเชิงอนุรักษ์',
      descriptionEn: 'A large public park in Bang Kra Jao with walking trails, cycling paths, and birdwatching spots. Perfect for eco-tourism.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Sri_Nakhon_Khuean_Khan_Park_09.JPG/1024px-Sri_Nakhon_Khuean_Khan_Park_09.JPG',
    },
    {
      nameTh: 'วัดไพชยนต์พลเสพย์ราชวรวิหาร', nameEn: 'Wat Phaichiyon Phonlasep',
      slug: 'wat-phaichiyon-phonlasep', category: 'temple', amphoe: 'phra_pradaeng', price: 0,
      descriptionTh: 'วัดเก่าแก่ในพระประแดง มีโบสถ์และวิหารอันงดงามสะท้อนศิลปะไทยโบราณ สงบร่มรื่นเหมาะแก่การสักการะ',
      descriptionEn: 'An ancient temple in Phra Pradaeng with beautiful chapel and halls reflecting traditional Thai art, serene and peaceful.',
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

  // 5. Seed Demo Reviews
  const bangPu = await prisma.place.findUnique({ where: { slug: 'bang-pu-recreation-center' } });
  const watAsokaram = await prisma.place.findUnique({ where: { slug: 'wat-asokaram' } });

  if (bangPu) {
    await prisma.review.upsert({
      where: { placeId_userId: { placeId: bangPu.id, userId: demoUser.id } },
      update: {},
      create: {
        placeId: bangPu.id,
        userId: demoUser.id,
        rating: 5,
        comment: 'นกเยอะมากกก ข้าวเกรียบอร่อย บรรยากาศดีมากๆ แนะนำให้มาช่วง 5 โมงเย็น',
        status: 'approved',
        reviewedById: admin.id,
        reviewedAt: new Date(),
      },
    });
  }

  if (watAsokaram) {
    await prisma.review.upsert({
      where: { placeId_userId: { placeId: watAsokaram.id, userId: demoUser.id } },
      update: {},
      create: {
        placeId: watAsokaram.id,
        userId: demoUser.id,
        rating: 4,
        comment: 'สงบเงียบ เหมาะแก่การปฏิบัติธรรม สถาปัตยกรรมสีขาวสวยงามมาก',
        status: 'pending',
      },
    });
  }
  console.log('  ✅ Demo reviews seeded');

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
