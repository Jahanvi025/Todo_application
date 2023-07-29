import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const date = new Date();

const options = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
};


const day = date.toLocaleString('en-IN', options);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));


let items = [];
app.get("/",(req,res) =>{
    res.render("index.ejs");
});

app.get("/instruction", (req, res) =>{
    res.render("instruction.ejs");
});


app.post("/todaytask",(req,res) =>{
    const {newItem} = req.body;
    
    if (newItem) {
        items.push(newItem);
      }
    res.redirect("/today");
    
});
app.get("/today",(req, res) =>{
    res.render("today.ejs",{
        Today: day,
        items,
    });
});



let works = [];



app.post("/todaywork",(req,res) =>{
    const {newItem} = req.body;
    if (newItem) {
        works.push(newItem);
      }
      res.redirect("/work")
     
});
app.get("/work",(req, res) =>{
    res.render("work.ejs",{
        works,
    });
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});