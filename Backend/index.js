const express= require("express");
const app = express();
const {connection}= require("./config/db");
require("dotenv").config();
const port= process.env.port || 4000;
const userRouter= require("./routes/user.route");
const cookieParser = require('cookie-parser')
const cors= require("cors");
app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use(userRouter);



app.get("/",(req,res)=>{
    res.send({msg:"Home Page",createdFor:"Mini Whatsapp"});
})


app.listen(port, async()=>{
    console.log(`App is runnning on port ${port}`);
try {
    await connection;
    console.log(`DB COnnected`)
} catch (error) {
   
    console.log(error)
}
})


