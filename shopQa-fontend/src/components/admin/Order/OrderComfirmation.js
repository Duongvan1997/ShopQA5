import { useState, useEffect } from "react";
import { Table, message, Modal, Breadcrumb } from "antd";
import axios from "axios";
import "./OrderComfirmation.css";
import moment from "moment";

const ITEMS_PER_PAGE = 4;

const OrderComfirmation = () => {
  const { confirm } = Modal;
  const [messageApi, contextHolder] = message.useMessage();
  const [itemsData, setItemsData] = useState([]);
  const adminData = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/v1/orders/getAll", {
        auth: {
          username: adminData.username,
          password: adminData.password,
        },
      })
      .then((response) => {
        const ordersFormatted = response.data.map((order) => ({
          order_id: order.id,
          employee_id: adminData.id,
          customer_name: order.customer_name,
          phone: order.phone,
          status: order.oderStatus,
          order_date: moment(order.order_date).format("YYYY-MM-DD"),
        }));
        setItemsData(ordersFormatted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [adminData.username, adminData.password]);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/orders/delete/${orderId}`,
        {
          auth: {
            username: adminData.username,
            password: adminData.password,
          },
        }
      );
      setItemsData(itemsData.filter((order) => order.order_id !== orderId));
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/orders/changeStatus/${orderId}`,
        { status: newStatus },
        {
          auth: {
            username: adminData.username,
            password: adminData.password,
          },
        }
      );

      const updatedOrder = response.data;
      setItemsData(
        itemsData.map((order) =>
          order.order_id === orderId
            ? { ...order, status: updatedOrder.oderStatus }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="actions">
          <button
            className="button1"
            onClick={() => handleUpdateStatus(record.order_id, "TO_RECEIVE")}
          >
            Đã giao
          </button>
          <button
            className="button2"
            onClick={() =>
              handleUpdateStatus(record.order_id, "ARE TO_RECEIVE")
            }
          >
            Giao hàng
          </button>
          <button
            className="button3"
            onClick={() => handleDelete(record.order_id)}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="order-comfirmation-container">
      {contextHolder}
      <Breadcrumb
        items={[
          {
            title: "Management",
          },
          {
            title: "Order Confirmation",
          },
        ]}
      />
      <Table
        columns={columns}
        dataSource={itemsData}
        loading={loading}
        rowKey="order_id"
        size="large"
      />
    </div>
  );
};

export default OrderComfirmation;
