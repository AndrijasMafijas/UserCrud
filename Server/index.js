const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "tajna123"; // U realnom slučaju koristi process.env

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "password123",
  },
];

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Dobijamo token iz Authorization header-a

  if (!token) {
    return res.status(401).json({ message: "Nema tokena, pristup odbijen!" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Nevažeći token" });
    }
    req.user = user; // Spremamo korisničke informacije za dalju upotrebu
    next(); // Nastavljamo sa obradom rute
  });
};

app.get("/users", authenticateToken, (req, res) => {
  //console.log("Trenutni users:", users);
  res.json(users);
});

app.post("/users", authenticateToken,(req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.status(204).send();
});

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });

  // Čuvaj postojeći passwordHash
  const existingUser = users[userIndex];
  users[userIndex] = {
    ...existingUser,
    name: name || existingUser.name,
    email: email || existingUser.email,
  };

  res.json(users[userIndex]);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  //console.log("Primljeno sa fronta:", req.body);
  //console.log("Korisnici:", users);

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Kreiranje tokena sa id i email
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
