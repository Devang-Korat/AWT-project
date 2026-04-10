/* Navbar Background */
.employee-navbar {
  background: linear-gradient(135deg, #343a40, #495057);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* Brand */
.brand-logo {
  color: #ffc107 !important;
  letter-spacing: 1px;
  transition: 0.3s;
}

.brand-logo:hover {
  transform: scale(1.05);
}

/* Nav Links */
.nav-link {
  position: relative;
  color: white !important;
  margin-left: 15px;
  transition: all 0.3s ease;
}

/* Hover Effect */
.nav-link:hover {
  color: #ffc107 !important;
  transform: translateY(-2px);
}

/* Animated Underline */
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 2px;
  background-color: #ffc107;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Active Page Highlight */
.nav-link.active {
  color: #ffc107 !important;
  font-weight: bold;
}

.nav-link.active::after {
  width: 100%;
}

/* Logout Button Special Style */
.logout-btn {
  color: #ff6b6b !important;
}

.logout-btn:hover {
  color: #ff3b3b !important;
}