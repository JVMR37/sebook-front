import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { useMountEffect } from "../hooks/use-mount-effect";
import {
  BookLoadStatus,
  loadBooks,
  selectBook,
  selectBookLoadStatus,
} from "../store/bookSlice";
import { BookListStyled } from "../styles/bookListStyle.style";
import BookTile from "./BookTile";
import LoadStatusMessage from "./LoadStatusMessageComponent";

const BookListCard: React.FC = () => {
  const books = useAppSelector(selectBook);
  const bookLoadStatus = useAppSelector(selectBookLoadStatus);

  const content = useCallback(() => {
    switch (bookLoadStatus) {
      case BookLoadStatus.LOADING:
        return (
          <LoadStatusMessage key="Loading Message" status={bookLoadStatus}>
            Loading...
          </LoadStatusMessage>
        );
      case BookLoadStatus.ERROR:
        return (
          <LoadStatusMessage key="Error Message" status={bookLoadStatus}>
            Failed to create : (
          </LoadStatusMessage>
        );
      case BookLoadStatus.LOADED:
      case BookLoadStatus.IDLE:
      default:
        return books.map((book) => <BookTile key={book.id} data={book} />);
    }
  }, [bookLoadStatus, books])();

  const dispatch = useAppDispatch();

  useMountEffect(() => {
    dispatch(loadBooks());
  });

  return <BookListStyled>{content}</BookListStyled>;
};

export default BookListCard;
