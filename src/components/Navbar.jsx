import { useState } from "react";
import { useNavigate, Link } from "react-router";
import "./Navbar.css";
import profile from "../assets/images/user.png";
export function Navbar() {
  const [input, setInput] = useState("");
  const [humbergerMenu, setHumbergerMenu] = useState(false);
  const navigate = useNavigate();
  function searchMovie() {
    navigate(`/search?query=${encodeURIComponent(input)}`);
    console.log(input);
  }
  return (
    <header>
      <nav>
        <div className="avatar-logo">
          <h1>STREAMFLIX</h1>
        </div>
        <div className="nav-links">
          <ul className={humbergerMenu ? "active" : ""}>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/tv`}>Tv Shows</Link>
            </li>
            <li>
              <Link to={`/genres`}>Geners</Link>
            </li>
          </ul>
        </div>
        <div className="right-section">
          <div className="search-box">
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              type="text"
              className="search-input"
              placeholder="search movie"
            />
            <button onClick={searchMovie}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div>
            <img src={profile} alt="" />
          </div>
          <div
            className="humberger-menu"
            onClick={() => {
              setHumbergerMenu((prev) => !prev);
            }}
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
