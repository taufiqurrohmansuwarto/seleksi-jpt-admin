import nc from "next-connect";
import correctionController from "../../../../controller/correction.controller";
import auth from "../../../../middleware/auth";

const handler = nc();

// dibuat koreksi
export default handler.use(auth).post(correctionController.updateVerified);
