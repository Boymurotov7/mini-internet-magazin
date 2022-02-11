import model from './model.js'

export default {
	Mutation: {
		editCategory: async (_, args) => {
			try {

				const [ category ] = await model.editCategory(args)
				
				if(category) {
					return {
						status: 200,
						message: "OK",
						data: category
					}
				} else throw new Error("There is no such category!")

			} catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
		},
		addCategory: async (_, args) => {
			try {

				const [ category ] = await model.addCategory(args)
				
				if(category) {
					return {
						status: 200,
						message: "OK",
						data: category
					}
				} else throw new Error("category do not add !")

			} catch(error) {
				return {
					status: 400,
					message: error.message,
					data: null
				}
			}
		},
		deleteCategory: async (_, args) => {
			try {

				const [ category ] = await model.deleteCategory(args)
				
				if(category) {
					return {
						status: 200,
						message: "OK",
						data: Category
					}
				} else throw new Error("There is no such category!")

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
		Categories: async (_, args) => {
			return await model.Categories(args)
		}
	},

	Category: {
		categoryId: parent => parent.category_id,
	}
}