import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PaymentMethod.css";
import { FaEdit, FaPlus } from "react-icons/fa";

const PaymentMethod = () => {
  const adminData = JSON.parse(localStorage.getItem("user"));
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newMethod, setNewMethod] = useState("");
  const [editMethod, setEditMethod] = useState({ id: null, name: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/paymentMethods/all",
          {
            auth: {
              username: adminData.username,
              password: adminData.password,
            },
          }
        );
        setPaymentMethods(response.data);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleAddMethod = async () => {
    if (newMethod) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/paymentMethods/create",
          { name: newMethod },
          {
            auth: {
              username: adminData.username,
              password: adminData.password,
            },
          }
        );
        setPaymentMethods([...paymentMethods, response.data]);
        setNewMethod("");
      } catch (error) {
        console.error("Error adding payment method:", error);
      }
    }
  };

  const handleEditMethod = (id, name) => {
    setEditMethod({ id, name });
  };

  const handleUpdateMethod = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/paymentMethods/update/id`,
        { name: editMethod.name },
        {
          auth: {
            username: adminData.username,
            password: adminData.password,
          },
        }
      );
      setPaymentMethods(
        paymentMethods.map((method) =>
          method.id === editMethod.id ? response.data : method
        )
      );
      setEditMethod({ id: null, name: "" });
    } catch (error) {
      console.error("Error updating payment method:", error);
    }
  };

  return (
    <div className="payment-form-container">
      <h2>Choose Payment Method</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="payment-methods">
          {paymentMethods.map((method) => (
            <div key={method.id} className="payment-method">
              <label>
                <input
                  type="radio"
                  value={method.name}
                  checked={paymentMethod === method.name}
                  onChange={() => setPaymentMethod(method.name)}
                />
                {method.name}
              </label>
              <FaEdit
                className="edit-icon"
                onClick={() => handleEditMethod(method.id, method.name)}
              />
            </div>
          ))}
        </div>
      )}

      {editMethod.id && (
        <div className="edit-method">
          <h3>Edit Payment Method</h3>
          <input
            type="text"
            value={editMethod.name}
            onChange={(e) =>
              setEditMethod({ ...editMethod, name: e.target.value })
            }
          />
          <button onClick={handleUpdateMethod}>Update</button>
        </div>
      )}

      <div className="add-method">
        <h3>Add New Payment Method</h3>
        <div className="add-method-container">
          <input
            type="text"
            value={newMethod}
            onChange={(e) => setNewMethod(e.target.value)}
          />
          <button onClick={handleAddMethod}>
            <FaPlus /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
