import dynamic from "next/dynamic";

const ProTable = dynamic(() => import("@ant-design/pro-table"), { ssr: false });

export default ProTable;
