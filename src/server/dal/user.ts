import "server-only";

import { prisma } from "@/server/db/prisma";
import type { User } from "@prisma/client";
import { type Role } from "@prisma/client";

export async function createUser(data: {
  email: string;
  name?: string | undefined;
  role?: Role;
}) {
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
