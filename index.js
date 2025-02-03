import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();
env.config();
const port = process.env.PORT;

const fashionJSON = process.env.fashionJSON;

const fashion = JSON.parse(fashionJSON);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let outfitOptions = ""

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/fashion", (req, res) => {
  let outfit = "";

  let choice = req.body.choice;
  switch (choice) {
    case "trad":
      outfit = fashion[0];
      break;

    case "casual":
      outfit = fashion[1];
      break;

    case "corporate":
      outfit = fashion[2];
      break;

    default:
      res.send("The input is invalid");
      console.log("The provided input is invalid");
      break;
  }

  res.render("index.ejs", { outfitOption: outfit })
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});