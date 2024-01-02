const express = require("express");
const cf = require("./services/cf");
const contentful = require("contentful");

const app = express();

// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Get request");
  res.send("Get request");
});

const booksRouter = require("./routes/books");
const authorsRouter = require("./routes/authors");

app.use("/books", booksRouter);
app.use("/authors", authorsRouter);

app.listen("3030");
