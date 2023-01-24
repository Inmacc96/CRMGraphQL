import {
  SELECT_CUSTOMER,
  SELECT_PRODUCT,
  QUANTITY_PRODUCTS,
  UPDATE_TOTALPAYABLE,
} from "../../types";

const OrderReducer = (state, action) => {
  switch (action.type) {
    case SELECT_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case QUANTITY_PRODUCTS:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case UPDATE_TOTALPAYABLE:
      return {
        ...state,
        total: state.products.reduce(
          (newTotal, product) => newTotal + product.price * product.quantity,
          0
        ),
      };
    default:
      return state;
  }
};

export default OrderReducer;
