import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/action";

function OrderForm() {
  const [order, setOrder] = useState({
    type: "",
    size: "",
    base: "",
  });

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => ({
    orders: state.orders,
  }));
//   console.log('orders', orders)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = (e) => {
    // console.log('order: ', order);
    e.preventDefault();
    if(order.type && order.base && order.size){
        if (orders.length < 10) { // Check if the maximum limit of orders has been reached
          dispatch(addOrder(order))
          setOrder({
            type: '',
            size: '',
            base: '',
          });
        } else {
          alert("Not taking any order for now. Maximum limit reached.");
        }
    }else{
        alert("Please select the type, size, and base of your pizza.")
    }
  };

  return (
    <div className="order-form">
      <h2 className="pt-1 text-decoration-underline">Place Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <select name="type" className="me-3" value={order.type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </label>
        <label>
          Size:
          <select name="size" className="me-3" value={order.size} onChange={handleChange}>
            <option value="">Select Size</option>
            <option value="Large">Large</option>
            <option value="Medium">Medium</option>
            <option value="Small">Small</option>
          </select>
        </label>
        <label>
          Base:
          <select name="base" className="me-3" value={order.base} onChange={handleChange}>
            <option value="">Select Base</option>
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
          </select>
        </label>
        <button type="submit" className="order-btn">Place Order</button>
      </form>
    </div>
  );
}

export default OrderForm;
