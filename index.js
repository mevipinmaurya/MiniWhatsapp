const express = require("express");
const app = express();
const path = require("path");

const Chat = require("./models/chat.js");

const methodOverride = require("method-override");
app.use(methodOverride('_method'))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({ extended: true }))

const mongoose = require("mongoose");

main().then(() => {
    console.log("Connection Successfull");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


// // Creating objects
// let chat1 = new Chat({
//     from: "Neha",
//     to: "Priya",
//     msg: "Hello ! How are you ?",
//     created_at: new Date()
// })

// chat1.save().then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })

// index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    // res.send("Fetching data");
    res.render("index.ejs", { chats });
})


// new Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

// create route
app.post("/chats", (req, res) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })

    newChat.save().then((res) => {
        console.log("Chat was saved.")
    }).catch((err) => {
        console.log(err);
    })

    res.redirect("/chats");
})


// edit route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
})

// Update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { newMsg } = req.body;
    await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true }).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    });
    res.redirect("/chats");
})

// Delete route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

app.get("/", (req, res) => {
    res.send("Server is working")
})

app.listen("8080", () => {
    console.log("Server is Listening on port 8080");
})