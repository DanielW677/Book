const client = require('./Client')
const {buildBase} = require('./SeedData')

buildBase()
    .catch(console.error)
    .finally(() => client.end())