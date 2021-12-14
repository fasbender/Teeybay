const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Post{
        id: ID
        title: String
        description: String
    }

    type Query{
        getAll: [Post]
        singlePost(id: String): Post
    }

    input postInput{
        title: String
        description: String
    }

    type Mutation{
        createPost(post: postInput): Post
        updatePost(id: String, post: postInput): Post
        deletePost(id: String): String
    }
`

module.exports = typeDefs