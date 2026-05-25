export default function Navbar() {
  return (
    <nav>
      <div className="nav-logo">
        <img src="/images/logo.png" alt="Happybara Café" />
        Happybara Café
      </div>
      <ul className="nav-links">
        <li><a href="#menu">Menu</a></li>
        <li><a href="#order">Order</a></li>
        <li><a href="#qr">Visit Us</a></li>
        <li><a href="#hours">Hours</a></li>
      </ul>
    </nav>
  )
}
