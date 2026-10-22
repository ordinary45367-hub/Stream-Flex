import { useState } from "react";
import { useNavigate, Link } from "react-router";
import "./Navbar.css";

export function Navbar() {
  const [input, setInput] = useState("");
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const navigate = useNavigate();

  function handleSearch(e) {
    e?.preventDefault();
    if (input.trim()) {
      navigate(`/search?query=${encodeURIComponent(input)}`);
      setHamburgerMenu(false); // Close mobile menu on search
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        {/* Logo */}
        <div className="avatar-logo">
          <Link to="/">
            <h1>STREAMFLIX</h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <ul className={hamburgerMenu ? "active" : ""}>
            <li>
              <Link to="/" onClick={() => setHamburgerMenu(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/tv" onClick={() => setHamburgerMenu(false)}>
                TV Shows
              </Link>
            </li>
            <li>
              <Link to="/genres" onClick={() => setHamburgerMenu(false)}>
                Genres
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section: Search & Hamburger */}
        <div className="right-section">
          <div className="search-box">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              className="search-input"
              placeholder="Search movies..."
            />
            <button onClick={handleSearch} aria-label="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div
            className={`hamburger-menu ${hamburgerMenu ? "open" : ""}`}
            onClick={() => setHamburgerMenu((prev) => !prev)}
            aria-label="Toggle Navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
}
