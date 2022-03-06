import { getSession } from "next-auth/react";
const Minio = require("minio");

const minioClient = new Minio.Client({
  port: parseInt(process.env.MINIO_PORT),
  endPoint: process.env.MINIO_ENDPOINT,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESSKEY,
  secretKey: process.env.MINIO_SECRETKEY,
});

export default async (req, res, next) => {
  const data = await getSession({ req });
  if (data) {
    req.currentUser = data;
    req.minio = minioClient;
    next();
  } else {
    res.status(401).json({ code: 401, message: "not authorized" });
  }
};
