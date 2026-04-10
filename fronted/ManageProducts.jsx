import AdminNavbar from "../../components/navbar/AdminNavbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <AdminNavbar />
        <main className="container flex-grow-1 py-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default AdminLayout;