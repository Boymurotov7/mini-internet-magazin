import { gql } from 'apollo-server-express'
import { readFileSync } from 'fs'
import path from 'path'

import categoryModule from './categories/index.js'
import orderModule from './orders/index.js'
import productModule from './products/index.js'
import userModule from './users/index.js'


export default {
	typeDefs: [
		userModule.typeDefs,
		productModule.typeDefs,
		orderModule.typeDefs,
		categoryModule.typeDefs,
	],
	resolvers: [
		userModule.resolvers,
		productModule.resolvers,
		orderModule.resolvers,
		categoryModule.resolvers,
	]
}
