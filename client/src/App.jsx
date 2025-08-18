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
function App() {
  const userInfo = {
    role: "admin",
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProjectDashboard />}>
          <Route path="" element={<MainLayout />}>
            <Route path="" element={<Navigate to="/dashboard/admin" />} />

            <Route path="" element={<ProtectRolo role="admin" />}>
              <Route path="admin" element={<AdminIndex />} />
              <Route path="writer/add" element={<AddWriter />} />
              <Route path="writers" element={<Writers />} />
            </Route>

            <Route path="" element={<ProtectRolo role="writer" />}>
              <Route path="writer" element={<WriterIndex />} />
              <Route path="news/create" element={<CreatedNews />} />
              <Route path="news/edit/:news_id" element={<EditNews />} />
            </Route>

            <Route path="news" element={<News />} />
            <Route path="profile" element={<Profile />} />
            <Route path="access-unable" element={<UnableToAccess />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
