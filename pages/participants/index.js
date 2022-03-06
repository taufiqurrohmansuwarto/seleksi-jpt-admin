import { useQuery } from "react-query";
import services from "../../services";
import Layout from "../../src/components/Layout";

const Participants = () => {
  const { data } = useQuery(["participants"], () =>
    services.listParticipants()
  );

  return (
    <Layout title="Data Pelamar">
      <div>{JSON.stringify(data)}</div>;
    </Layout>
  );
};

export default Participants;
