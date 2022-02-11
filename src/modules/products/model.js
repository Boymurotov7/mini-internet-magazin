import fetch from '../../utils/postgres.js'



const PRODUCTS = `
	SELECT
		product_id,
		category_name,
	 	productName,
	 	price,
	 	shortDesc,
	 	longDesc,
	 	picture
	FROM products
	WHERE
	CASE
		WHEN $1 > 0 THEN product_id = $1
		ELSE TRUE
	END AND
	CASE
		WHEN LENGTH($3) > 0 THEN (
			category_name ILIKE CONCAT('%', $3, '%') OR
			ELSE TRUE
	END AND
	CASE
		WHEN LENGTH($4) > 0 THEN (
			productName ILIKE CONCAT('%', $3, '%') OR
			ELSE TRUE
	END 
    ORDER BY product_id
	`

const EDITPRODUCTS= `
	UPDATE products c SET
		productName = (
			CASE WHEN LENGTH($2) > 0 THEN $2 ELSE c.productName END
		)
	WHERE product_id = $1
	RETURNING *
`


const  ADDPRODUCTS =`
		insert into products (
			category_name,
	 		productName,
	 		price,
	 		shortDesc,
	 		longDesc,
	 		picture
		) values ($1,$2,$3,$4,$5,$6 )
		returning category_name,productName,price,shortDesc,longDesc,picture
	`
const DELETEPRODUCTS= `
	delete from products cascade 
	where productName = $1
	returning productName
		
	`





function Product ({ category,productName} ) {
	//console.log(name)
	return fetch( PRODUCTS, category_name,productName)
} 

function deleteProduct ({ productName } ) {
	//console.log(name)
	return fetch(DELETEPRODUCTS, productName)
}
function addProduct ({category_name,productName,price,shortDesc,longDesc,picture} ) {
	// console.log(  name)
	return fetch(ADDPRODUCTS, category_name,productName,price,shortDesc,longDesc,picture)
}

function editProduct ({ product_id, productName } ) {
	// console.log( category_id, name)
	return fetch(EDITPRODUCTS,product_id,productName)}
export default {
	Product,
	deleteProduct,
	addProduct,
	editProduct
}