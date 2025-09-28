import express from "express";
import morgan from "morgan";
import {routes} from "./routes/main.router.js"

const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(morgan('tiny'));


app.listen(PORT, () => {
    console.log(`Server is running on port${PORT}`);

})
