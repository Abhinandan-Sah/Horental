const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
    res.send("Get post");
});
route.get("/:id", (req, res) => {
    res.send("Get post id");
});
route.post("/:id", (req, res) => {
    res.send("create post");
});
route.delete("/:id", (req, res) => {
    res.send("Delete post");
});

module.exports = route;