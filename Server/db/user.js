const models = require('../models')

const UserModel = models.userModel

const createUser = async (user) => {
    try {
        if(!user) throw new Error("Undefined user data passed")

        const newUser = new UserModel(user)
        await models.saveModel(newUser)
    } catch (err) {
        return handleError(err)
    }
}

const getUser = async (username) => {
    try {
        if(!username) throw new Error("Username is undefined")
        const user = await models.findOneModel(UserModel, {username: username}) 
        return user
    } catch (err) {
        return handleError(err)
    }
}

const deleteUser = username => {
    // delete only one user
}

module.exports = {
    createUser,
    getUser,
    deleteUser
}

// TODO: the file has following functionality
// 1. creating and saving user in case of signup                        ...Done
// 2. give user info in case of signIn                                  ...Done
// 4. deleting user in case of account deleting