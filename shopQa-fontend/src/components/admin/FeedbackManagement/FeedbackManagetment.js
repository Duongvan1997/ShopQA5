// import "./FeedbackManagement.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, message, Modal, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { format } from "date-fns";
import moment from "moment";

function FeedbackManagement() {
  const { confirm } = Modal;
  const [messageApi, contextHolder] = message.useMessage();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const adminData = JSON.parse(localStorage.getItem("user"));

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/v1/feedbacks/getAll", {
        auth: {
          username: adminData.username,
          password: adminData.password,
        },
      })
      .then((response) => {
        const feedbacksFormatted = response.data.map((feedback) => {
          return {
            feedback_id: feedback.id,
            customer_id: feedback.customer_id,
            product_id: feedback.product_id,
            rating: feedback.rating,
            comment: feedback.comment,
            feedback_date: moment(feedback.feedback_date).format("YYYY-MM-DD"),
          };
        });
        console.log("response :", response.data);

        setFeedbacks(feedbacksFormatted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchData();
  }, []);

  const columns = [
    {
      title: "Feedback ID",
      dataIndex: "feedback_id",
    },
    {
      title: "Customer ID",
      dataIndex: "customer_id",
    },
    {
      title: "Product ID",
      dataIndex: "product_id",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Comment",
      dataIndex: "comment",
    },
    {
      title: "Feedback Date",
      dataIndex: "feedback_date",
    },
  ];

  return (
    <div className="feedback-management-container">
      {contextHolder}
      <Breadcrumb
        items={[
          {
            title: "Management",
          },
          {
            title: "Feedback Management",
          },
        ]}
      />
      <Table
        columns={columns}
        dataSource={feedbacks}
        loading={loading}
        pagination={true}
        size="large"
      />
    </div>
  );
}

export default FeedbackManagement;
