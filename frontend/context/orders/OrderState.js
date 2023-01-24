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

  // Modifica el cliente
  const addCustomer = (customer) => {
    dispatch({ type: SELECT_CUSTOMER, payload: customer });
  };

  // Modifica los productos
  const addProducts = (products) => {
    dispatch({ type: SELECT_PRODUCT, payload: products });
  };

  // Modifica las cantidades de los productos
  const quantityProducts = (newProduct) => {
    dispatch({ type: QUANTITY_PRODUCTS, payload: newProduct });
  };

  return (
    <OrderContext.Provider
      value={{
        products: state.products,
        addCustomer,
        addProducts,
        quantityProducts,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
