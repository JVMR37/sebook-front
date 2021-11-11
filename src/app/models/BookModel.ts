import Genre from "./GenreModel";

export interface IBook {
  id: number;
  genreId: number;
  genre?: Genre | string;
  name: string;
  abstract: string;
  author: string;
  isbn: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class Book implements IBook {
  public id: number;
  public genreId: number;
  public genre?: Genre;
  public name: string;
  public abstract: string;
  public author: string;
  public isbn: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: number,
    genreId: number,
    name: string,
    abstract: string,
    author: string,
    isbn: string,
    createdAt: Date,
    updatedAt: Date,
    genre?: Genre
  ) {
    this.id = id;
    this.genreId = genreId;
    this.genre = genre;
    this.name = name;
    this.abstract = abstract;
    this.author = author;
    this.isbn = isbn;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static fromJson(json: any): Book {
    const genre = json.genre ? Genre.fromJson(json.genre) : undefined;
    return new Book(
      json.id,
      json.genre_id,
      json.name,
      json.abstract,
      json.author,
      json.isbn,
      json.created_at,
      json.updated_at,
      genre
    );
  }

  public toJson(): Object {
    return {
      genreId: this.genreId,
      name: this.name,
      abstract: this.abstract,
      author: this.author,
      isbn: this.isbn,
    };
  }

  public toString(): string {
    return `\n
    id: ${this.id}\n
    genre: ${this.genre?.name}\n
    name: ${this.name}\n
    abstract: ${this.abstract}\n
    author: ${this.author}\n
    isbn: ${this.isbn}\n
    `;
  }

  getCreatedAt(): String {
    if (this.createdAt) {
      const dd = String(this.createdAt.getUTCDate()).padStart(2, "0");
      const mm = String(this.createdAt.getUTCMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = this.createdAt.getUTCFullYear();
      return `${dd}/${mm}/${yyyy}`;
    } else {
      return "No Date To Show.";
    }
  }
}

export type InputCreateBook = {
  genre: string;
  name: string;
  abstract: string;
  author: string;
  isbn: string;
};

export type InputUpdateBook = Partial<IBook> & {
  id: number;
};
