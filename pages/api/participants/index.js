import nc from "next-connect";
import participantsController from "../../../controller/participants.controller";
const handler = nc();

export default handler.get(participantsController.listParticipants);
