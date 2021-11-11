import Book from "../models/BookModel";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { IconButton } from "../../GlobalStyles";
import { useCallback } from "react";
import { useAppDispatch } from "../hooks/hooks";
import {
  clearBookToEdit,
  deleteBook,
  loadBooks,
  setBookToEdit,
} from "../store/bookSlice";
import {
  BookActionColumn,
  BookDataColumn,
  BookDataDiv,
  BookDataText,
} from "../styles/bookTile.style";

const BookTile: React.FC<{ data: Book }> = (props) => {
  const book = props.data;
  const dispatch = useAppDispatch();

  const removeButtonHandler = useCallback(
    async (event: any) => {
      event.preventDefault();
      await dispatch(deleteBook(props.data.id));
      await dispatch(loadBooks());
    },
    [dispatch, props.data.id]
  );

  const editButtonHandler = useCallback(
    async (event: any) => {
      event.preventDefault();
      dispatch(clearBookToEdit());

      dispatch(setBookToEdit(props.data));
    },
    [dispatch, props.data]
  );

  return (
    <BookDataDiv>
      <BookDataColumn>
        <BookDataText>
          Id:
          <span>{book.id}</span>
        </BookDataText>

        <BookDataText>
          Name:
          <span>{book.name}</span>
        </BookDataText>

        <BookDataText>
          Abstract:
          <span>{book.abstract}</span>
        </BookDataText>

        <BookDataText>
          Author:
          <span>{book.author}</span>
        </BookDataText>

        <BookDataText>
          ISBN:
          <span>{book.isbn}</span>
        </BookDataText>
      </BookDataColumn>

      <BookActionColumn>
        <IconButton isDeleteButton={true} onClick={removeButtonHandler}>
          Delete Book
          <FaTrashAlt />
        </IconButton>

        <IconButton onClick={editButtonHandler}>
          Edit Book
          <FaRegEdit />
        </IconButton>
      </BookActionColumn>
    </BookDataDiv>
  );
};

export default BookTile;
