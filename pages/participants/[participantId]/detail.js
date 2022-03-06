import { useRouter } from "next/router";
import { useQuery } from "react-query";
import services from "../../../services";

const Documents = ({ documents }) => {
  return <div>{JSON.stringify(documents)}</div>;
};

const Profile = ({ data }) => {
  const { documents, ...profile } = data;
  return <div>{JSON.stringify(profile)}</div>;
};

const ParticipantDetail = () => {
  const router = useRouter();
  const {
    query: { participantId },
  } = router;

  const { data } = useQuery(["participant", participantId], () =>
    services.getParticipant(participantId)
  );

  return (
    <div>
      <Profile data={data} />
    </div>
  );
};

export default ParticipantDetail;
