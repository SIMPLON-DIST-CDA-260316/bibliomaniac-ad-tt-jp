import { Route, Routes } from "react-router";
import Homepage from "../pages/Homepage";
import Layout from "../shared/ui/layout";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Layout>
  );
}
