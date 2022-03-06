const uploadFileMinio = (mc, fileBuffer, filename, size, mimetype) => {
  return new Promise((resolve, reject) => {
    mc.putObject(
      "document-seleksi-jpt",
      `files/${filename}`,
      fileBuffer,
      size,
      { "Content-Type": mimetype },
      function (err, info) {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });
};

module.exports = {
  uploadFileMinio,
};
