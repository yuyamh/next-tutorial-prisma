import { Role } from "@prisma/client";
import { prisma } from ".";

export async function seeding(): Promise<
  | {
      data: { countPosts: number; countUsers: number };
      status: "success";
    }
  | {
      error: Error;
      status: "error";
    }
> {
  try {
    const deletePost = prisma.post.deleteMany();
    const deleteUser = prisma.user.deleteMany();
    const createUserAlice = prisma.user.create({
      data: {
        email: "alice@example.com",
        name: "Alice",
        posts: {
          create: [
            {
              likes: 10,
              title: "Tailwind CSS の基本",
            },
            {
              likes: 20,
              title: "Prisma の基本",
            },
          ],
        },
        role: Role.ADMIN,
      },
    });
    const createUserBob = prisma.user.create({
      data: {
        email: "bob@example.com",
        name: "Bob",
        posts: {
          create: [
            {
              likes: 10,
              title: "Next.js の基本",
            },
            {
              likes: 20,
              title: "React の基本",
            },
            {
              likes: 30,
              title: "TypeScript の基本",
            },
          ],
        },
        role: Role.USER,
      },
    });
    const createUserCharlie = prisma.user.create({
      data: {
        email: "charlie@example.com",
        name: "Charlie",
        posts: {
          create: [
            {
              likes: 5,
              title: "Python の基本",
            },
          ],
        },
        role: Role.USER,
      },
    });
    const createUserEve = prisma.user.create({
      data: {
        email: "eve@example.com",
        name: "Eve",
        role: Role.USER,
      },
    });
    const createUserDave = prisma.user.create({
      data: {
        email: "dave@example.com",
        role: Role.USER,
      },
    });
    await prisma.$transaction([
      deletePost,
      deleteUser,
      createUserAlice,
      createUserBob,
      createUserCharlie,
      createUserEve,
      createUserDave,
    ]);

    const countUsers = await prisma.user.count();
    const countPosts = await prisma.post.count();

    return { data: { countPosts, countUsers }, status: "success" };
  } catch (error) {
    return { error: error as Error, status: "error" };
  }
}

async function main() {
  const result = await seeding();
  if (result.status === "success") {
    console.log(
      `Seeding is successfullly completed. All records in the User table and Post table are deleted, and ${result.data.countUsers} users and ${result.data.countPosts} posts are created.`,
    );
  } else {
    console.error("Seeding database is failed.", result.error);
  }
}

try {
  await main();
} catch (error) {
  console.error(error);
  throw error;
}
