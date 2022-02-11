import model from './model.js' 

export default {
	Mutation: {
		addOrder: async(_, { userId,productId }) => {
			try {
				let token = context.token;
				let user = token ? 
				 jsonwebtoken.verify(token,procces.env.SECRET_KEY):{}
				if(user.role=="admin")throw new Error("Admin cannot add order");

				return await model.addOrder(user.user_id)
	
				//return {
				//	status: 200,
				//	message: "The order has succesfully added!",
				//	data: newOrder
				//}
			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		},

		changeOrder:  async (_, { productId}) => {
			try {
				let token = context.token;
				let user = token ? 
				 jsonwebtoken.verify(token,procces.env.SECRET_KEY):{}
				if(user.role=="admin")throw new Error("Admin cannot change order");

				const [ order ] = await model.addOrder(args)
				if(order.is_paid==true)throw new Error("You cannot change order");
				if(order) {
					return {
						status: 200,
						message: "OK",
						data: order
					}
				} else throw new Error("product do not change !")

			} catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
		},

			

		deleteOrder: (_, { orderId }) => {
			try {
				
				let token = context.token;
				let user = token ? 
				 jsonwebtoken.verify(token,procces.env.SECRET_KEY):{}
				if(user.role=="admin")throw new Error("Admin cannot delete order");

				let index = orders.findIndex(order => order.order_id == orderId)
				if(index == -1) throw new Error("There is no such order!")

				let deletedOrder = orders.splice(index, 1)

				return {
					status: 200,
					message: "The order has succesfully deleted!",
					data: deletedOrder
				}

			} catch(error) {
				return {
					status: 400,
					message: error.message
				}
			}
		}
	},
	Query: {
		orders: (_, { userId, orderId }) => {
			if(userId) {
				return orders.filter(order => order.user_id == userId)
			}

			if(orderId) {
				return [orders.find(order => order.order_id == orderId)]
			}

			return orders
		},
	},

	Order: {
		orderId: parent => parent.order_id,
		user:    parent => users.find(user => user.user_id == parent.user_id),
		product: parent => products.find(product => product.product_id == parent.product_id)
	}
}