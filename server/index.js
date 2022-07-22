const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv").config()
const cors = require("cors")
const app = express()
const PORT = process.env.PORT
const mongo = process.env.MONGODB_URI


mongoose.connect(mongo)
    .then(() => console.log("connected to dataBase"))
    .catch(error => console.log(error))

app.use(express.json())
app.use(cors())


const Schema = mongoose.Schema

const itemSchema = new Schema({
    itemName: String,
})

const Item = mongoose.model("item", itemSchema)



app.get("/get", async function (req, res) {
    const items = await Item.find({})
    res.send(items)
})




app.post("/add", async function (req, res) {
    const item = new Item(req.body)

    const thinkpro = new Item ({item})

    const response = await thinkpro.save()
    res.send(response)
})



app.listen(PORT, function () {
    console.log("up and running on Port " + PORT);
})