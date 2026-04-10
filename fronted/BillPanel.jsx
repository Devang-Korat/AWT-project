import { Routes, Route } from "react-router-dom";

import EmployeeDashboard from "./pages/employee/EmpDashboard";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import EmployeeLayout from "./layout/Employee_layout/EmployeeLayout";
import Customers from "./pages/employee/Customer";
import Products from "./pages/employee/Products";
import Billing from "./pages/employee/Billing";
import BillingCustomerForm from "./components/BillingCustomerForm";
import EmployeeExpense from "./pages/employee/AddExpense";
import EmployeeSummary from "./pages/employee/DailySummary";
import Account from "./pages/auth/Account";
import AdminLayout from "./layout/Admin_layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import AddProductForm from "./pages/admin/AddProductForm";
import AddCategory from "./pages/admin/AddCategory";
import ManageCustomer from "./pages/admin/ManageCustomer"
import ManageEmployees from "./pages/admin/ManageEmployees";
import ViewBills from "./pages/admin/ViewBills";
import BillDetails from "./pages/admin/BillDetails";
import ManageExpenes from "./pages/admin/ManageExpenes";
import StockManagement from "./pages/admin/StockManagement";
import ForgotPassword from "./pages/auth/ForgotPassword";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

 
      <Route path="/employee" element={<EmployeeLayout />}>
        <Route path="EmpDashboard" element={<EmployeeDashboard />} />
        <Route path="Customer" element={<Customers />} />
        <Route path="Products" element={<Products />} />
        <Route path="/employee/Billing" element={<Billing />} />
        <Route path="/employee/BillingCustomerForm" element={<BillingCustomerForm />} />
        <Route path="/employee/AddExpense" element={<EmployeeExpense/>} />
        <Route path="/employee/DailySummary" element={<EmployeeSummary />} />
        <Route path="Account" element={<Account />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="ManageProducts" element={<ManageProducts />} />
        <Route path="AddProductForm" element={<AddProductForm />} />
        <Route path="AddCategory" element={<AddCategory />} />
        <Route path="ManageCustomer" element={<ManageCustomer />} />
        <Route path="ManageEmployees" element={<ManageEmployees />} />
        <Route path="ViewBills" element={<ViewBills />} />
        <Route path="/admin/BillDetails/:id" element={<BillDetails />} />
        <Route path="ManageExpenes" element={<ManageExpenes />} />
        <Route path="StockManagement" element={<StockManagement />} />
         <Route path="Account" element={<Account />} />
      </Route>

    </Routes>
  );
}

export default App;