import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, moveOrder } from "../redux/action";

function MainDisplay() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => ({
    orders: state.orders,
  }));

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${minutes} min ${seconds} sec`;
  };

  const getTotalTimeSpent = () => {
    let totalTime = 0;
    orders.forEach((order) => {
      const now = new Date();
      totalTime += now - order.time;
    });
    return formatTime(totalTime);
  };

  const getTotalOrdersDelivered = () => {
    return orders.filter((order) => order.status === "Order Picked").length;
  };

  const handleCancel = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2 className="text-decoration-underline">Main Section</h2>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Stage</th>
            <th>Total time spent (time from order placed)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>{formatTime(new Date() - order.time)}</td>
              <td>
                {order.status !== "Order Ready" &&
                  order.status !== "Order Picked" && (
                    <button
                      className="order-btn cancel-btn"
                    //   onClick={() => dispatch(moveOrder(order.id, "cancel"))}
                    onClick={() => handleCancel(order.id)}
                    >
                      Cancel
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mainDisplay-pTag">
        Total order delivered: {getTotalOrdersDelivered()}
      </p>
      <p className="mainDisplay-pTag pb-4">
        Total time spent: {getTotalTimeSpent()}
      </p>
    </div>
  );
}

export default MainDisplay;
