import { ADD_ORDER, MOVE_ORDER } from "./actionTypes";

const initialState = {
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [
          ...state.orders,
          {
            ...action.payload,
            id: state.orders.length + 1,
            status: "Order Placed",
            time: new Date(),
          },
        ],
      };
    case MOVE_ORDER:
      return {
        ...state,
        orders: state.orders
          .map((order) =>
            order.id === action.payload.orderId
              ? {
                  ...order,
                  status: getNextStatus(order.status, action.payload.action),
                  time: new Date(),
                }
              : order
          )
          .sort((a, b) => compareOrders(a, b)),
      };
    default:
      return state;
  }
};

const getNextStatus = (currentStatus, action) => {
  switch (currentStatus) {
    case "Order Placed":
      return action === "next" ? "Order in Making" : "Cancelled";
    case "Order in Making":
      return action === "next" ? "Order Ready" : "Cancelled";
    case "Order Ready":
      return action === "next" ? "Order Picked" : "Cancelled";
    default:
      return currentStatus;
  }
};

const compareOrders = (a, b) => {
  const stageDelayA = getStageDelay(a.status, a.time);
  const stageDelayB = getStageDelay(b.status, b.time);

  return stageDelayA - stageDelayB;
};

const getStageDelay = (order) => {
  const now = new Date();
  const delay = now - order.time;

  switch (order.status) {
    case "Order Placed":
      return delay;
    case "Order in Making":
      return delay - getMakingTime(order.size);
    case "Order Ready":
      return delay - getMakingTime(order.size) - getMakingTime(order.size);
    default:
      return delay;
  }
};

const getMakingTime = (size) => {
  switch (size) {
    case "Small":
      return 1 * 60 * 1000; // 3 minutes in milliseconds
    case "Medium":
      return 4 * 60 * 1000; // 4 minutes in milliseconds
    case "Large":
      return 5 * 60 * 1000; // 5 minutes in milliseconds
    default:
      return 0;
  }
};

export default reducer;
