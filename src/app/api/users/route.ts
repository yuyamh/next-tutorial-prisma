import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  role: z.enum(["USER", "ADMIN"]).optional().default("USER"),
});

const usersSchema = z.array(userSchema);

export async function DELETE() {
  try {
    await prisma.user.deleteMany({});

    return NextResponse.json({ message: "全ユーザーが削除されました" });
  } catch (error) {
    console.error("ユーザー削除エラー:", error);
    return NextResponse.json(
      { error: "全ユーザーの削除に失敗しました" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: "asc",
      },
      select: {
        email: true,
        id: true,
        name: true,
        role: true,
      },
    });

    return NextResponse.json({ users });
  } catch {
    return NextResponse.json(
      { error: "ユーザー一覧の取得に失敗しました" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();

  const result = userSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: result.data,
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "ユーザーの作成に失敗しました" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const body: unknown = await request.json();

  const usersArray = Array.isArray(body) ? body : [body];

  const result = usersSchema.safeParse(usersArray);
  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 });
  }

  try {
    const users = await prisma.user.createMany({
      data: result.data,
      skipDuplicates: true,
    });

    return NextResponse.json({ count: users.count }, { status: 201 });
  } catch (error) {
    console.error("ユーザー作成エラー:", error);
    return NextResponse.json(
      { error: "複数ユーザーの作成に失敗しました" },
      { status: 500 },
    );
  }
}
