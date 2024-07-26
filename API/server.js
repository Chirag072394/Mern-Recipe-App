import express from 'express'
import mongoose from "mongoose"
import bodyParser from 'express'
import userRouter from './Routes/user.js'
import recipeRouter from './Routes/recipe.js'
import cors from 'cors'

const app = express();
app.use(bodyParser.json())

app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true

}))
//user Router
app.use('/api',userRouter)
//recipe Router
app.use('/api',recipeRouter)


mongoose.connect("mongodb+srv://chirag7pandey:K6qX0etXDDYvR28x@cluster0.qjaehpz.mongodb.net/",
    {dbName:"MERN_RECIPE"},
).then(()=>console.log("MOngoDB is connected..!")).catch((err)=>console.log(err.message));


const port = 3000;

app.listen(port,()=>console.log(`server is running on port ${port}`))


//username- chirag7pandey
//password - K6qX0etXDDYvR28x


