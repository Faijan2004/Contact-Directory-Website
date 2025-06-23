const express = require("express");
const userroute = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/user.model");

// Register route

userroute.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobile,userid } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword, mobile, userid });
    await newUser.save();
    res.send("Registration Successful");
  } catch (err) {
    res.send("Registration Failed" + err);
  }
});


// Login route
userroute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
    {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPass_Match = await bcrypt.compare(password, user.password);
    if (!isPass_Match)
    {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.error("Error:" + error);
    res.status(500).json({ message: "Login Failed" });
  }
});

// Show User Data 
userroute.get('/show/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log("Error:" + err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// User update
userroute.put('/update',async(req,res)=> {
  try {
    const { email, name, password, mobile, userid } = req.body;

    // hash the password if its being updated
    let UpdateField = { email, name, mobile , userid};
    if (password)
    {
      const hashedPassword = await bcrypt.hash(password, 12);
      UpdateField.password = hashedPassword;
    }

    const updateUser = await User.findOneAndUpdate({email},{UpdateField})
    if (updateUser)
    {
      return res.status(200).json({message:"User Updated...Successfully"})
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err)
  {
    res.status(500).json({message:"Updated Failed", error: err.message})
  }
})

// User Delete
userroute.delete("/delete", async (req, res) => {
  try {
    const email = req.query.email || req.body.email;
    console.log(email + "Want to delete");
    const DeleteUser = await User.findOneAndDelete({ email });
    if (DeleteUser) {
      res.send("Account Delete Successfull");
    } else {
      res.send("Account Delete is Unsuccessful ");
    }
  } catch (error) {
    console.log(error);
    res.send("Failed to Delete Account" + error);
  }
});

module.exports = userroute;
