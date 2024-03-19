import jwt from "jsonwebtoken";

import { cookies } from "next/headers";

// create jwt and attach it to cookies
const create_jwt = ({ response, data }: { response: any; data: any }) => {
  if (!process.env.JWTSECRET) {
    throw new Error("JWTSECRET environment variable is not defined");
  }

  const token = jwt.sign(data, process.env.JWTSECRET);
  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
  return response;
};

//  Verifing incoming token
const verify_jwt = (token: string) => {
  if (!process.env.JWTSECRET) {
    throw new Error("JWTSECRET environment variable is not defined");
  }
  return jwt.verify(token, process.env.JWTSECRET);
};

export { create_jwt, verify_jwt };
