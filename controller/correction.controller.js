import prisma from "../lib/prisma";
import properties from "../utils/properties";

const updateVerified = async (req, res) => {
  try {
    const { query } = req;
    const { body } = req;
    const { participantId } = query;

    const { property, value } = body;

    if (property !== "keterangan") {
      await prisma.documents.update({
        data: {
          [property]: value,
        },
        where: {
          user_id: participantId,
        },
      });
    } else {
      await prisma.profiles.update({
        data: {
          keterangan: value,
        },
        where: {
          user_id: participantId,
        },
      });
    }

    const documents = await prisma.documents.findUnique({
      where: {
        user_id: participantId,
      },
    });

    const documentPropertyQualified = properties.documentProperties?.map(
      (d) => ({ value: documents[`${d}_is_verified`] })
    );

    const isQualified = documentPropertyQualified?.every((d) => !!d?.value);

    if (isQualified) {
      await prisma.profiles.update({
        data: {
          is_qualified: true,
          keterangan: null,
        },
        where: {
          user_id: participantId,
        },
      });
    } else {
      await prisma.profiles.update({
        data: {
          is_qualified: false,
        },
        where: {
          user_id: participantId,
        },
      });
    }

    res.status(200).json({ code: 200, message: "sukse" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "internal server error", error: error });
  }
};

export default {
  updateVerified,
};
