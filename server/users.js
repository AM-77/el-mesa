let users = []

const add_user = ({ id, name, room }) => {

    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    let exists = users.find((user) => user.name === name && user.room === room)
    if (exists)
        return { error: "Name is taken, please retry with a different name." }
    else
        users.push({ id, name, room })

    return { user: { id, name, room } }
}

const remove_user = (id) => {
    let index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const get_user = (id) => users.find(user => user.id === id)

const get_users_from_room = (room) => users.filter(user => user.room === room)

const get_rooms = () => {
    let rooms = []
    users.map(user => {
        if (rooms.indexOf(user.room) === -1) {
            rooms.push(user.room)
        }
    })
    return rooms
}

module.exports = { add_user, remove_user, get_user, get_users_from_room, get_rooms }