import fetch from '../../utils/postgres.js'



const CATEGORIES = `
	SELECT
		*
	FROM categories
	WHERE
	CASE
		WHEN $1 > 0 THEN category_id = $1
		ELSE TRUE
	END AND
	CASE
		WHEN LENGTH($2) > 0 THEN (
			name = $2)
		ELSE TRUE
	END 
	ORDER BY category_id
	offset $3 limit $4
	`

const EDITCATEGORY= `
	UPDATE categories c SET
		category_name = (
			CASE WHEN LENGTH($2) > 0 THEN $2 ELSE c.category_name END
		)
	WHERE category_id = $1
	RETURNING *
`


const  ADDCATEGORY =`
		insert into categories (
			category_name
		) values ($1 )
		returning name
	`
const DELETECATEGORY= `
	delete from categories cascade 
	where category_name = $1
	returning category_name
		
	`





function Categories ({category_id, search,pagination:{page, limit} } ) {
	//console.log(name)
	return fetch(CATEGORIES, category_id, search,page, limit)
} 

function deleteCategory ({ category_name } ) {
	//console.log(name)
	return fetch(DELETECATEGORY, category_name)
}
function addCategory ({ category_name } ) {
	// console.log(  name)
	return fetch(ADDCATEGORY, category_name)
}

function editCategory ({ category_id, name } ) {
	// console.log( category_id, name)
	return fetch(EDITCATEGORY,category_id, category_name)}
export default {
	Categories,
	deleteCategory,
	addCategory,
	editCategory
}