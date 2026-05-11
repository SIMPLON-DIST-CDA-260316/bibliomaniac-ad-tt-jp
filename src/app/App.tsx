import { Route, Routes } from "react-router";
import BookDetails from "../pages/BookDetails";
import Homepage from "../pages/Homepage";
import Layout from "../shared/ui/Layout";
import LibraryPage from "../pages/LibraryPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </Layout>
  );
}
