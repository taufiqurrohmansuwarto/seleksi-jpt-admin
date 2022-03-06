import nc from "next-connect";

const handler = nc();

// patch diterima, delete dieliminasi
export default handler.get().patch().delete();
