const client = require('./Client')
const bcrypt = require('bcrypt')

async function createUser({username, password, isAdmin}){
    const hashedPassWord = await bcrypt.hash(password, 10)
    try {
        const {rows: [user]} = await client.query(`
            INSERT INTO users(username, password, "isAdmin")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [username, hashedPassWord, isAdmin])
        // console.log(user)
        return user
    } catch (error) {
        console.log('error creating user')
        console.log(error)
    }
}

async function getUserByUsername(username){
    try {
        const {rows: [user]} = await client.query(`
            SELECT *
            from users
            where username=$1;
        `, [username])
        // console.log(user)
        return user
    } catch (error) {
        console.log(error)
    }
}

async function getUserByID(id){
    try {
        const {rows: [user]} = await client.query(`
            SELECT *
            from users
            where id=$1;
        `, [id])
        // console.log(user)
        return user
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserByID
}