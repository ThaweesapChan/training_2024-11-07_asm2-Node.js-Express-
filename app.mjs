import express from "express";

const app = express();
const port = 4000;
app.get("/profiles", (req, res) => {
  return res.status(200).json({
    data: {
      name: "john",
      age: 20,
    },
  });
});

app.listen(port, () => {
  console.log(`running ar ${port}`);
});
