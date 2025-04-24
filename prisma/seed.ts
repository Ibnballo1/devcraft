import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
  console.log("Seeding in process...");

  //   Create Users..
  const users = await Promise.all(
    Array.from({ length: 3 }).map((_, i) =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          passwordHash: faker.internet.password(),
          role: i === 0 ? "ADMIN" : i === 1 ? "AUTHOR" : "READER",
          bio: faker.person.bio(),
          avatarUrl: faker.image.avatar(),
        },
      })
    )
  );

  // Create post for the AUTHOR.
  const author = users.find((user) => user.role === "AUTHOR");
  if (author) {
    Promise.all(
      Array.from({ length: 5 }).map(() =>
        prisma.post.create({
          data: {
            title: faker.lorem.sentence(),
            slug: faker.lorem.slug(),
            content: faker.lorem.paragraphs(),
            readTime: Math.floor(Math.random() * 10) + 2,
            coverImageUrl: faker.image.urlPicsumPhotos(),
            authorId: author.id,
          },
        })
      )
    );
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
