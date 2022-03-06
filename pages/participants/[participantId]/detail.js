import { useRouter } from "next/router";

const ParticipantDetail = () => {
  const router = useRouter();
  const {
    query: { participantId },
  } = router;

  return <div>{JSON.stringify(participantId)}</div>;
};

export default ParticipantDetail;
