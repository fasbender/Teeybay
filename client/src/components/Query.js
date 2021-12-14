import { gql } from '@apollo/client';

export const getALL = gql`
  {
    getAll{
      id
      title
      description
    }
  }
`

export const SINGLE_POST = gql`
  query singlePost($id: String){
    singlePost(id: $id){
        id
        title
        description
    }
  }
`