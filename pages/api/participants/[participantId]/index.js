import nc from "next-connect";
import participantsController from "../../../../controller/participants.controller";
import auth from "../../../../middleware/auth";

const handler = nc();

// patch diterima, delete dieliminasi
export default handler.use(auth).get(participantsController.getParticipant);
//   .patch()
//   .delete();
