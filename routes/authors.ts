import express, { Request, Response } from "express";
import { InputAuthorType, OutputAuthorType } from "../types";

const cf = require("../services/cf");
const router = express.Router();

router.get("/", (req, res) => {
  cf.api
    .getEntries({ content_type: "persona", limit: 4 })
    .then((response: { total: number; items: InputAuthorType[] }) => {
      let authors: OutputAuthorType[] = [];
      if (response.total > 0) {
        authors = formatAuthors_(response.items);
      }
      res.send(authors);
    })
    .catch(console.error);
});

router.get("/author", (req, res) => {
  cf.api
    .getEntry("1k4vJ3mdEBnBx5U6JDpIFb")
    .then((entry: InputAuthorType) => {
      return entry;
    })
    .then((entry: InputAuthorType) => {
      res.send(entry);
    })
    .catch((err: Error) => console.log(err));
});

router.get("/:id", (req, res) => {
  cf.api
    .getEntry(req.params.id)
    .then((entry: InputAuthorType) => {
      res.send(entry);
    })
    .catch((err: Error) => console.log(err));
});

function formatAuthors_(authors: InputAuthorType[]) {
  const result: OutputAuthorType[] = [];
  authors.forEach((element: InputAuthorType) => {
    result.push({
      id: element.sys.id,
      firstName: element.fields.firstName,
      lastName: element.fields.lastName,
    });
  });

  return result;
}

module.exports = router;
