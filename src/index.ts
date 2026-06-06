import express from "express";
const app = express();
const port = 3000;

app.use(express.static("public"));

// fake database
const flowers = [
  { id: 1, name: "Rose", color: "Red" },
  { id: 2, name: "Tulip", color: "Yellow" },
  { id: 3, name: "Daisy", color: "White" },
];

app.get("/api/flowers", (req, res) => {
  res.json(flowers);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
