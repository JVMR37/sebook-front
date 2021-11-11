import "./App.css";
import BookCard from "./app/components/BookCard";
import BookListCard from "./app/components/BookListCard";
import { useAppSelector } from "./app/hooks/hooks";
import MainLayout from "./app/layout/MainLayout";
import { selectBookToEditValue } from "./app/store/bookSlice";

function App() {
  const bookToEdit = useAppSelector(selectBookToEditValue);

  return (
    <MainLayout>
      <BookListCard />
      <BookCard key={bookToEdit ? bookToEdit.toString() : ""} />
    </MainLayout>
  );
}

export default App;
