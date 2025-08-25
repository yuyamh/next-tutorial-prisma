import { type Prisma, Role } from "@prisma/client";
import { prisma } from "@/server/db/prisma";

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  console.log();

  console.log("レコードを1件作成");
  const result1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
      role: Role.ADMIN,
    },
  });
  console.dir(result1, { depth: undefined });
  console.log();

  console.log("生成された型を利用しレコードを1件作成");
  const data2: Prisma.UserCreateInput = {
    email: "bob@example.com",
    name: "Bob",
    role: Role.USER,
  };
  const result2 = await prisma.user.create({ data: data2 });
  console.dir(result2, { depth: undefined });
  console.log();

  console.log("レコードを複数件作成");
  const result3 = await prisma.user.createMany({
    data: [
      {
        email: "charlie@example.com",
        name: "Charlie",
        role: Role.USER,
      },
      {
        email: "dave@example.com",
        name: "Dave",
        role: Role.USER,
      },
    ],
  });
  console.dir(result3, { depth: undefined });
  console.log();

  console.log("生成された型を利用しレコードを複数件作成");
  const data4: Prisma.UserCreateInput[] = [
    {
      email: "eve@example.com",
      name: "Eve",
      role: Role.USER,
    },
    {
      email: "frank@example.com",
      name: "Frank",
      role: Role.USER,
    },
  ];
  const result4 = await prisma.user.createMany({ data: data4 });
  console.dir(result4, { depth: undefined });
  console.log();

  console.log("レコードを返却");
  const result5 = await prisma.user.createManyAndReturn({
    data: [
      {
        email: "andrew@example.com",
        name: "Andrew",
        role: Role.ADMIN,
      },
      {
        email: "jane@example.com",
        name: "Jane",
        role: Role.USER,
      },
    ],
  });
  console.dir(result5, { depth: undefined });
  console.log();

  console.log("関連テーブルへ書き込み");
  const result6 = await prisma.user.create({
    data: {
      email: "will@example.com",
      name: "Will",
      posts: {
        create: [
          {
            title: "Tailwind CSS の基本",
          },
          {
            title: "Prisma の基本",
          },
        ],
      },
      role: Role.USER,
    },
  });
  console.dir(result6, { depth: undefined });
  console.log();
}

try {
  await main();
} catch (error) {
  console.error(error);
  throw error;
}
