import Book, { InputCreateBook, InputUpdateBook } from "../models/BookModel";
import ApiDatasource from "./apiDatasource";

export const fetchBooks = async (): Promise<Book[] | void> => {
  try {
    const response = await ApiDatasource.instance.Axios.get<Book[]>("/book");

    if (response.status !== 200) {
      throw response.data;
    }

    console.log(response.data);

    const books = response.data.map((book) => Book.fromJson(book));

    return books;
  } catch (error) {
    console.error(error);
    return void 0;
  }
};

export const createBook = async (
  book: InputCreateBook
): Promise<Book | void> => {
  try {
    const response = await ApiDatasource.instance.Axios.post<Book>(
      "/book",
      book
    );

    if (response.status !== 201) {
      throw response.data;
    }

    const books = Book.fromJson(response.data);

    return books;
  } catch (error) {
    console.error(error);
    return void 0;
  }
};

export const updateBook = async (
  book: InputUpdateBook
): Promise<Book | void> => {
  try {
    const bookId = book.id;
    const response = await ApiDatasource.instance.Axios.put<Book>(
      `/book/${bookId}`,
      book
    );

    if (response.status !== 200) {
      throw response.data;
    }

    const books = Book.fromJson(response.data);

    return books;
  } catch (error) {
    console.error(error);
    return void 0;
  }
};

export const deleteBook = async (bookId: number): Promise<Book | void> => {
  try {
    const response = await ApiDatasource.instance.Axios.delete<Book>(
      `/book/${bookId}`
    );

    if (response.status !== 200) {
      throw response.data;
    }

    const books = Book.fromJson(response.data);

    return books;
  } catch (error) {
    console.error(error);
    return void 0;
  }
};
