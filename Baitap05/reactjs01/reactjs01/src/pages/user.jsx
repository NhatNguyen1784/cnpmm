import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../util/api";

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserApi();
      if (!res.message) {
        setDataSource(res);
      } else {
        notification.error({
          message: "Unauthorized",
          description: res.message,
        });
      }
    };
    fetchUser();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  return (
    <div className="py-8 px-2 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
        Danh sách người dùng
      </h2>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey="_id"
        className="bg-white rounded-xl shadow"
      />
    </div>
  );
};

export default UserPage;
