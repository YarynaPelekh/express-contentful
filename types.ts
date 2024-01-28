import { IBookFields, IPersonaFields } from "./@types/generated/contentful";

export type InputBookType = {
  sys: { id: string };
  fields: IBookFields;
};

export type OutputBookType = {
  sys: { id: string };
  title?: string;
  author: {
    id: string;
    firstName?: string;
    lastName?: string;
  };
  photo: { url?: string };
  genre?: string;
};

export type OutputAuthorType = {
  id: string;
  firstName?: string;
  lastName?: string;
};

export type InputAuthorType = {
  sys: { id: string };
  fields: IPersonaFields;
};
