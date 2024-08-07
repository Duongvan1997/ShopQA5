import React, { useEffect, useState } from "react";
import "./SalesManager.css";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Flex, Modal, Table, message } from "antd";
import axios from "axios";
import moment from "moment";

const SalesManager = () => {
  const { confirm } = Modal;
  const [messageApi, contextHolder] = message.useMessage();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optionVisible, setOptionVisible] = useState(false);
  const [salesSelected, setSalesSelected] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const fetchData = () => {

    setLoading(true);

    axios
      .get("http://localhost:8080/api/v1/sales?page=0&size=99&sort=id,asc&search=", {
        auth: {
          username: currentUser.username,
          password: currentUser.password,
        },
      })
      .then((response) => {
        const data = response.data.content.map((sl, index) => {
          return {
            key: sl.id,
            id: sl.id,
            sale_info: sl.sale_info,
            percent_sale: sl.percent_sale,
            start_date: moment(sl.start_date).format('YYYY-MM-DD'), 
            end_date: moment(sl.end_date).format('YYYY-MM-DD'),
          };
        });
        setSales(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }

  useEffect(() => {

    window.scrollTo(0, 0);
    fetchData();

}, [])

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: "Xoá khuyến mãi thành công",
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Xoá khuyến mãi thất bại",
    });
  };

  const showDeleteConfirm = () => {
    confirm({
      title: `${salesSelected?.length} khuyến mãi sẽ bị xoá vĩnh viễn`,
      content: "Tiếp tục?",
      okText: "Xoá khuyến mãi",
      okType: "danger",
      cancelText: "Huỷ",
      maskClosable: true,
      onOk() {
        handleDeleteSales();
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: "Tên khuyến mãi",
      dataIndex: "sale_info",
      render: (text, record) => (
        <Link to={`/admin/sales/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Phần trăm khuyến mãi",
      dataIndex: "percent_sale",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
    },
    {
      title: "Sửa",
      dataIndex: "update_sales",
      render: (_, record) => (
        <Link to={`/admin/sales/${record.id}`}><i class="fa-solid fa-pen-to-square" style={{fontSize: "18px"}}></i></Link>
      ),
    },
  ];

  const rowSelection = {
    salesSelected,
    onChange: (selectedRowKeys) => {
      !selectedRowKeys.length ? setOptionVisible(false) : setOptionVisible(true);
      setSalesSelected(selectedRowKeys);
      console.log(selectedRowKeys.join(","));
    },
  };

  const handleDeleteSales = () => {
    setLoading(true);


    axios
      .delete(
        `http://localhost:8080/api/v1/sales?ids=${salesSelected.join(",")}`,
        {
          auth: {
            username: currentUser.username,
            password: currentUser.password,
          },
        }
      )
      .then((response) => {
        console.log("Delete product successfully");
        successMessage();
        fetchData();
        setSalesSelected([]);
        setOptionVisible(false);
        setLoading(false);
        // Refresh sales data
        // return axios.get("http://localhost:8080/api/v1/sales?page=0&size=99&sort=id,asc&search=", {
        //   auth: {
        //     username: currentUser.username,
        //     password: currentUser.password,
        //   },
        // });
      })
      // .then((response) => {
      //   const data = response.data.content.map((sl, index) => {
      //     return {
      //       key: index,
      //       id: sl.id,
      //       sale_info: sl.sale_info,
      //       percent_sale: sl.percent_sale,
      //       start_date: sl.start_date,
      //       end_date: sl.end_date,
      //     };
      //   });
      //   setSales(data);
      // })
      .catch((error) => {
        console.error("Error fetching data:", error);
        errorMessage();
        //setLoading(false);
      });
  };

  const handleDeselectAll = () => {
    // setSalesSelected([]);
    // setOptionVisible(false);
  };

  return (
    <Flex
      className="SalesManager"
      vertical="true"
      gap={20}
      style={{ position: "relative" }}
    >
      {contextHolder}
      <Breadcrumb
        items={[
          {
            title: "Quản lý",
          },
          {
            title: "Quản lý khuyến mãi",
          },
        ]}
      />

      {optionVisible && (
        <Flex className="option-sticky" justify="space-between" align="center">
          <span>{`Đã chọn ${salesSelected?.length} sản phẩm`}</span>
          <Flex gap={10} justify="flex-end">
            <Button
              type="primary"
              style={{ width: "fit-content" }}
              onClick={handleDeselectAll}
            >
              Bỏ chọn
            </Button>
            <Button
              type="primary"
              danger
              style={{ width: "fit-content" }}
              onClick={showDeleteConfirm}
            >
              Xoá
            </Button>
          </Flex>
        </Flex>
      )}

      <Table
        rowSelection={rowSelection }
        columns={columns}
        dataSource={sales}
        loading={loading}
        pagination={true}
        onRow={(record, rowIndex) => {
          return {
              onClick: (event) => { }
          };
      }}
        size="large"
      />
    </Flex>
  );
};

export default SalesManager;
