const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Charity = require("./models/Charity.schema");
const User = require("./models/User.schema");
require("dotenv").config();
const port = 3000;

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/charities", async (req, res) => {
  try {
    const { name, description, address, website } = req.body;

    const charity = new Charity({
      name,
      description,
      website,
    });

    await charity.save();

    res.status(201).json(charity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to add charity to database" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate name
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({ message: "Invalid name" });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check if user already exists in database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // TODO: Save user to database
    const user = new User({
      name,
      email,
      donations: 0,
    });

    await user
      .save()
      .then(res.status(201).json({ message: "User created successfully" }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to create user" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
