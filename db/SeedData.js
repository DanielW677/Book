const client = require('./Client')
const {createUser} = require('./Users')

async function dropTables(){
    console.log('Starting to drop tables')
    try {
        await client.query(`
            DROP TABLE IF EXISTS usersbooks;
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS books;      
        `)
        console.log('Tables Dropped')
    } catch (error) {
        console.log(error)
    }
}


async function makeTables(){
    console.log('starting to make tables')
    try {
        await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                "isAdmin" BOOLEAN DEFAULT FALSE
            );
            CREATE TABLE books(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) UNIQUE NOT NULL,
                author VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                photo VARCHAR(255) NOT NULL
            );
            CREATE TABLE usersbooks(
                "bookID" INTEGER REFERENCES books(id),
                "userID" INTEGER REFERENCES users(id),
                rating INTEGER
            );
        `)
        console.log('Tables Made')
    } catch (error) {
        console.log(error)
    }
}

async function firstUsers(){
    console.log('Starting to make new users')
    try {
        const usersToCreate = [
            {
                username: "Daniel",
                password: "daniel123",
                isAdmin: true
            },
            {
                username: "Test1",
                password: "test1",
                isAdmin: false
            },
            {
                username: "Test2",
                password: "test2",
                isAdmin: false
            }
        ]
        const users = await Promise.all(usersToCreate.map(createUser))
        console.log(users)
        console.log('Users Made')
    } catch (error) {
        console.log(error)
    }
}

async function buildBase(){
    try {
        client.connect()
        await dropTables()
        await makeTables()
        await firstUsers()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    buildBase
}