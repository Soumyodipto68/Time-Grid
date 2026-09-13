import { NextResponse } from "next/server";
import { auth } from "@/../auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const schedules = await prisma.schedule.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        members: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(schedules);
  } catch (error) {
    console.error("Failed to fetch schedules:", error);

    return NextResponse.json(
      { error: "Failed to fetch schedules" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { name, members } = body;

    if (!name || !Array.isArray(members)) {
      return NextResponse.json(
        {
          error: "name and members are required",
        },
        { status: 400 },
      );
    }

    const schedule = await prisma.schedule.create({
      data: {
        name,

        // IMPORTANT:
        // Never trust userId from the frontend.
        // Get it from the authenticated session.
        userId: session.user.id,

        members: {
          create: members.map((member) => ({
            name: member.name,
            city: member.city,
            country: member.country,
            timezone: member.timezone,
            startHour: member.startHour,
            endHour: member.endHour,
          })),
        },
      },

      include: {
        members: true,
      },
    });

    return NextResponse.json(schedule, { status: 201 });
  } catch (error) {
    console.error("Failed to create schedule:", error);

    return NextResponse.json(
      { error: "Failed to create schedule" },
      { status: 500 },
    );
  }
}
