import { useState } from "react";

const Order = ({ order }) => {
  const { id, total, customer, state } = order;

  const [orderState, setOrderState] = useState(state);

  return (
    <div className="mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg">
      <div>
        <p className="font-bold text-gray-800">Customer: {customer}</p>
        <h2 className="text-gray-6800 font-bold mt-10">Order state: </h2>

        <select
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
          value={orderState}
          onChange={(e) => setOrderState(e.target.value)}
        >
          <option value="COMPLETED">COMPLETED</option>
          <option value="PENDING">PENDING</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

      <div>
        <h2 className="text-gray-800 font-bold mt-2">Order Summary</h2>
        {order.order.map((article) => (
          <div className="mt-4" key={article.id}>
            <p className="text-sm text-gray-600">Product: {article.name} </p>
            <p className="text-sm text-gray-600">
              Quantity: {article.quantity}
            </p>
          </div>
        ))}

        <p className="text-gray-800 mt-3 font-bold">
          Total payable:
          <span className="font-light"> $ {total}</span>
        </p>

        <button
          type="button"
          className="flex items-center mt-4 bg-red-800 px-5 py-2 text-white rounded leading-tight uppercase text-xs font-bold"
        >
          Delete Order
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Order;
