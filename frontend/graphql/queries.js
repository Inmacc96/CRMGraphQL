import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      surname
    }
  }
`;

export const GET_CUSTOMERS_USER = gql`
  query getCustomersSeller {
    getCustomersSeller {
      id
      name
      surname
      company
      email
    }
  }
`;

export const GET_CUSTOMER = gql`
  query getCustomer($id: ID!) {
    getCustomer(id: $id) {
      id
      name
      surname
      company
      email
      phone
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      price
      stock
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      stock
      price
    }
  }
`;

export const GET_ORDERS = gql`
  query getOrdersSeller {
    getOrdersSeller {
      id
      order {
        id
        quantity
        name
        price
      }
      total
      customer {
        id
        name
        surname
        email
        phone
      }
      seller
      state
    }
  }
`;

export const BEST_SELLERS = gql`
  query getBestSellers {
    getBestSellers {
      total
      seller {
        name
        email
      }
    }
  }
`;

export const BEST_CUSTOMERS = gql`
  query getBestCustomers {
    getBestCustomers {
      total
      customer {
        id
        name
        company
      }
    }
  }
`;
