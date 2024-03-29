import { ADD_ORDER, MOVE_ORDER } from "./actionTypes";

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: order,
});

export const moveOrder = (orderId, action) => ({
  type: MOVE_ORDER,
  payload: { orderId, action },
});
