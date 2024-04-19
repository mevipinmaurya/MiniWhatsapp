const mongoose = require("mongoose");
const Chat = require("./models/chat.js")

main().then(() => {
    console.log("Connection Successfull");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// dummy chats
let allChats = [
    {
        from: "Neha",
        to: "Priya",
        msg: "Hello ! How are you ?",
        created_at: new Date()
    },
    {
        from: "Rohit",
        to: "mohit",
        msg: "i am watching movie",
        created_at: new Date()
    },
    {
        from: "ajay",
        to: "shrey",
        msg: "are you ok",
        created_at: new Date()
    },
    {
        from: "thor",
        to: "tony",
        msg: "Give me back my hammer",
        created_at: new Date()
    },
    {
        from: "hulk",
        to: "window",
        msg: "I like your fighting style",
        created_at: new Date()
    },
    {
        from: "captian",
        to: "hawkeye",
        msg: "give me my shield",
        created_at: new Date()
    }
]

Chat.insertMany(allChats);