import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import md5 from 'md5';
import '../styles/BrowseCharacters.css';

const BrowseCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);

                const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
                const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
                const ts = new Date().getTime().toString();
                const hash = md5(ts + privateKey + publicKey);

                let url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=50`;

                if (searchTerm) {
                    url += `&nameStartsWith=${searchTerm}`;
                }

                const response = await axios.get(url);
                setCharacters(response.data.data.results);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch characters. Please try again later.');
                setLoading(false);
                console.error('Error fetching characters:', error);
            }
        };

        fetchCharacters();
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (loading) return <div className="loading">Loading characters...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="browse-characters">
            <h2>Browse Marvel Characters</h2>

            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder='Search characters...'
                />
            </div>

            <div className="characters-grid">
                {characters.length > 0 ? (
                    characters.map(character => (
                        <Link
                            to={`/characters/${character.id}`}
                            key={character.id}
                            className="character-card"
                        >
                            <img
                                src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
                                alt={character.name}
                                className="character-image"
                            />
                            <h3 className="character-name">{character.name}</h3>
                        </Link>
                    ))
                ) : (
                    <div className="no-results">No characters found. Try another search term.</div>
                )}
            </div>
        </div>
    );
};

export default BrowseCharacters;