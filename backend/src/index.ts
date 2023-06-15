import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

import { sample_foods, sample_users } from "./data";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(400).send("User name or password incorrect");
  }
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    "SomeRandommText",
    { expiresIn: "30d" }
  );

  user.token = token;
  return user;
};

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
