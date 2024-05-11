const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
    res.send("Get users");
});
route.get("/:id", (req, res) => {
    res.send("Get user id");
});
route.post("/:id", (req, res) => {
    res.send("create User");
});
route.delete("/:id", (req, res) => {
    res.send("Delete User");
});

module.exports = route;