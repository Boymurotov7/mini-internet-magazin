import fetch from '../../utils/postgres.js'

const  ADDORDERS =`
		insert into orders (
			product_id,
		) values ( $1 )
		returning user_id,product_id`

const  CHANGEORDER =`
		insert into orders (
			product_id
		) values ($1 )
		returning product_id`

const  DELETEORDER =`
		insert into orders (
			product_id
		) values ($1)
		returning product_id`

function addOrder({user_id,product_id}){
	return fetch(ADDORDERS, user_id, product_id)
}
function changeOrder({product_id}){
	return fetch(CHANGEORDER, product_id)
}
function deleteOrder({product_id}){
	return fetch(DELETEORDER, product_id)
}
export default {
	addOrder,
	changeOrder,
	deleteOrder
}