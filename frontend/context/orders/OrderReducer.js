import {
  SELECT_CUSTOMER,
  SELECT_PRODUCT,
  QUANTITY_PRODUCTS,
} from "../../types";

const OrderReducer = (state, action) => {
  switch (action.type) {
    case SELECT_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
      };
    default:
      return state;
  }
};

export default OrderReducer;
