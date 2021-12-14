const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

// const username = process.env.DB_USERNAME
// const password = process.env.DB_PASSWORD

const URL = `mongodb+srv://fasbender:bbggtt66@cluster0.vfwiw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

//Database connection
mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => console.log("DB Connected"))

//Server Connection
const startServer = async() => {
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({
        app: app,
    })
    app.listen(4000, () => {
        console.log("Server is running on port 4000")
    })
}

startServer()