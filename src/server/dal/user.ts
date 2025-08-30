import "server-only";

import { prisma } from "@/server/db/prisma";
import type { User } from "@prisma/client";
import { type Role } from "@prisma/client";
import UserSchema from "@/schemas/user.schema";

export async function createUser(data: {
  email: string;
  name?: string | undefined;
  role?: Role;
}) {
  const parseResult = UserSchema.omit({ id: true }).safeParse(data);
  if (!parseResult.success) {
    throw new Error(
      `User validation error: ${JSON.stringify(parseResult.error.flatten())}`,
    );
  }

  const user = await prisma.user.create({
    data,
  });

  return createUserDTO(user);
}

export async function createUsers(
  dataArray: Array<{
    email: string;
    name?: string | undefined;
    role?: Role;
  }>,
) {
  for (const data of dataArray) {
    const parseResult = UserSchema.omit({ id: true }).safeParse(data);
    if (!parseResult.success) {
      throw new Error(
        `User validation error: ${JSON.stringify(parseResult.error.flatten())}`,
      );
    }
  }

  const result = await prisma.user.createMany({
    data: dataArray,
  });

  return {
    count: result.count,
  };
}

export async function deleteAllUsers() {
  const result = await prisma.user.deleteMany();
  return {
    count: result.count,
  };
}

export async function deleteManyUsers(where: { email?: string; role?: Role }) {
  const result = await prisma.user.deleteMany({
    where,
  });

  return {
    count: result.count,
  };
}

export async function deleteUser(id: number) {
  const user = await prisma.user.delete({
    where: { id },
  });
  return createUserDTO(user);
}

export async function getUsers(orderBy: { id?: "asc" | "desc" }) {
  const users = await prisma.user.findMany({
    orderBy,
  });
  return users.map((user) => createUserDTO(user));
}

function createUserDTO(userData: User) {
  return {
    email: userData.email,
    id: userData.id,
    name: userData.name,
    role: userData.role,
  };
}
