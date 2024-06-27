import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert initial data into the database
  const page1 = await prisma.page.create({
    data: {
      title: 'Page 1',
      content: '<div><h1>Page 1 Content</h1><p>This is the content of Page 1.</p></div>',
    },
  });

  const page2 = await prisma.page.create({
    data: {
      title: 'Page 2',
      content: '<div><h1>Page 2 Content</h1><p>This is the content of Page 2.</p></div>',
    },
  });

  console.log({ page1, page2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
