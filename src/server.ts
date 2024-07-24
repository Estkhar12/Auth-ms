import express from "express";
import connectDB from "./config/database"
import { connectRabbitMQ } from "./services/rabbitmq"
import authRoute from "./modules/Auth/routes/authRoutes"
import dotenv from "dotenv"
dotenv.config();


const app= express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use("/api/v1", authRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on ${port}...`)
})

connectRabbitMQ();