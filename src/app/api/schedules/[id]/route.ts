import { NextResponse } from "next/server";
import { auth } from "@/../auth";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const schedule = await prisma.schedule.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        members: true,
      },
    });

    if (!schedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(schedule);
  } catch (error) {
    console.error("Failed to fetch schedule:", error);

    return NextResponse.json(
      { error: "Failed to fetch schedule" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const body = await request.json();

    const { name, members } = body;

    if (!name || !Array.isArray(members)) {
      return NextResponse.json(
        {
          error: "name and members are required",
        },
        { status: 400 }
      );
    }

    // Find the schedule AND verify ownership
    const existingSchedule = await prisma.schedule.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingSchedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }

    const updatedSchedule = await prisma.$transaction(
      async (tx) => {
        await tx.teamMember.deleteMany({
          where: {
            scheduleId: id,
          },
        });

        return tx.schedule.update({
          where: {
            id,
          },
          data: {
            name,

            members: {
              create: members.map(
                (member: {
                  name: string;
                  city: string;
                  country: string;
                  timezone: string;
                  startHour: number;
                  endHour: number;
                }) => ({
                  name: member.name,
                  city: member.city,
                  country: member.country,
                  timezone: member.timezone,
                  startHour: member.startHour,
                  endHour: member.endHour,
                })
              ),
            },
          },

          include: {
            members: true,
          },
        });
      }
    );

    return NextResponse.json(updatedSchedule);
  } catch (error) {
    console.error("Failed to update schedule:", error);

    return NextResponse.json(
      {
        error: "Failed to update schedule",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    // Find schedule AND verify ownership
    const existingSchedule = await prisma.schedule.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingSchedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 }
      );
    }

    await prisma.schedule.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete schedule:", error);

    return NextResponse.json(
      {
        error: "Failed to delete schedule",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}