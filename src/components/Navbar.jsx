import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-logo">
        ~/<span>hana</span>
      </Link>
      <ul className="nav-links">
        <li><Link to="/">cd home</Link></li>
        <li><Link to="/about">cd about</Link></li>
        <li><Link to="/skills">cd skills</Link></li>
        <li><Link to="/projects">cd projects</Link></li>
        <li><Link to="/contact">cd contact</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar