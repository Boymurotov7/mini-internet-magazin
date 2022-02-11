import order from '../orders/index.js'

import model from './model.js'

import jwt from 'jsonwebtoken'
export default {
	Mutation: {
		register: async (_, args) => {
			try {
			
				//const users =  model.users(args)
				//const result = users.find(user => user.username == username)
				console.log(args)
				console.log(user)
				if(user) {
					return {
						status: 200,
						message: "OK",
						user: User
					}
				} else throw new Error("didnot registered")

				} catch(error) {
				return {
					status: 400,
					message: error.message,
					user: null
				}
			}
		},
		changeUser: async (_, args) => {
			try {

				const [ user ] = await model.changeUser(args)
				console.log(args)
				if(user) {
					return {
						status: 200,
						message: "OK",
						data: User
					}
				} else throw new Error("There is no such user!")

			} catch(error) {
				return {
					status: 400,
					message: error.message,
					user: null
				}
			}
		}
		
	},

	Query: {
		login: async (_, args) => {
			const { username, password } = await model.login(args)
			console.log(username)
			console.log(password)
			if(username && password){
				return {
					message: "The user successfully logged in!",
					token: jwt.sign({ userId: user.userId }, 'SECRET_KEY')
		    	}    
			}else throw new Error("The user  did not successfully log in!")
		}
	},

	User: {
		userId: parent => parent.user_id,
		orders: parent => order.filter(order => order.user_id == parent.user_id)
	}
}