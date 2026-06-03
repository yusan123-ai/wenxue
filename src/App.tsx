import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import WorksList from "@/pages/WorksList";
import WorkDetail from "@/pages/WorkDetail";
import AdminPage from "@/pages/AdminPage";
import { WorksProvider } from "@/context/WorksContext";

export default function App() {
  return (
    <WorksProvider>
      <Router basename="/wenxue">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="works" element={<WorksList />} />
            <Route path="works/:category" element={<WorksList />} />
            <Route path="work/:id" element={<WorkDetail />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </WorksProvider>
  );
}
