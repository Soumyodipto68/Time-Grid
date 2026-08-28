import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: "demo@timezone.local",
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Demo user not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to fetch demo user:", error);

    return NextResponse.json(
      { error: "Failed to fetch demo user" },
      { status: 500 }
    );
  }
}