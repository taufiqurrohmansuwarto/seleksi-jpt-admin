import { getSession } from "next-auth/react";

export default async (req, res, next) => {
  const data = await getSession({ req });
  if (data) {
    req.currentUser = data;
    next();
  } else {
    res.status(401).json({ code: 401, message: "not authorized" });
  }
};
