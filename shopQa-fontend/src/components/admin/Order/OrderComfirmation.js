import { useState, useEffect } from "react";
import { Table, message, Modal, Breadcrumb } from "antd";
import axios from "axios";
import "./OrderComfirmation.css";
import moment from "moment";

const OrderComfirmation = () => {
  const { confirm } = Modal;
  const [messageApi, contextHolder] = message.useMessage();
  const [itemsData, setItemsData] = useState([]);
  const adminData = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(
        "http://localhost:8080/api/v1/orders/getOrderToPayAndToReceiveAndCompleted",
        {
          auth: {
            username: adminData.username,
            password: adminData.password,
          },
        }
      )
      .then((response) => {
        const ordersFormatted = response.data.map((order) => ({
          order_id: order.id,
          employee_id: adminData.id,
          customer_name: order.customer_name,
          phone: order.phone,
          status: order.oderStatus,
          order_date: moment(order.order_date).format("YYYY-MM-DD"),
        }));
        console.log(response.data);
        setItemsData(ordersFormatted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
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
      message.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order: ", error);
      message.error("Error deleting order");
    }
  };

  const showDeleteConfirm = (orderId) => {
    confirm({
      title: "Xác nhận xóa?",
      // content: "This action cannot be undone.",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        handleDelete(orderId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    console.log(adminData);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/orders/changeStatus/${orderId}`,
        { employee_id: adminData.id, oderStatus: newStatus },
        {
          auth: {
            username: adminData.username,
            password: adminData.password,
          },
        }
      );
      fetchData();

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
          
          {record.status !== "TO_PAY" && record.status !== 'COMPLETED' && (
            <button
              className="button1"
              onClick={() => handleUpdateStatus(record.order_id, "COMPLETED")}
            >
              Đã giao
          </button>
          )}
          {/* <button
            className="button2"
            onClick={() => handleUpdateStatus(record.order_id, "TO_RECEIVE")}
          >
            Giao hàng
          </button> */}
          {record.status !== "COMPLETED" && record.status !== 'TO_RECEIVE' && (
            <button
              className="button2"
              onClick={() => handleUpdateStatus(record.order_id, "TO_RECEIVE")}
            >
              Giao hàng
            </button>
          )}
          {record.status !== 'COMPLETED' && record.status !== 'TO_RECEIVE' && (
            <button
              className="button3"
              onClick={() => showDeleteConfirm(record.order_id)}
            >
              Xóa
            </button>
          )}
          {/* <button
            className="button3"
            onClick={() => showDeleteConfirm(record.order_id)}
          >
            Xóa
          </button> */}
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
