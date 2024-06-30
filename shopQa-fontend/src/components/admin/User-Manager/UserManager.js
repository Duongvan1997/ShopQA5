import "./UserManager.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Input, Flex } from "antd";

const userData = JSON.parse(localStorage.getItem("user"));

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
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchData = (page = 1, search = "") => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/v1/accounts/getAll`, {
        params: {
          page: page - 1, // API page index starts from 0
          size: 10,
          sort: "id,asc",
          search: search,
        },
        auth: {
          username: userData.username,
          password: userData.password,
        },
      })
      .then((response) => {
        console.log(response.data);
        const { content, totalPages, totalElements } = response.data;
        const accountFormatted = content.map((account) => ({
          id: account.id,
          fullName: account.firstName,
          gender: account.gender,
          email: account.email,
        }));
        setData(accountFormatted);
        setTotalPages(totalPages);
        setTotalElements(totalElements);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(currentPage, searchText); // Fetch data when component mounts or when currentPage or searchText changes
  }, [currentPage, searchText]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
    fetchData(1, searchText);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="UserManager">
      <Input
        placeholder="Search by name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 20, width: 300 }}
        onPressEnter={handleSearch}
      />
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={false} // Disable internal pagination of Table
        loading={loading}
      />
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <Flex >
            <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            Previous
            </button>
            <span style={{ margin: "0 10px" }}>
            {currentPage} of {totalPages}
            </span>
            <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            >
            Next
            </button>
        </Flex >
      </div>
    </div>
  );
};

export default UserManager;
