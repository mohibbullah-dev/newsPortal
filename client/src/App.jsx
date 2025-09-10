import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import MainLayout from "./dashboard/layouts/MainLayout";
import AdminIndex from "./dashboard/pages/AdminIndex";
import ProjectDashboard from "./middleware/ProjectDashboard";
import Login from "./dashboard/pages/Login";
import ProtectRolo from "./middleware/ProtectRolo";
import UnableToAccess from "./dashboard/pages/UnableToAccess";
import AddWriter from "./dashboard/pages/AddWriter";
import Writers from "./dashboard/pages/Writers";
import News from "./dashboard/pages/News";
import Profile from "./dashboard/pages/Profile";
import WriterIndex from "./dashboard/pages/WriterIndex";
import CreatedNews from "./dashboard/pages/CreatedNews";
import EditNews from "./dashboard/pages/EditNews";
import SingleNews from "./dashboard/pages/SingleNews";
import EditWriter from "./dashboard/pages/EditWriter";
import { useContext } from "react";
import { storeContext } from "./context/storeContext";
function App() {
  const { store } = useContext(storeContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProjectDashboard />}>
          <Route path="" element={<MainLayout />}>
            {/* <Route path="" element={<Navigate to="/dashboard/" />} /> */}

            {store.userInfo?.role === "admin" ? (
              <Route path="" element={<Navigate to="/dashboard/admin" />} />
            ) : (
              <Route path="" element={<Navigate to="/dashboard/writer" />} />
            )}

            <Route path="" element={<ProtectRolo />}>
              <Route path="admin" element={<AdminIndex />} />
              <Route path="writer/add" element={<AddWriter />} />
              <Route path="writers" element={<Writers />} />
              <Route path="writer/edit/:writer_id" element={<EditWriter />} />
              <Route path="writer/delete/:writer_id" element={<Writers />} />
            </Route>

            <Route path="" element={<ProtectRolo />}>
              <Route path="writer" element={<WriterIndex />} />
              <Route path="news/create" element={<CreatedNews />} />
              <Route path="news/edit/:news_id" element={<EditNews />} />
              <Route path="news/delete/:news_id" element={<News />} />
            </Route>

            <Route path="news" element={<News />} />
            <Route path="profile" element={<Profile />} />
            <Route path="news/news-single/:news_id" element={<SingleNews />} />
            <Route path="access-unable" element={<UnableToAccess />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
