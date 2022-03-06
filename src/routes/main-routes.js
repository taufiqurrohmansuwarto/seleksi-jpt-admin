import { DashboardOutlined, SnippetsOutlined } from "@ant-design/icons";

export default {
  routes: [
    {
      path: "/dashboard",
      name: " Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      path: "/resume",
      name: " Resume",
      icon: <SnippetsOutlined />,
    },
  ],
};
