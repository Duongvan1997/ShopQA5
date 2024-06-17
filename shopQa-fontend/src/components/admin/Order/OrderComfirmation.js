import { useState, useEffect } from "react";
import "./OrderComfirmation.css";
import Pagination from "../../Paginate/Pagination";
import axios from "axios";

const ITEMS_PER_PAGE = 5; // Định nghĩa số mục trên mỗi trang

const OrderComfirmation = () => {
  const [itemsData, setItemsData] = useState([]);
  const adminData = JSON.parse(localStorage.getItem("user"));
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    if (
      newPage > 0 &&
      newPage <= Math.ceil(itemsData.length / ITEMS_PER_PAGE)
    ) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/orders/getAll",
          {
            auth: {
              username: adminData.username,
              password: adminData.password,
            },
          }
        );

        const data = response.data;
        console.log("API response data:", data); // Log phản hồi từ API

        // Kiểm tra và chuyển đổi dữ liệu thành mảng nếu cần thiết
        const dataArray = Array.isArray(data) ? data : Object.values(data);
        console.log("Data array:", dataArray); // Log data array

        const modifiedData = dataArray.map((order) => {
          console.log("Order item:", order); // Log từng mục đơn hàng
          return {
            order_id: order.id,
            customer_name: order.customer_name,
            phone: order.phone,
          };
        });
        console.log("Modified data:", modifiedData); // Log dữ liệu đã chỉnh sửa
        setItemsData(modifiedData); // Sử dụng setter của state
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []); // Chỉ chạy một lần khi component được mount

  // Tính toán các mục sẽ hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = itemsData.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang
  const totalPages = Math.ceil(itemsData.length / ITEMS_PER_PAGE);

  return (
    <div className="container">
      <div className="container-chil">
        {currentItems.map((order) => (
          <div className="items" key={order.order_id}>
            <span className="number-order">Id: {order.order_id}</span>
            <div className="user">
              <div>Tên: {order.customer_name}</div>
              <div>SDT: {order.phone}</div>
            </div>
            <div className="comfirm">
              <button className="button1">Đã giao</button>
              <button className="button2">Giao hàng</button>
              <button className="button3">Xóa</button>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default OrderComfirmation;
