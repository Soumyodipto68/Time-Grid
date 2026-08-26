import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const user = await prisma.user.upsert({
      where: {
        email: "demo@timezone.local",
      },

      update: {},

      create: {
        name: "Demo User",
        email: "demo@timezone.local",
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to create test user:", error);

    return NextResponse.json(
      { error: "Failed to create test user" },
      { status: 500 }
    );
  }
}