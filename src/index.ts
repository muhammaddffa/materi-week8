import express from "express";
import dotenv from "dotenv";
import registerRouter from "./routes/registerRoutes";
import loginRouter from "./routes/loginRoutes";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({message: "Api is working"});
});

app.use("/auth/register", registerRouter)
app.use("/auth/login", loginRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
