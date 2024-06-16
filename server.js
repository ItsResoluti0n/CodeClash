const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)
const { v4: uuidV4 } = require("uuid")
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser')

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json({limit: "200mb"}));

//initial page to display
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

server.listen(3000)

//connect to mongodb database
const uri =
  "mongodb+srv://dylan:Digglet_1805@cluster0.17o94mu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

//get room data from room-create address
app.post('/room-create', function(req, res) {
    const formData = req.body;
    CreateRoom(formData.roomName, formData.password);
});

//function to create room, will send the room details to database
async function CreateRoom(name, password) {
  try {
    await client.connect();
    const db = client.db("codeclash");
    const coll = db.collection("rooms");
    const docs = [
        {roomName: name, password: password}
      ];
    const result = await coll.insertMany(docs);
  } finally {
    await client.close();
  }
}

