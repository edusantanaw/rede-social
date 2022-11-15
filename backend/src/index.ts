import express from "express";
import cors from 'cors'
import router from "./routes/router";

const app = express();

app.use(cors({credentials: true, origin: ""}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.use('/', router)
const Port = process.env.PORT || 5001;

app.listen(Port, (): void => {
  console.log(`Server is running on port:${Port}`);
});
