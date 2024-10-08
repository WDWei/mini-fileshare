import { Prisma, PrismaClient } from "@prisma/client";
import { title } from "process";
const prisma = new PrismaClient();

const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: "Post 1",
    slug: "Post-1",
    content: "Content of post 1",
    author: {
      connectOrCreate: {
        where: {
          userName: "john@gmail.com",
        },
        create: {
          userName: "john@gmail.com",
          hashedPassword: "asdasasdasd",
        },
      },
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const post of initialPosts) {
    const newPost = await prisma.post.create({
      data: post,
    });
    console.log(`Created post with id: ${newPost.id}`);
  }

  console.log(`Seeding finished.`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
