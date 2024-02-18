import request from "supertest"
import app from "../src/app"
import Task from "../src/models/task"
import { userOne, userOneId, setupDb, userTwo, userTwoId, taskOne, taskTwo, taskThree } from "./fixtures/db.js"

beforeEach(setupDb)

test('should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'clean room',
        })
        .expect(201)
    const taskId = await Task.findById(response.body._id)
    expect(taskId).not.toBeNull()
})

test('should return all userOne tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)
})

test('should not let userTwo remove first task', async () => {
    const response = await request(app)
        .delete('/task/' + taskOne._id)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})