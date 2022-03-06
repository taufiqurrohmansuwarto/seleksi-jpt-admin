import { useQuery } from "react-query";
import services from "../services";
const Dashboard = () => {
  const { data } = useQuery(["dashboard"], () => services.getDashboard());
  return <div>{JSON.stringify(data)}</div>;
};

// Dashboard.auth = true;

export default Dashboard;
