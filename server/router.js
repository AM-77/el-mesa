const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.end("The server is running...")
})

module.exports = router