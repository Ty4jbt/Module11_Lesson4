import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Oops! The page you are looking for doesn&apos;t exist in this universe.</p>
                <Link to="/" className="home-button">Return to home</Link>
            </div>
        </div>
    );
};

export default NotFound;