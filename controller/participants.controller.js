import prisma from "../lib/prisma";

const dashboard = async (req, res) => {
  try {
    const totalParticipantsSubmit = await prisma.profiles.count({
      where: { is_submit: false },
    });

    const totalParticipants = await prisma.profiles.count();

    const totalParticipantsNotSubmit = await prisma.profiles.count({
      where: {
        is_submit: true,
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
export default {
  dashboard,
  listParticipants,
};
