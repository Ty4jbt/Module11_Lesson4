import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import md5 from "md5";
import "../styles/CharacterDetails.css";

const CharacterDetails = () => {
    const { characterId } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comics, setComics] = useState([]);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                setLoading(true);

                const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
                const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
                const ts = new Date().getTime().toString();
                const hash = md5(ts + privateKey + publicKey);

                const characterResponse = await axios.get(
                    `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
                );

                const comicsResponse = await axios.get(
                    `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=10`
                );

                setCharacter(characterResponse.data.data.results[0]);
                setComics(comicsResponse.data.data.results);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch character details. Please try again later.");
                setLoading(false);
                console.error("Error fetching character details:", error);
            }
        };

        fetchCharacterDetails();
    }, [characterId]);

    if (loading) return <div className="loading">Loading character details...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!character) return <div className="not-found">Character not found</div>;

    return (
        <div className="character-details">
            <Link to="/characters" className="back-button">Back to Characters</Link>

            <div className="character-header">
                <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    className="character-detail-image"
                />
                <div className="character-info">
                    <h2>{character.name}</h2>
                    <p className="character-description">
                        {character.description ? character.description : "No description available"}
                    </p>
                </div>
            </div>

            <div className="character-comics">
                <h3>Comic Appearences</h3>
                {comics.length > 0 ? (
                    <div className="comics-grid">
                        {comics.map(comic => (
                            <div key={comic.id} className="comic-card">
                                <img
                                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                    alt={comic.title}
                                    className="comic-image"
                                />
                                <h4 className="comic-title">{comic.title}</h4>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No comics found for this character.</p>
                )}
            </div>
        </div>
    );
};

export default CharacterDetails;