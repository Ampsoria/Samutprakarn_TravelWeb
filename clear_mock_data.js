const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing mock data...');
  await prisma.review.deleteMany({});
  await prisma.bookmark.deleteMany({});
  await prisma.checkIn.deleteMany({});
  await prisma.pageView.deleteMany({});
  await prisma.placeImage.deleteMany({});
  await prisma.place.deleteMany({});
  
  // Delete all users except admin
  await prisma.user.deleteMany({
    where: {
      role: {
        not: 'admin'
      }
    }
  });

  console.log('Mock data cleared. System is ready for real use.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
