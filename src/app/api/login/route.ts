import { db } from "~/server/db";
import { comparePassword } from "~/helpers/hash";
import { create_jwt } from "~/helpers/jwt";

const POST = async (request: Request) => {
  try {
    const incomingData = await request.json();
    const { email, password } = incomingData;

    if (!email || !password) {
      return Response.json(
        { msg: "Please provide email and password" },
        { status: 400 },
      );
    }

    // check if user exists
    const existingUser = await db.user.findFirst({
      where: {
        email: email, // Specify the email field using equals
      },
    });

    if (!existingUser) {
      return Response.json({ msg: "Invalid Credentials" }, { status: 403 });
    }

    // user Exists but not verified
    if (existingUser && !existingUser.isVerified) {
      return Response.json(
        { msg: "Please verify your email first." },
        { status: 400 },
      );
    }

    const isPasswordCorrect = await comparePassword(
      existingUser.password,
      password,
    );

    // Incorrect password entered
    if (!isPasswordCorrect) {
      return Response.json({ msg: "Invalid Credentials" }, { status: 403 });
    }

    // Create jwt token and attach it to cookie
    const jwt_data = {
      userId: existingUser.id,
      email: email,
      name: existingUser.name,
    };
    const response = create_jwt({ data: jwt_data, response: Response });

    return response.json(
      {
        msg: "login successfull",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error.message);
  }
};

export { POST };
