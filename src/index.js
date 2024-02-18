import app from "./app.js"
const port = process.env.PORT

app.listen(port, () => {
    console.log('ur server is up on port ' + port)
})
