const socketio = require("socket.io")
const express = require("express")
const http = require("http")
const cors = require("cors")
const { add_user, remove_user, get_user, get_users_from_room, get_rooms } = require("./users")

const PORT = process.env.PORT || 3300
const router = require("./router")

const app = express()
app.use(cors())
app.use(router)

const server = http.createServer(app)
const io = socketio(server)

let writters = {}

io.on("connection", (socket) => {

    socket.on("join", ({ name, room }, callback) => {
        let { user, error } = add_user({ id: socket.id, name, room })
        let members = get_users_from_room(room)
        if (error) return callback(error)
        socket.emit("message", { user: "admin", text: `'${user.name}' welcome to '${user.room}'`, members })
        socket.broadcast.to(user.room).emit("message", { user: "admin", text: `'${user.name}' has joined the conversation.`, members })
        socket.join(user.room)
        writters[user.room] = []
        callback()
    })

    socket.on("send-message", (message, callback) => {
        const user = get_user(socket.id)
        io.to(user.room).emit("message", { user: user.name, text: message })
        callback()
    })

    socket.on("get-rooms", () => {
        io.emit("rooms", { rooms: get_rooms() })
    })

    socket.on("isWritting", ({ name, room }) => {
        writters[room].push(name)
        io.to(room).emit("writters", { writters: writters[room] })
    })

    socket.on("stoppedWritting", ({ name, room }) => {
        writters[room] = writters[room].filter(n => n != name)
        io.to(room).emit("writters", { writters: writters[room] })
    })

    socket.on("disconnect", () => {
        let user = remove_user(socket.id)
        if (user) {
            let members = get_users_from_room(user.room)
            io.to(user.room).emit("message", { user: "admin", text: `'${user.name}' has left the conversation.`, members })
            io.emit("rooms", { rooms: get_rooms() })
        }
    })
})

server.listen(PORT, () => { console.log("Server is running on port: " + PORT) })
