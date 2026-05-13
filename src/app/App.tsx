import { Route, Routes } from "react-router";
import BookDetails from "../pages/BookDetails";
import Homepage from "../pages/Homepage";
import Layout from "../shared/ui/Layout";
import BookListPage from "../pages/BookListPage";
import LibraryPage from "../pages/LibraryPage";
import SearchPage from "../pages/SearchPage";
import { ReservationProvider } from "../features/reservation";

export default function App() {
  return (
    <ReservationProvider>
      <Layout>
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/category/:category" element={<BookListPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
      </Layout>
    </ReservationProvider>
  );
}
