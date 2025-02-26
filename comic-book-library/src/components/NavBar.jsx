import { Link, NavLink } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <h1>Marvel Comic Library</h1>
                </Link>

                <nav className="navbar-menu">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/characters"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                Characters
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/comics"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                Comics
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default NavBar;