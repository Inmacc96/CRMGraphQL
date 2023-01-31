import { gql } from "@apollo/client";

export const NEW_USER = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      surname
      email
    }
  }
`;

export const AUTH_USER = gql`
  mutation authUser($input: AuthInput) {
    authUser(input: $input) {
      token
    }
  }
`;

export const NEW_CUSTOMER = gql`
  mutation newCustomer($input: CustomerInput) {
    newCustomer(input: $input) {
      id
      name
      surname
      company
      email
      phone
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($id: ID!, $input: CustomerInput) {
    updateCustomer(id: $id, input: $input) {
      id
      name
      surname
      company
      email
      phone
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      id
      name
      surname
      company
      email
      phone
    }
  }
`;

export const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      stock
      price
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      id
      name
      stock
      price
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      stock
      price
    }
  }
`;

export const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
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

export const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
      id
      state
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
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
