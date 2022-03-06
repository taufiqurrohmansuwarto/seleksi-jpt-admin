import nc from "next-connect";
import correctionController from "../../../../controller/correction.controller";

const handler = nc();

// dibuat koreksi
export default handler.post(correctionController.updateVerified);
