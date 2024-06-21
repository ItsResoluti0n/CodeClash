const express = require("express")
const app = express()
const cors = require('cors');
const server = require("http").Server(app)
const io = require("socket.io")(server)
const { v4: uuidV4 } = require("uuid")
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');

app.set("view engine", "ejs")
app.use(cors())
app.use(express.json({limit: "200mb"}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/javascript', express.static(path.join(__dirname, 'javascript')));

//initial page to display
app.get("/", async (req, res) => {
  res.redirect('/index.html');
})

server.listen(3000)



//connect to mongodb database
const uri =
  "mongodb+srv://user:AxulEa1T5bjyK8pl@cluster0.17o94mu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

//get room data from room-create address
app.post('/room-create', (req, res) => {
    const formData = req.body;
    CreateRoom(formData.roomName, formData.password, res);
});

//function to create room, will send the room details to database
async function CreateRoom(name, password, res) {
  try {
    await client.connect();
    const db = client.db("codeclash");
    const coll = db.collection("rooms");
    const doc = {roomName: name, password: password};
    //add the lobby details to the server
    const result = await coll.insertOne(doc);
    //store as json to send properly or somethign idk how this works properly tbh
    data = {result: result}
    res.json(data)
  } finally {
    await client.close();
  }
}

app.post('/room-data', (req, res) => {
    const formData = req.body;
    const id = formData.id;
    FindLobby(id, res)
})

async function FindLobby(id, res) {
  try {
    await client.connect();
    const db = client.db("codeclash");
    const coll = db.collection("rooms");
    const idObject = new mongoose.Types.ObjectId(id);
    const room = await coll.findOne(idObject);
    res.json(room);
  }
  finally {
    await client.close();
  }
}

app.post('/all-rooms', (req,res) => {
  GetAllLobbies(res)
})

async function GetAllLobbies(res) {
  try {
    await client.connect();
    const db = client.db("codeclash");
    const coll = db.collection("rooms");

    const allLobbies = await coll.find({}).toArray()
    console.log(allLobbies)
    const data = {lobbies: allLobbies}
    res.json(data);
  }
  finally {
    await client.close();
  }
}

app.get('/play/:roomID', (req,res) => {
  
  res.sendFile(path.join(__dirname, 'public', 'lobbyBanning.html'));
})