import nc from "next-connect";
import participantsController from "../../../../controller/participants.controller";

const handler = nc();

// patch diterima, delete dieliminasi
export default handler.get(participantsController.getParticipant);
//   .patch()
//   .delete();
