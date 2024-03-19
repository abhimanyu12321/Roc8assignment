import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { verify_jwt } from "~/helpers/jwt";
import { db } from "~/server/db";

interface userInterestitem {
  id: number;
}

// Returns all interests options
const GET = async (request: NextRequest) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore?.get("token")?.value;

    if (!token) {
      return Response.json({ msg: "No token found" }, { status: 400 });
    }

    const { userId } = verify_jwt(token);
    console.log("asas");

    const allData = await db.interest.findMany();
    const interestData = await db.userInterest.findMany({
      where: { userId: userId },
      select: { id: true },
    });
    const selectedIDs: any = [];
    interestData.forEach((item: userInterestitem | null) => {
      if (item) {
        selectedIDs.push(item.id);
      }
    });

    const page = Number(request.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 6;
    const skip = (page - 1) * limit;

    const paginatedData = allData.slice(skip, skip + limit);

    return Response.json({
      selectedIDs,
      paginatedData,
    });
  } catch (error: any) {
    console.log(error);
    return Response.json({ msg: error.message }, { status: 500 });
  }
};

// select  an options as intersting
const POST = async (request: Request) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore?.get("token")?.value;

    if (!token) {
      return Response.json({ msg: "No token found" }, { status: 400 });
    }

    const { userId } = verify_jwt(token);
    const { interestId } = await request.json();

    const data = await db.userInterest.create({ data: { userId, interestId } });
    return Response.json({ msg: "Added successfully", data });
  } catch (error: any) {
    console.log(error);
    return Response.json({ msg: error.message }, { status: 500 });
  }
};

// remove an option from intersting list
const DELETE = async (request: Request) => {
  try {
    const { id }: { id: number } = await request.json();

    const data = await db.userInterest.delete({
      where: { id },
    });
  } catch (error: any) {
    console.log(error);
    return Response.json({ msg: error.message }, { status: 500 });
  }
};

export { GET, POST, DELETE };
