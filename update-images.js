const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

const images = {
  'bang-pu-recreation-center': 'Samutprakarn_Bangpu_Recreation_Centre_2.jpg',
  'wat-asokaram': 'PhotobyTawat29102017-7-1.jpg',
  'ancient-city': 'Ancient-City-1.jpg',
  'erawan-museum': 'Erawan_museum-001.jpg',
  'bang-nam-phueng-market': 'Phra_Pradaeng_District,_Samut_Prakan,_Thailand_-_panoramio_(1).jpg',
  'bang-kra-jao': 'Bangkok’s_green_lung_(40468870113)_(cropped).jpg',
  'crocodile-farm': 'Samutprakarn_CrocodileFarm2.jpg',
  'wat-phra-samut-chedi': '%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%97%E0%B8%A3%E0%B9%80%E0%B8%88%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B9%8C.jpg',
  'phra-chulachomklao-fort': '5_A_%E0%B8%9B%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B8%E0%B8%A5%E0%B8%88%E0%B8%AD%E0%B8%A1%E0%B9%80%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%B2-1.jpg',
  'wat-bang-phli-yai-nai': 'Wat_Bang_Phli_Yai_Nai-1.jpg',
  'observation-tower': 'Pak_Nam_BTS_station,_August_2023.jpg',
  'khlong-suan-market': 'Klongsuan1.jpg',
  'wat-protket-chettharam': 'Wat_Prodket.jpg',
  'lat-pho-park': 'Bhumibol_Bridge_on_Rama_3_sight_(10440744735).jpg',
  'wat-klang-worawihan': '%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3_%E0%B8%AD.%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87_%E0%B8%88.%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%97%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3_(15).jpg',
  'navy-museum': 'Royal_barge_procession_model,_Naval_Museum,_Samut_Prakan_(1).jpg',
  'phi-suea-samut-fort': 'Phi_Suea_Samut_Fort.jpg',
  'wat-bang-phli-yai-klang': 'Wat_Bang_Phli_Yai_Nai-1.jpg',
  'sri-nakhon-khuean-khan-park': 'Sri_Nakhon_Khuean_Khan_Park_01.JPG',
  'wat-phaichiyon-phonlasep': '%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AD%E0%B8%B8%E0%B9%82%E0%B8%9A%E0%B8%AA%E0%B8%96%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B9%84%E0%B8%9E%E0%B8%8A%E0%B8%A2%E0%B8%99%E0%B8%95%E0%B9%8C%E0%B8%9E%E0%B8%A5%E0%B9%80%E0%B8%AA%E0%B8%9E%E0%B8%A2%E0%B9%8C%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%A7%E0%B8%A3%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg'
};

async function run() {
  for (const [slug, filename] of Object.entries(images)) {
    const finalUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=800`;
    
    // Update DB
    const place = await prisma.place.findUnique({ where: { slug } });
    if (place) {
      await prisma.placeImage.updateMany({
        where: { placeId: place.id, isCover: true },
        data: { imageUrl: finalUrl }
      });
      console.log(`Updated DB for ${slug}`);
    }

    // Update seed.js
    let seedContent = fs.readFileSync('./prisma/seed.js', 'utf-8');
    const slugRegex = new RegExp(`slug:\\s*'${slug}'[\\s\\S]*?imageUrl:\\s*'[^']+'`);
    const match = seedContent.match(slugRegex);
    if (match) {
        const replacement = match[0].replace(/imageUrl:\s*'[^']+'/, `imageUrl: '${finalUrl}'`);
        seedContent = seedContent.replace(match[0], replacement);
        fs.writeFileSync('./prisma/seed.js', seedContent);
    }
  }
}

run().catch(console.error).finally(() => prisma.$disconnect());
