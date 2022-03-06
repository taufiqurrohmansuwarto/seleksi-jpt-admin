import { DashboardOutlined, TeamOutlined } from "@ant-design/icons";

export default {
  routes: [
    {
      path: "/dashboard",
      name: " Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      path: "/participants",
      name: " Data Pelamar",
      icon: <TeamOutlined />,
    },
  ],
};
