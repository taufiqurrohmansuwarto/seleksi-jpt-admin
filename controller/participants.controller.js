import prisma from "../lib/prisma";
import properties from "../utils/properties";
const exceljs = require("exceljs");

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const dashboard = async (req, res) => {
  try {
    const totalParticipantsSubmit = await prisma.profiles.count({
      where: { is_submit: true },
    });

    const totalParticipants = await prisma.profiles.count();

    const totalParticipantsNotSubmit = await prisma.profiles.count({
      where: {
        is_submit: false,
      },
    });

    const totalNotQualified = await prisma.profiles.count({
      where: {
        is_qualified: false,
      },
    });

    const totalQualified = await prisma.profiles.count({
      where: {
        is_qualified: true,
      },
    });

    const data = {
      totalParticipantsSubmit,
      totalParticipantsNotSubmit,
      totalParticipants,
      totalNotQualified,
      totalQualified,
    };

    res.json(data);
  } catch (error) {
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

const listParticipants = async (req, res) => {
  try {
    const { query } = req;
    const limit = parseInt(query?.limit) || 10;
    const offset = parseInt(query?.offset) || 0;

    let currentQuery = {};

    currentQuery = {
      skip: offset,
      take: limit,
      where: {},
      select: {
        nama_gelar: true,
        user_id: true,
        is_correction: true,
        is_qualified: true,
        korektor: true,
        documents: {
          select: {
            drh: true,
          },
        },
        admin: {
          select: {
            username: true,
          },
        },
      },
    };

    if (query?.nama) {
      currentQuery = {
        ...currentQuery,
        where: {
          ...currentQuery?.where,
          nama_gelar: {
            contains: query?.nama,
            mode: "insensitive",
          },
        },
      };
    }

    if (query?.is_qualified) {
      currentQuery = {
        ...currentQuery,
        where: {
          ...currentQuery?.where,
          is_qualified: !!query?.is_qualified,
        },
      };
    }

    if (query?.is_correction) {
      currentQuery = {
        ...currentQuery,
        where: {
          ...currentQuery?.where,
          is_correction: !!query?.is_correction,
        },
      };
    }

    const [total, data] = await prisma.$transaction([
      prisma.profiles.count(currentQuery?.where),
      prisma.profiles.findMany(currentQuery),
    ]);

    res.json({ meta: { limit, offset, total }, data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

// untuk kebutuhan report dengan menggunakan excel
const report = async (req, res) => {
  try {
    // kebutuhan excel
    let workbook = new exceljs.Workbook();
    let worksheet = workbook.addWorksheet("data");

    const data = await prisma.profiles.findMany({});

    // kemudian loop sesuai dengan dokumenmu

    //     dan data harus disesuaikan dengan key yang ada di worksheet columns

    worksheet.columns = [{ header: "", key: "" }];

    //     ada data
    worksheet.addRows();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "result.xlsx"
    );

    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

const getParticipant = async (req, res) => {
  try {
    const result = await prisma.profiles.findMany({
      where: {
        user_id: req.query?.participantId,
        AND: {
          is_submit: true,
        },
      },
      include: {
        admin: true,
        documents: true,
      },
    });

    if (!result?.length) {
      res.json(null);
    } else {
      const hasil = properties.documentPropertiesWithLabel?.map((d) => ({
        key: d?.key,
        description: d?.description,
        value: `${process.env.FILE_URL}/${result[0]?.documents?.[d?.key]}`,
        is_verified: result[0]?.documents?.[`${d?.key}_is_verified`],
      }));

      const data = { ...result[0], columns: hasil };
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Intenal Server Error" });
  }
};

export default {
  dashboard,
  listParticipants,
  getParticipant,
  report,
};
