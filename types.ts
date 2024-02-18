import { IBookFields, IPersonaFields } from "./@types/generated/contentful";

export type InputBookType = {
  sys: { id: string };
  fields: IBookFields;
};

export type OutputBookType = {
  sys: { id: string };
  title?: string;
  author: OutputAuthorType;
  photo: { url?: string };
  genre?: string;
};

export type OutputAuthorType = {
  id: string;
  firstName?: string;
  lastName?: string;
  pseudonym?: string;
};

export type InputAuthorType = {
  sys: { id: string };
  fields: IPersonaFields;
};
