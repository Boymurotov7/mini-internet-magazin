import model from './model.js'

export default {
	Mutation: {
		editProduct: async (_, args) => {
			try {

				const [ product ] = await model.editProduct(args)
				
				if(product) {
					return {
						status: 200,
						message: "OK",
						data: product
					}
				} else throw new Error("There is no such product!")

			} catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
		},
		addProduct: async (_, args) => {
			try {

				const [ product ] = await model.addProduct(args)
				
				if(product) {
					return {
						status: 200,
						message: "OK",
						data: product
					}
				} else throw new Error("product do not add !")

			} catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
		},
		deleteProduct: async (_, args) => {
			try {

				const [ product ] = await model.deleteProduct(args)
				
				if(product) {
					return {
						status: 200,
						message: "OK",
						data: product
					}
				} else throw new Error("There is no such product!")

			} catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
		}
		
	},

	Query: {
		Products: async (_, args) => {
			return await model.Products(args)
		}
	},

	Product: {
		productId: parent => parent.product_id,
	}
}