import { useReducer } from "react";
import OrderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";

import {
  SELECT_CUSTOMER,
  SELECT_PRODUCT,
  QUANTITY_PRODUCTS,
} from "../../types";

const OrderState = ({ children }) => {
  // State de pedidos
  const initialState = {
    customer: {},
    products: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // modifica el cliente

  const addCustomer = (customer) => {
    dispatch({ type: SELECT_CUSTOMER, payload: customer });
  };

  return (
    <OrderContext.Provider value={{ addCustomer }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
