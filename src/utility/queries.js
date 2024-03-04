import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation Mutation($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      email
      password
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      username
      email
      token
      type
    }
  }
`;

export const POST_COMPANY = gql`
  mutation RegisterCompany($companyInput: CompanyInput) {
    registerCompany(companyInput: $companyInput) {
      nit
      name
      address
      phone
    }
  }
`;

export const GET_COMPANIES = gql`
  query GetAllCompanies {
    getAllCompanies {
      _id
      name
      nit
      address
      phone
    }
  }
`;

export const GET_COMPANIES_PRODUCT = gql`
  query GetAllCompanies {
    getAllCompanies {
      _id
      name
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($id: ID!, $companyInput: CompanyInput) {
    updateCompany(id: $id, companyInput: $companyInput) {
      id
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      characteristics
      code
      name
      company {
        _id
        name
      }
    }
  }
`;

export const POST_PRODUCT = gql`
  mutation RegisterProduct($input: RegisterProductInput!) {
    registerProduct(input: $input) {
      name
      characteristics
      code
      category {
        name
      }
      company {
        _id
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetAllCategory {
    getAllCategory {
      _id
      name
    }
  }
`;
