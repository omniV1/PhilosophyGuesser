import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.guess.deleteMany();
  await prisma.gameSession.deleteMany();
  await prisma.locationSetMapping.deleteMany();
  await prisma.locationSet.deleteMany();
  await prisma.locationImage.deleteMany();
  await prisma.location.deleteMany();

  // Add philosopher locations
  const locations = [
    {
      name: 'Plato\'s Academy',
      latitude: 37.9908,
      longitude: 23.7033,
      description: 'The location of Plato\'s Academy in Athens, Greece, founded around 387 BC.',
    },
    {
      name: 'Aristotle\'s Lyceum',
      latitude: 37.9733,
      longitude: 23.7500,
      description: 'The ancient school founded by Aristotle in 335 BC in Athens, Greece.',
    },
    {
      name: 'Königsberg (Immanuel Kant)',
      latitude: 54.7065,
      longitude: 20.5109,
      description: 'The city where Immanuel Kant lived and worked, now Kaliningrad, Russia.',
    },
    {
      name: 'Sils Maria (Nietzsche)',
      latitude: 46.4333,
      longitude: 9.7667,
      description: 'The Swiss village where Friedrich Nietzsche spent his summers and wrote several of his works.',
    },
    {
      name: 'Confucius Temple',
      latitude: 35.5947,
      longitude: 116.9811,
      description: 'The temple complex in Qufu, China, built to commemorate Confucius.',
    },
  ];

  // Create locations
  const createdLocations = await Promise.all(
    locations.map(location => 
      prisma.location.create({
        data: location,
      })
    )
  );

  // Create a location set
  const locationSet = await prisma.locationSet.create({
    data: {
      name: 'Classical Philosophy Tour',
      description: 'A journey through the most significant locations in classical philosophy.',
      difficulty: 1,
    },
  });

  // Map locations to the set
  await Promise.all(
    createdLocations.map((location, index) =>
      prisma.locationSetMapping.create({
        data: {
          locationId: location.id,
          setId: locationSet.id,
          position: index + 1,
        },
      })
    )
  );

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 