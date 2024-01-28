import express, { Request, Response } from "express";
import { InputBookType, OutputBookType } from "./../types";

const cf = require("../services/cf");
const router = express.Router();
const stringify = require("json-stringify-safe");

router.get("/", (req: Request, res: Response) => {
  cf.api
    .getEntries({ content_type: "book" })
    .then((response: { total: number; items: InputBookType[] }) => {
      let books: OutputBookType[] = [];
      if (response.total > 0) {
        books = formatBooks_(response.items);
      }
      res.send(books);
    })
    .catch(console.error);
});

router.get("/book", (req, res) => {
  cf.api
    .getEntry("3NexSc6JX30wOyeRQdnKhi")
    .then((entry: object) => {
      res.send(stringify(entry));
    })
    .catch((err: Error) => console.log(err));
});

router.get("/:id", (req, res) => {
  cf.api
    .getEntry(req.params.id)
    .then((entry: object) => {
      console.log("id -", req.params.id, entry, typeof entry);
      res.send(stringify(entry));
    })
    .catch((err: Error) => console.log(err));
});

function formatBooks_(books: InputBookType[]) {
  const result: OutputBookType[] = [];
  books.forEach((element) => {
    result.push(formatBook_(element));
  });
  return result;
}

function formatBook_(book: InputBookType): OutputBookType {
  return {
    sys: { id: book.sys.id },
    title: book.fields.title,
    author: {
      id: book.sys.id,
      firstName: book.fields.author && book.fields.author.fields.firstName,
      lastName: book.fields.author && book.fields.author.fields.lastName,
    },
    photo: {
      url: book.fields.photo && (book.fields.photo.fields.file?.url as string),
    },
    genre: book.fields.genre,
  };
}

module.exports = router;
