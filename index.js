const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//database connectivity
connection_str ="mongodb+srv://sadhana0303:hemlata17@cluster0.yge56.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(connection_str, {useNewUrlParser: true,useUnifiedTopology: true,});
mongoose.connection.on("error",console.error.bind(console, "error in db connection"));
mongoose.connection.once("open", () => {console.log("connected to database server");});

//feedback schema
const feedbackSchema = new mongoose.Schema({
  name:String,
  feedback:String
});

//model
let Feedback = new mongoose.model("feedbacks", feedbackSchema)

//Insert feed into dataBase
app.post('/createuser', async(req,res)=>{

  let name = req.body.name;
  let feedback = req.body.feedback;

  let newfeed = new Feedback({name: name, feedback: feedback});
  let result = await newfeed.save();
  console.log(result);
  if(result!==''){
    res.send({data:result})
  }else{
    res.send({"error": 'no'})
  }
  // res.send('dxcfghujfghdfhdhdfhfi');
})

//Accessing feeds from dataBase
app.get("/getAllFeeds", async (req, res) => {
  let allfeed = await Feedback.find();
  console.log(allfeed);
  if(allfeed!==[]){
    res.status(200).send(allfeed)
  }else{
    res.status(400).send({error:"mujhe ni pata"})
  }
});

// Connection to server
app.listen(process.env.PORT || 3000, () => {
  console.log("Connected to server at https://localhost:3000");
});