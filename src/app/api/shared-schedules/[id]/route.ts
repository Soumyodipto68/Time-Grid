import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const schedule = await prisma.schedule.findUnique({
      where: {
        id,
      },
      include: {
        members: true,
      },
    });

    if (!schedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: schedule.id,
      name: schedule.name,
      members: schedule.members,
      createdAt: schedule.createdAt,
      updatedAt: schedule.updatedAt,
    });
  } catch (error) {
    console.error("Failed to fetch shared schedule:", error);

    return NextResponse.json(
      { error: "Failed to fetch shared schedule" },
      { status: 500 },
    );
  }
}
