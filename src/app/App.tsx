import { Route, Routes } from "react-router";
import BookDetails from "../pages/BookDetails";
import Homepage from "../pages/Homepage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/books/:id" element={<BookDetails />} />
    </Routes>
  );
}
