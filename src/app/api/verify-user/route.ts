import { db } from "~/server/db";

interface userData {
  id: number;
  name: string;
  email: string;
  otp: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const POST = async (request: Request) => {
  try {
    const incomingData = await request.json();
    const { email, otp }: { email: string; otp: string } = incomingData;

    if (!email || !otp) {
      return Response.json(
        { msg: "Please provide email and otp" },
        { status: 400 },
      );
    }

    const emailExist = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!emailExist) {
      return Response.json({ msg: "Invalid Credentials" }, { status: 401 });
    }
    if (emailExist) {
      if (emailExist.otp !== otp) {
        return Response.json({ msg: "Invalid Credentials" }, { status: 400 });
      }
    }

    await db.user.update({
      where: {
        id: emailExist.id, // Specify the email field using equals
      },
      data: {
        otp: null,
        isVerified: true,
      },
    });

    return Response.json(
      {
        msg: "User verification successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
};

export { POST };
