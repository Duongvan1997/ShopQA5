import { Button, Form, Modal, Rate, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Feedback = ({ visible, hideModal, productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const userData = JSON.parse(localStorage.getItem("user"));

  // Function to fetch product details from backend
  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/products/${productId}`);
      const product = response.data;

      // Ensure the necessary fields are available in the product data
      if (product && parseInt(product.id) === parseInt(productId) && product.name && product.image_url && product.price) {
        setProductName(product.name);
        setProductImage(product.image_url);
        setProductPrice(product.price);
      } else {
        message.error("Failed to fetch product details. Product data is incomplete.");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      message.error("Failed to fetch product details. Please try again.");
    }
  };

  // Effect hook to fetch product details when visible or productId changes
  useEffect(() => {
    if (visible && productId) {
      fetchProductDetails(productId);
    }
  }, [visible, productId]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!comment || !rating) {
      message.error("Please complete all fields before submitting.");
      return;
    }

    const feedbackData = {
      comment: comment,
      rating: rating,
      feedback_date: moment().format("YYYY-MM-DD"),
      customer_id: userData.id,
      product_id: productId,
    };

    try {
      await axios.post("http://localhost:8080/api/v1/feedbacks/customer", feedbackData, {
        auth: {
          username: userData.username,
          password: userData.password,
        },
      });
      message.success("Feedback created successfully!");
      hideModal();
    } catch (error) {
      console.error("Error creating feedback:", error);
      message.error("Failed to create feedback. Please try again.");
    }
  };

  return (
    <Modal
      title="Feedback"
      visible={visible}
      onCancel={hideModal}
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <div style={{ textAlign: "center" }}>
        <img src={productImage} alt={productName} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
        <h2>{productName}</h2>
        <p>Price: ${productPrice} đ</p>
      </div>
      <Form layout="vertical">
        <Form.Item label="Rate">
          <Rate onChange={handleRatingChange} value={rating} />
        </Form.Item>
        <Form.Item label="Comment">
          <TextArea
            rows={4}
            placeholder="Leave your comment here..."
            value={comment}
            onChange={handleCommentChange}
            style={{ marginTop: "10px" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Feedback;
