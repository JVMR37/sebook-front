import { useCallback } from "react";
import { FlatButton, StyledForm } from "../../GlobalStyles";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import useInput from "../hooks/use-input";
import { useMountEffect } from "../hooks/use-mount-effect";
import { InputField } from "../layout/Input";
import { InputMultiLineField } from "../layout/InputMultiLine";
import {
  BookActionStatus,
  selectBookActionStatus,
  createBook,
  updateBook,
  updateBookActionStatusAfterTime,
  selectBookToEditValue,
  loadBooks,
} from "../store/bookSlice";
import AnimatedDivStyled from "../styles/animatedDiv.style";
import ErrotInputTextStyled from "../styles/errorInputText.style";
import { RegisterCardStyledDiv } from "../styles/registerCard.style";
import { isNotEmptyValidator } from "../utils/validators";
import ActionStatusMessage from "./ActionStatusMessageComponent";

const BookCard: React.FC = () => {
  const bookToEdit = useAppSelector(selectBookToEditValue);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
    setValue: setNameValue,
  } = useInput(isNotEmptyValidator);

  const {
    value: genreValue,
    isValid: genreIsValid,
    hasError: genreHasError,
    valueChangeHandler: genreChangeHandler,
    inputBlurHandler: genreBlurHandler,
    reset: resetGenre,
    setValue: setGenre,
  } = useInput(isNotEmptyValidator);

  const {
    value: abstractValue,
    isValid: abstractIsValid,
    hasError: abstractHasError,
    valueChangeHandler: abstractChangeHandler,
    inputBlurHandler: abstractBlurHandler,
    reset: resetAbstract,
    setValue: setAbstract,
  } = useInput(isNotEmptyValidator);

  const {
    value: authorValue,
    isValid: authorIsValid,
    hasError: authorHasError,
    valueChangeHandler: authorChangeHandler,
    inputBlurHandler: authorBlurHandler,
    reset: resetAuthor,
    setValue: setAuthor,
  } = useInput(isNotEmptyValidator);

  const {
    value: isbnValue,
    isValid: isbnIsValid,
    hasError: isbnHasError,
    valueChangeHandler: isbnChangeHandler,
    inputBlurHandler: isbnBlurHandler,
    reset: resetIsbn,
    setValue: setIsbn,
  } = useInput(isNotEmptyValidator);

  const dispatch = useAppDispatch();
  const actionStatus = useAppSelector(selectBookActionStatus);
  const formIsValid =
    nameIsValid &&
    genreIsValid &&
    abstractIsValid &&
    authorIsValid &&
    isbnIsValid;

  useMountEffect(() => {
    if (bookToEdit) {
      setNameValue(bookToEdit.name);
      setGenre(bookToEdit.genreId.toString());
      setAbstract(bookToEdit.abstract);
      setAuthor(bookToEdit.author);
      setIsbn(bookToEdit.isbn);
    }
  });

  const content = useCallback(() => {
    switch (actionStatus) {
      case BookActionStatus.LOADING:
        return (
          <ActionStatusMessage key="Loading Message" status={actionStatus}>
            Loading...
          </ActionStatusMessage>
        );
      case BookActionStatus.ERROR:
        return (
          <ActionStatusMessage key="Error Message" status={actionStatus}>
            Failed to {bookToEdit ? "Updated" : "Created"} : (
          </ActionStatusMessage>
        );
      case BookActionStatus.SUCCESS:
        return (
          <ActionStatusMessage key="Success Message" status={actionStatus}>
            Successfully {bookToEdit ? "Updated" : "Created"} : )
          </ActionStatusMessage>
        );
      case BookActionStatus.IDLE:
      default:
        return (
          <FlatButton isPrimary disabled={!formIsValid}>
            {bookToEdit ? "Update" : "Create"} Book
          </FlatButton>
        );
    }
  }, [actionStatus, formIsValid, bookToEdit])();

  const submitHandler = async (event: any) => {
    event.preventDefault();

    const result = bookToEdit
      ? await dispatch(
          updateBook({
            id: bookToEdit.id,
            name: nameValue,
            genre: genreValue,
            abstract: abstractValue,
            author: authorValue,
            isbn: isbnValue,
          })
        )
      : await dispatch(
          createBook({
            name: nameValue,
            genre: genreValue,
            abstract: abstractValue,
            author: authorValue,
            isbn: isbnValue,
          })
        );

    dispatch(updateBookActionStatusAfterTime(BookActionStatus.IDLE));

    if (result.meta.requestStatus === "fulfilled") {
      setTimeout(() => {
        dispatch(loadBooks());
        resetName();
        resetGenre();
        resetAbstract();
        resetAuthor();
        resetIsbn();
      }, 2000);
    }

    console.log("Submitted!");
  };

  return (
    <RegisterCardStyledDiv>
      <StyledForm onSubmit={submitHandler}>
        <InputField
          key="name-input"
          type="text"
          value={nameValue}
          hasError={nameHasError}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          placeholder="Name"
        />

        {nameHasError && (
          <ErrotInputTextStyled>
            Please enter a valid name.
          </ErrotInputTextStyled>
        )}

        <InputField
          key="genre-input"
          type="text"
          value={genreValue}
          hasError={genreHasError}
          onChange={genreChangeHandler}
          onBlur={genreBlurHandler}
          placeholder="Genre"
        />

        {genreHasError && (
          <ErrotInputTextStyled>
            Please enter a valid genre.
          </ErrotInputTextStyled>
        )}

        <InputMultiLineField
          key="abstract-input"
          value={abstractValue}
          hasError={abstractHasError}
          onChange={abstractChangeHandler}
          onBlur={abstractBlurHandler}
          placeholder="Abstract"
        />

        {abstractHasError && (
          <ErrotInputTextStyled>
            Please enter a valid abstract.
          </ErrotInputTextStyled>
        )}

        <InputField
          key="author-input"
          type="text"
          value={authorValue}
          hasError={authorHasError}
          onChange={authorChangeHandler}
          onBlur={authorBlurHandler}
          placeholder="Author"
        />

        {authorHasError && (
          <ErrotInputTextStyled>
            Please enter a valid author.
          </ErrotInputTextStyled>
        )}

        <InputField
          key="isbn-input"
          type="text"
          value={isbnValue}
          hasError={isbnHasError}
          onChange={isbnChangeHandler}
          onBlur={isbnBlurHandler}
          placeholder="ISBN"
        />

        {isbnHasError && (
          <ErrotInputTextStyled>
            Please enter a valid ISBN.
          </ErrotInputTextStyled>
        )}

        <AnimatedDivStyled>{content}</AnimatedDivStyled>
      </StyledForm>
    </RegisterCardStyledDiv>
  );
};

export default BookCard;
