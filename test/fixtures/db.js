import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import User from "../../src/models/user"
import Task from "../../src/models/task"

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Jake',
    email: 'jake@gmail.com',
    password: '123Hey!!',
    tokens: [{
        token: jwt.sign({ _id : userOneId}, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Alex',
    email: 'alex@gmail.com',
    password: 'heyYes03@',
    tokens: [{
        token: jwt.sign({ _id : userTwoId}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId,
    description: 'create videos',
    completed: false,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId,
    description: 'eat breakfast',
    completed: true,
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId,
    description: 'take a shower',
    completed: true,
    owner: userTwo._id
}


const setupDb = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

export { userOne, userOneId, userTwo, userTwoId, taskOne, taskTwo, taskThree, setupDb }