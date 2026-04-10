import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row">

          {/* Company Info */}
          <div className="col-md-3 mb-4">
            <h5 className="text-secondary">Shop Manager</h5>
            <p className="small">
              Complete shop management system for handling products,
              employees, billing, and inventory efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h5 className="text-secondary">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link className="text-light text-decoration-none" to="/">Home</Link></li>
              <li><Link className="text-light text-decoration-none" to="/about">About</Link></li>
              <li><Link className="text-light text-decoration-none" to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Dashboard Links */}
          <div className="col-md-3 mb-4">
            <h5 className="text-secondary">Portal</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-light text-decoration-none" to="/admin/dashboard">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link className="text-light text-decoration-none" to="/employee/home">
                  Employee Panel
                </Link>
              </li>
              <li>
                <Link className="text-light text-decoration-none" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4">
            <h5 className="text-secondary">Contact Us</h5>
            <p className="small mb-1">📍 Rajkot, Gujarat, India</p>
            <p className="small mb-1">📞 +91 98765 43210</p>
            <p className="small mb-1">✉ support@shopmanager.com</p>

            {/* Social Icons */}
            <div className="mt-2">
              <i className="bi bi-facebook me-3"></i>
              <i className="bi bi-instagram me-3"></i>
              <i className="bi bi-linkedin"></i>
            </div>
          </div>

        </div>

        <hr className="border-secondary" />

        {/* Bottom Footer */}
        <div className="text-center text-secondary small">
          © {new Date().getFullYear()} Shop Manager System | All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;