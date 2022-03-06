const Minio = require("minio");

const minioClient = new Minio.Client({
  port: parseInt(process.env.MINIO_PORT),
  endPoint: process.env.MINIO_ENDPOINT,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESSKEY,
  secretKey: process.env.MINIO_SECRETKEY,
});

export default async (req, res, next) => {
  req.minio = minioClient;
  next();
};
