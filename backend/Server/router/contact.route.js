const express = require("express");
const contactroute = express.Router();
const Contact = require("../model/contact.model");

contactroute.post("/savecontact", async (req, res) => {
  try {
    const { name, phone, email, altPhone, userid } = req.body;
    const newContact = new Contact({ name, phone, email, userid, altPhone });
    await newContact.save();
    res.send("Contact Successfully Saved");
  } catch (err) {
    console.log(err);
  }
});

contactroute.get("/showcontactlist/:userid", async (req, res) => {
  try {
    const Contacts = await Contact.find({ userid: req.params.userid });
    res.send(Contacts);
    res.end();
  } catch (err) {
    console.log(err);
  }
});

contactroute.post("/findcontact", async (req, res) => {
  try {
    let userid = req.body.userid;
    let name = req.body.name;
    const findContact = await Contact.findOne({
      $and: [{ userid: userid }, { name: name }],
    });
    res.send(findContact);
    res.end();
  } catch (err) {
    console.log(err);
  }
});

contactroute.put("/updatecontact", async (req, res) => {
  try {
    const { email, name, phone, altPhone, userid } = req.body;

    const UpdateContact = await Contact.findOneAndUpdate(
      { $and: [{ userid: userid }, { name: name }] },
      { email, phone, altPhone },
      { new: true }
    );
    if (UpdateContact) {
      res.send("Contact Updated Successfully");
    } else {
      res.send("Contact Not Found");
    }
  } catch (error) {
    console.log(error);
  }
});



contactroute.delete("/deletecontact/:userid/:name", async (req, res) => {
  try {
    const { userid, name } = req.params;
    const deletedContact = await Contact.findOneAndDelete({
      $and: [{ userid: userid }, { name: name }],
    });
    if (deletedContact) {
      res.send("Contact Deleted Successfully");
    } else {
      res.send("Contact Not Found");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = contactroute;
