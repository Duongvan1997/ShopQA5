import "./UserManager.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Input } from "antd";

const adminData = JSON.parse(localStorage.getItem("user"));

const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "fullName",
  },
  {
    title: "Gender",
    dataIndex: "gender",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];

const UserManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(""); // Thêm state cho search

  const fetchData = (search = "") => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/v1/accounts/getAll", {
        params: { search }, // Thêm tham số search
        auth: {
          username: adminData.username,
          password: adminData.password,
        },
      })
      .then((response) => {
        console.log(response.data.content);
        const accountFormatted = response.data.content.map((account) => ({
          id: account.id,
          fullName: account.firstName,
          gender: account.gender,
          email: account.email,
        }));
        console.log(response);
        setData(accountFormatted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(); // Gọi API mà không có searchText khi component mount
  }, [adminData.username, adminData.password]);

  const handleSearch = () => {
    fetchData(searchText); // Gọi API với searchText khi thực hiện tìm kiếm
  };

  return (
    <div className="UserManager">
      <Input
        placeholder="Search by name or phone"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 20, width: 300 }}
        onPressEnter={handleSearch} // Tìm kiếm khi nhấn Enter
      />
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
    </div>
  );
};

export default UserManager;
