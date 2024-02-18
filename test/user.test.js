import request from "supertest"
import app from "../src/app.js"
import User from "../src/models/user.js"
import { userOne, userOneId, setupDb } from "./fixtures/db.js"

beforeEach(setupDb)

test('should create new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'sasha',
        email: 'sashazab12@gmail.com',
        password: 'helloeveryone!okNice38'
    }).expect(201)

    // Assert that database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'sasha',
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('mypasss8348')
})

test('should login existing user', async() => {
    const response = await request(app)
        .post('/users/login')
        .send({email:userOne.email, password: userOne.password})
        .expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'yesmanok'
    }).expect(400)
})

test('should get profile for user', async() => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile', async() => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('should not delete user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('should upload avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'test/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update user fields', async () => {
    await request(app)
        .patch('/users/me')
        .send({ name: 'john' })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toBe('john')
})

test('should not uploade invalid fields', async () => {
    request(app)
        .patch('/users/me')
        .send({ location: 'virginia' })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(400)
})