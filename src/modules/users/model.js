import fetch from '../../utils/postgres.js'

const USERS = `
	SELECT
		user_id,
	 	username,
		password,
		contact,
		email, 	
		role
	FROM users
	WHERE
	CASE
		WHEN $1 > 0 THEN user_id = $1
		ELSE TRUE
	END AND
	CASE
		WHEN LENGTH($2) > 0 THEN (
			username ILIKE CONCAT('%', $2, '%') OR
			ELSE TRUE
	END AND
	CASE
		WHEN $3 IN (true, false) THEN role = $3
		ELSE TRUE
	END
	ORDER BY user_id
	offset $4 limit $6
`

const CHANGE_USER = `
	UPDATE users u SET
		username = (
			CASE WHEN LENGTH($2) > 0 THEN $2 ELSE u.username END
		),
		password = (
			CASE WHEN LENGTH($3) > 0 THEN crypt($3, gen_salt('bf')) ELSE u.password END
		)
		contact = (
			CASE WHEN LENGTH($4) > 8 THEN $4 ELSE u.contact END
		)
		email = (
			CASE WHEN LENGTH($5) > 0 THEN $5 ELSE u.email END
		)
		
	WHERE user_id = $1 
	returning user_id, username, password, contact, email, role
`


const REGISTER =`
		insert into users (
			username,
			password,
			contact,
			email, 	
			role
		) values ($1, crypt($2, gen_salt('bf')), $3, $4 , $5 )
		returning user_id, username, password, contact, email, role
	`
const LOGIN =` 
    SELECT
	 	username,
		password
	FROM users
	WHERE
	CASE
		WHEN LENGTH($1) > 0 THEN username = $1
		ELSE TRUE
	END AND
	CASE
		WHEN LENGTH($2) > 0 THEN password = $1
		ELSE TRUE
	END 
	ORDER BY user_id
	
	`


function users ({ pagination: { page, limit }, search, userId}) {
	return fetch(USERS, userId, search, (page - 1) * limit, limit)
}
function login ({  username, password } ) {
	if(!username) throw new Error("username is required!")
	if(!password) throw new Error("password is required!")
	if(typeof(username) !== 'string' || 
		username.length < 1 || 
		username.length > 32) 
		{
			throw new Error("Invalid username!")
		}
	if (
			password.length < 4 || 
			password.length > 25 
		) 
		{
			throw new Error("Invalid password!")
		}
	//console.log( username, password)
	return fetch(LOGIN, username, password)
}
function changeUser ({ userId, username, password,contact, email } ) {
	if(!username) throw new Error("username is required!")
				//if(result) throw new Error("this username is has been selected!")
	if(!password) throw new Error("password is required!")
	if(!contact) throw new Error("contact is required!")
	if(!email) throw new Error("email is required!")
	if(typeof(username) !== 'string' || 
		username.length < 1 || 
		username.length > 32) 
		{
			throw new Error("Invalid username!")
		}
	if (
			password.length < 4 || 
			password.length > 25 
		) 
		{
			throw new Error("Invalid password!")
		}
	if (
			contact.length < 9 || 
			contact.length > 14) 
    	{
			throw new Error("Invalid contact!")
		}
	if (
			email.length < 11 || 
			email.length > 100 ||
			!(/[@]/).test(email) ||
			!(/[.]/).test(email)) 
		{
			throw new Error("Invalid email!")
		}//console.log( userId, username, password,contact, email)
	return fetch(CHANGE_USER, userId, username, password,contact, email)
}

function register ({ username, password,contact, email,role } ) {
	if(!username) throw new Error("username is required!")
				//if(result) throw new Error("this username is has been selected!")
	if(!password) throw new Error("password is required!")
	if(!contact) throw new Error("contact is required!")
	if(!email) throw new Error("email is required!")
	if(typeof(username) !== 'string' || 
		username.length < 1 || 
		username.length > 32) 
		{
			throw new Error("Invalid username!")
		}
	if (
			password.length < 4 || 
			password.length > 25 
		) 
		{
			throw new Error("Invalid password!")
		}
	if (
			contact.length < 9 || 
			contact.length > 14) 
    	{
			throw new Error("Invalid contact!")
		}
	if (
			email.length < 11 || 
			email.length > 100 ||
			!(/[@]/).test(email) ||
			!(/[.]/).test(email)) 
		{
			throw new Error("Invalid email!")
		}
	//console.log(  username, password,contact, email)
	return fetch(REGISTER,username, password , contact, email, role)}
export default {
	register,
	changeUser,
	login,
	users
}