

// Some demo database (it is not actual database it just represents it)
// Users should contain the followings:
// Full Name, user name, password, email
const users  = []

const getUserById = (username) => {
    const user =  users.filter((user) => user.username == username)
    if(user.length == 0 ) return null
    return user[0]
}

const addUser = (user) => {
    users.push(user)
}

const isUserUnique = (username) => {
    if(!username) return false
    const existingusers = users.filter((user) => user.username == username)
    if(existingusers.length > 0 ) return false
    return true
}

//test...
const allUsers = () => console.log(users)

module.exports = {
    getUserById,
    addUser,
    allUsers,
    isUserUnique,
}