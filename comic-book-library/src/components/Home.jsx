import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    return (
    <div className="home-container">
        <div className="hero-section">
            <div className="hero-content">
                <h1>Welcome to the Marvel Comic Book Library</h1>
                <p>Explore the vast universe of Marvel characters and comics.</p>
                <div className="home-content">
                    <div className="feature-cards">
                        <div className="feature-card">
                            <h3>Characters</h3>
                            <p>Discover information about your favorite Marvel superheroes and villains.</p>
                            <Link to="/characters" className="feature-button">Browse Characters</Link>
                        </div>
                
                        <div className="feature-card">
                            <h3>Comics</h3>
                            <p>Explore Marvel&apos;s extensive collection of comic books.</p>
                            <Link to="/comics" className="feature-button">View Comics</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  );
};

export default Home;