import EmployeeNavbar from "../../components/navbar/EmployeeNavbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

function EmployeeLayout() {
  return (

     <div className="d-flex flex-column min-vh-100">

      <EmployeeNavbar />

      <main className="container flex-grow-1 py-4">
        <Outlet />
      </main>

      <Footer />
</div>
  );
}

export default EmployeeLayout;