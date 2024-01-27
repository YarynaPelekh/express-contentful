export type InputBookType = {
  sys: { id: string };
  fields: {
    title: string;
    author: { id: string; fields: { firstName: string; lastName: string } };
    photo: { fields: { file: { url: string } } };
    genre: string;
  };
};

export type OutputBookType = {
  sys: { id: string };
  title: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  photo: { url: string };
  genre: string;
};

export type OutputAuthorType = {
  id: string;
  firstName: string;
  lastName: string;
};

export type InputAuthorType = {
  sys: { id: string };
  fields: { firstName: string; lastName: string };
};
