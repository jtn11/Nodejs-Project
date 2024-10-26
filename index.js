const express = require("express");
const app = express();
const PORT = 8000;
const UserModel = require("./models/User");
const bcrypt = require("bcrypt");
const methodOverride = require('method-override');


app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // This should come after the body-parser middlewares




app.get("/", async (req, res) => {
    const user = await UserModel.findOne();
    res.render("Home" , {user});
});

// show Users in database

app.get("/Users", async(req,res)=>{
    const user = await UserModel.find(); 
    res.json(user)
});


app.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        return res.status(500).send("User already Registered");
    }

    bcrypt.genSalt(6, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            await UserModel.create({
                name,
                email,
                password: hash,
            });
            res.send("Registered");
        });
    });
});


// Handle delete request


app.post("/delete", async (req, res) => {
    const { name, email } = req.body;
    console.log(`Attempting to delete user with Name: ${name}, Email: ${email}`);

    const userDetail = await UserModel.findOneAndDelete({ name, email });

    if (userDetail) {
        res.send("User Deleted successfully");
    } else {
        res.send("User Not Found");
    }
});


// update User 

app.get("/Update", async(req,res)=>{
    res.render("Update")
});

app.post("/update" , async(req,res)=>{
    const {email,newName} = req.body;

    const UpdatedUser = await UserModel.findOneAndUpdate(
        {email} , 
        {name : newName},
        {new : true}
    )
    if (UpdatedUser) {
        res.send("User name updated successfully");
    } else {
        res.send("User not found");
    }
})


app.listen(PORT, () => console.log(`Server Connected at PORT ${PORT}`));
