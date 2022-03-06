import { useQuery } from "react-query";
import services from "../../services";

const Participants = () => {
  const { data } = useQuery(["participants"], () =>
    services.listParticipants()
  );

  return <div>{JSON.stringify(data)}</div>;
};

export default Participants;
