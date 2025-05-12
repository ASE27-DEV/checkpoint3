import { gql } from "@apollo/client";

export const GET_COUNTRY = gql`
  query GetCountry($code: String!) {
    country(code: $code) {
      name
      emoji
      code
      continent {
        name
      }
    }
  }
`;