const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("Public"));

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function connectDB(){
    await client.connect();
    db = client.db("QuizHub");
    console.log("MongoDB connected");
}
connectDB();


// CREATE QUIZ
app.post("/createQuiz", async (req,res)=>{
    const quiz = req.body;

    console.log("Quiz received:", quiz);

    await db.collection("Quizzes").insertOne(quiz);

    res.json({message:"Quiz created"});
});


// GET ALL QUIZZES
app.get("/quizzes", async (req,res)=>{

    const quizzes = await db.collection("Quizzes").find().toArray();

    res.json(quizzes);

});


// SUBMIT RESULT
app.post("/submitResult", async (req,res)=>{

    const result = req.body;

    console.log("Result received:", result);

    await db.collection("Results").insertOne(result);

    res.json({message:"Result saved"});
});


// GET RESULTS
app.get("/results", async (req,res)=>{

    const results = await db.collection("Results").find().toArray();

    res.json(results);

});

// STUDENT LOGIN
app.post("/studentLogin", async (req,res)=>{

    const student = req.body;

    console.log("Student login:", student);

    await db.collection("students").insertOne(student);

    res.json({message:"Student saved"});
});

// FACULTY LOGIN
app.post("/facultyLogin", async (req,res)=>{

    const faculty = req.body;

    console.log("Faculty login:", faculty);

    await db.collection("faculty").insertOne(faculty);

    res.json({message:"Faculty saved"});
});

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});