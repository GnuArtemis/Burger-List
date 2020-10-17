const express = require("express");

const router = express.Router();

const Burger = require("../models/burger");

router.get("/", function (req, res) {
    Burger.selectAll(function (data) {
        const handlebarsObj = {
            burgers: data
        };

        console.log(handlebarsObj);
        res.render("index", handlebarsObj);
    })
})

router.post("/api/burgers", function (req, res) {
    Burger.insertOne(["burger_name", 'devoured'], [req.body.burger_name, req.body.devoured], function (result) {
        console.log(req.body)
        res.json({ id: result.insertId });
    })
});

router.put("/api/burgers/:id", function (req, res) {
    Burger.updateOne({ devoured: req.body.devoured }, req.params.id, function (result) {
        if (result.changedRows === 0) return res.status(404).end();
        else res.status(200).end();
    })
});

router.delete("/api/burgers/:id", function (req, res) {
    Burger.delete(req.params.id, function (result) {
        if (result.affectedRows === 0) return res.status(404).end();
        else res.status(200).end();
    })
})

module.exports = router;