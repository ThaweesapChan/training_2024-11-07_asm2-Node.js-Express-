import express from "express";
import { pool } from "./utills/db.mjs";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/profiles", (req, res) => {
  return res.status(200).json({
    data: {
      name: "john",
      age: 20,
    },
  });
});

app.get("/posts", async (req, res) => {
  const postId = req.params.postId;
  try {
    const result = await pool.query(`select * from posts`);
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read posts due to database connection",
      error: error.message,
    });
  }
});

app.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const result = await pool.query(`select * from posts where id=$1`, [
      postId,
    ]);
    if (!result.rows[0]) {
      return res
        .status(404)
        .json({ message: `Server could not find a requested posts` });
    }
    return res.status(201).json({ data: result.rows[0] });
  } catch (e) {
    res.status(500).json({
      message: `Server could not read post because database connection`,
    });
  }
});

app.post("/posts", async (req, res) => {
  const newPost = { ...req.body, date: new Date() };
  console.log(req.body);

  // ตรวจสอบว่า 'image' มีค่าหรือไม่
  if (!newPost.image) {
    return res
      .status(400)
      .json({ message: "'image' is required and cannot be null" });
  }

  try {
    await pool.query(
      `insert into posts (image, category_id, title, description, date, content, status_id, likes_count) 
       values ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        newPost.image,
        newPost.category_id,
        newPost.title,
        newPost.description,
        newPost.date,
        newPost.content,
        newPost.status_id,
        newPost.likes_count,
      ]
    );
    return res.status(201).json({ message: `Created post successfully` });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
});

app.listen(port, () => {
  console.log(`running ar ${port}`);
});

/**return res
      .status(404)
      .json({ message: `Server could not find a requested post` }); */
