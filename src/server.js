import { 
  ApolloServerPluginLandingPageGraphQLPlayground, 
  ApolloServerPluginDrainHttpServer,
} from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'
import '../config.js'

import modules from './modules/index.js'
const schema = makeExecutableSchema({
    typeDefs: modules.typeDefs,
    resolvers: modules.resolvers,
})

async function startApolloServer() {

    const app = express()
    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        introspection: true,
        schema:schema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
            ApolloServerPluginDrainHttpServer({ httpServer })
        ],
    })
    
    await server.start()
    server.applyMiddleware({ app })
    await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve))
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()