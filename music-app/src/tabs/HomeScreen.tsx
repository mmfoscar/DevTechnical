import React, { useState } from "react";
import "../styles/HomeScreen.css";
import { Artist, Album } from "../models";

export default function HomeScreen() {
    const [searchQuery, setSearchQuery] = useState("");
    const [artists, setArtists] = useState<Artist[]>([]);
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_KEY = "661239";
    const API_BASE = "https://www.theaudiodb.com/api/v1/json";

    const searchArtists = async (query: string) => {
        if (!query.trim()) {
            setArtists([]);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(
                `${API_BASE}/${API_KEY}/search.php?s=${encodeURIComponent(query)}`
            );
            const data = await response.json();
            setArtists(data.artists || []);
        } catch (err: any) {
            setError(err.message || "Failed to search artists");
            setArtists([]);
        } finally {
            setIsLoading(false);
        }
    };

    const loadArtistAlbums = async (artist: Artist) => {
        setSelectedArtist(artist);
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(
                `${API_BASE}/${API_KEY}/album.php?i=${artist.idArtist}`
            );
            const data = await response.json();
            setAlbums(data.album || []);
        } catch (err: any) {
            setError(err.message || "Failed to load albums");
            setAlbums([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        searchArtists(query);
    };

    const clearSelection = () => {
        setSelectedArtist(null);
        setAlbums([]);
    };

    if (selectedArtist) {
        return (
            <div className="home-screen">
                <button className="back-btn" onClick={clearSelection}>
                    ← Back
                </button>
                <h2>{selectedArtist.strArtist}</h2>
                {selectedArtist.strArtistThumb && (
                    <img src={selectedArtist.strArtistThumb} alt={selectedArtist.strArtist} className="artist-image" />
                )}
                <p className="artist-info">
                    {selectedArtist.strCountry && `Country: ${selectedArtist.strCountry}`}
                    {selectedArtist.intBornYear && ` • Born: ${selectedArtist.intBornYear}`}
                    {selectedArtist.strGenre && ` • Genre: ${selectedArtist.strGenre}`}
                </p>
                {selectedArtist.strBiography && (
                    <p className="biography">{selectedArtist.strBiography.substring(0, 300)}...</p>
                )}

                <h3>Albums ({albums.length})</h3>
                {isLoading ? (
                    <div className="loading">Loading albums...</div>
                ) : albums.length > 0 ? (
                    <div className="albums-grid">
                        {albums.map((album) => (
                            <div key={album.idAlbum} className="album-card">
                                <h4>{album.strAlbum}</h4>
                                {album.strReleaseDate && <p className="release-date">{album.strReleaseDate}</p>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No albums found.</p>
                )}
            </div>
        );
    }

    // Show search results view
    return (
        <div className="home-screen">
            <h1>🎵 Music Artist Search</h1>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search for an artist..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            {isLoading && <div className="loading">Searching...</div>}

            {artists.length > 0 ? (
                <div className="artists-list">
                    {artists.map((artist) => (
                        <div
                            key={artist.idArtist}
                            className="artist-card"
                            onClick={() => loadArtistAlbums(artist)}
                        >
                            {artist.strArtistThumb && (
                                <img src={artist.strArtistThumb} alt={artist.strArtist} />
                            )}
                            <h3>{artist.strArtist}</h3>
                            {artist.strCountry && <p className="country">{artist.strCountry}</p>}
                            {artist.strGenre && <p className="genre">{artist.strGenre}</p>}
                        </div>
                    ))}
                </div>
            ) : (
                searchQuery && !isLoading && <p className="no-results">No artists found. Try another search.</p>
            )}
        </div>
    );
}
