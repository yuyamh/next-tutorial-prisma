import { prisma } from "@/server/db/prisma";

async function main() {
  const updatePosts = prisma.post.updateMany({
    data: {
      likes: {
        increment: 1,
      },
    },
  });
  const updateUsers = prisma.user.updateMany({
    data: {
      name: "Dave Updated",
    },
    where: {
      email: "alice@example.com",
    },
  });

  const transaction = await prisma.$transaction([updatePosts, updateUsers]);
  console.dir(transaction, { depth: undefined });
  console.log();
}
try {
  await main();
} catch (error) {
  console.error(error);
  throw error;
}
