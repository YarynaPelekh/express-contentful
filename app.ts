// const express = require("express");
import express, { Request, Response } from "express";
const cf = require("./services/cf");
const contentful = require("contentful");
const cors = require("cors");

const app = express();

// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  console.log("Get request  (with TS)");
  res.send("Get request (with TS)");
});

const booksRouter = require("./routes/books");
const authorsRouter = require("./routes/authors");

app.use("/books", booksRouter);
app.use("/authors", authorsRouter);

app.listen("3009");
