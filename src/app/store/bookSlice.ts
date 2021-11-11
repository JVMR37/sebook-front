import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import {
  fetchBooks,
  createBook as createBookAPI,
  deleteBook as deleteBookAPI,
  updateBook as updateBookAPI,
} from "../datasource/bookDatasource";
import Book, { InputCreateBook, InputUpdateBook } from "../models/BookModel";

export enum BookLoadStatus {
  IDLE,
  LOADING,
  LOADED,
  ERROR,
}

export enum BookActionStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

export interface BookState {
  books: Array<Book>;
  status: BookLoadStatus;
  actionStatus: BookActionStatus;
  bookToEdit?: Book;
}

const initialState: BookState = {
  books: [],
  status: BookLoadStatus.IDLE,
  actionStatus: BookActionStatus.IDLE,
};

export const updateBookActionStatusAfterTime = createAsyncThunk<
  BookActionStatus,
  BookActionStatus
>(
  "book/updateActionStatus",
  async (newStatus: BookActionStatus = BookActionStatus.IDLE) =>
    new Promise<BookActionStatus>((resolve) => {
      setTimeout(() => resolve(newStatus), 2000);
    }).then((value) => value)
);

export const loadBooks = createAsyncThunk<Book[], void, {}>(
  "book/loadBooks",
  async (_, thunkApi) => {
    const books = await fetchBooks();

    if (!books) {
      return thunkApi.rejectWithValue("Não foi possível carregar os livros !");
    }

    return books;
  }
);

export const createBook = createAsyncThunk<Book, InputCreateBook, {}>(
  "book/createBook",
  async (book, thunkApi) => {
    const books = await createBookAPI(book);

    if (!books) {
      return thunkApi.rejectWithValue("Não foi possível criar o livro !");
    }

    return books;
  }
);

export const updateBook = createAsyncThunk<Book, InputUpdateBook, {}>(
  "book/updateBook",
  async (book, thunkApi) => {
    const books = await updateBookAPI(book);

    if (!books) {
      return thunkApi.rejectWithValue("Não foi possível criar o livro !");
    }

    return books;
  }
);

export const deleteBook = createAsyncThunk<Book, number, {}>(
  "book/deleteBook",
  async (bookId, thunkApi) => {
    const books = await deleteBookAPI(bookId);

    if (!books) {
      return thunkApi.rejectWithValue("Não foi possível criar o livro !");
    }

    return books;
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBookToEdit: (state, action: PayloadAction<Book>) => {
      state.bookToEdit = action.payload;
    },

    clearBookToEdit: (state) => {
      state.bookToEdit = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      updateBookActionStatusAfterTime.fulfilled,
      (state, action) => {
        state.actionStatus = action.payload;
      }
    );

    builder.addCase(loadBooks.pending, (state) => {
      state.status = BookLoadStatus.LOADING;
    });

    builder.addCase(loadBooks.rejected, (state) => {
      state.status = BookLoadStatus.ERROR;
    });

    builder.addCase(loadBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.status = BookLoadStatus.LOADED;
    });

    builder.addCase(createBook.pending, (state) => {
      state.actionStatus = BookActionStatus.LOADING;
    });

    builder.addCase(createBook.rejected, (state) => {
      state.actionStatus = BookActionStatus.ERROR;
    });

    builder.addCase(createBook.fulfilled, (state, action) => {
      state.actionStatus = BookActionStatus.SUCCESS;
    });

    builder.addCase(updateBook.pending, (state) => {
      state.actionStatus = BookActionStatus.LOADING;
    });

    builder.addCase(updateBook.rejected, (state) => {
      state.actionStatus = BookActionStatus.ERROR;
    });

    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.actionStatus = BookActionStatus.SUCCESS;
    });

    // builder.addCase(deleteBook.pending, (state) => {
    //   state.actionStatus = BookActionStatus.LOADING;
    // });

    // builder.addCase(deleteBook.rejected, (state) => {
    //   state.actionStatus = BookActionStatus.ERROR;
    // });

    // builder.addCase(deleteBook.fulfilled, (state, action) => {
    //   state.actionStatus = BookActionStatus.SUCCESS;
    // });
  },
});

export const { clearBookToEdit, setBookToEdit } = bookSlice.actions;

export const selectBook = (state: RootState) => state.book.books;
export const selectBookLoadStatus = (state: RootState) => state.book.status;
export const selectBookActionStatus = (state: RootState) =>
  state.book.actionStatus;

export const selectBookToEditValue = (state: RootState) =>
  state.book.bookToEdit;

export default bookSlice.reducer;
