import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stages } from "../utility/constant";
import { moveOrder } from "../redux/action";
import MainDisplay from "./MainDisplay";

function PizzaDisplay() {
  const [timers, setTimers] = useState({});
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => ({
    orders: state.orders,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimers();
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  const updateTimers = () => {
    const now = new Date();
    const updatedTimers = {};
    orders.forEach((order) => {
      updatedTimers[order.id] = now - order.time;
    });
    setTimers(updatedTimers);
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleNextStage = (orderId) => {
    dispatch(moveOrder(orderId, "next"));
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {stages.map((stage, index) => (
          <div key={stage} style={{ flex: 1 }}>
            <h2>{stage}</h2>
            {orders.map((order) => {
              if (order.status === stage) {
                return (
                  <div
                    key={order.id}
                    style={{
                      backgroundColor:
                        timers[order.id] > .5 * 60 * 1000 &&
                        order.status === "Order in Making"
                          ? "red"
                          : order.status === "Order Placed"
                          ? "lightblue"
                          : order.status === "Order in Making"
                          ? "#F5EEDC"
                          : order.status === "Order Ready"
                          ? "#94D9D3"
                          : order.status === "Order Picked"
                          ? "lightgray"
                          : "white",
                    }}
                    className="pizza-box"
                  >
                    <h3 className="fs-6">Order ID: {order.id}</h3>
                    <p>Type: {order.type}</p>
                    <p>Size: {order.size}</p>
                    <p>Base: {order.base}</p>
                    <p>Status: {order.status}</p>
                    {index !== 3 && ( // Don't show time for Order Picked stage
                      <p>Time Spent: {formatTime(timers[order.id])}</p>
                    )}
                    {index < 3 && (
                      <div>
                        <button
                          onClick={() => handleNextStage(order.id)}
                          className="order-btn"
                        >
                          Next Stage
                        </button>
                        {/* <button onClick={() => handleCancelOrder(order.id)}>Cancel Order</button> */}
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
      <hr />
      {orders.length>0 && <MainDisplay />}
    </div>
  );
}

export default PizzaDisplay;
