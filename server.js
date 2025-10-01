import express from "express";
import morgan from "morgan";
// import {routes} from "./routes/main.router.js"
import "dotenv/config"
import PostRouter from "./routes/posts.router.js";


// import { postsController } from "./routes/main.router.js";

const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(morgan('tiny'));


// app.use("/users", userRoutes);
app.use("/posts", PostRouter);

app.use((req, res) => {
    const method = req.method;
    const url = req.url;
    res.send(`Cannot ${method}, ${url}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port${PORT}`);

})
