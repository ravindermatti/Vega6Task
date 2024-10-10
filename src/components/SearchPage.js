import React, { useState } from "react";
import axios from "axios";
import "./SearchPage.css";

const API_KEY = "46437695-f4a734fce9cbb74ab9938bd8b"; 

const SearchPage = ({ onSelectImage }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    if (!searchQuery) return;
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      setImages(response.data.hits);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Error fetching images. Please try again.");
    }
  };

  return (
    <div className="search-page">
      <div className="heading">Image Search & Caption Tool</div>
      <div className="user-info">
        <h3> NAME : Ravinder Singh</h3>
        <h3> EMAIL: ravindermatti123@gmail.com</h3>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={fetchImages}>Search</button>
      </div>
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-card">
            <img src={image.previewURL} alt={image.tags} />
            <button onClick={() => onSelectImage(image.largeImageURL)}>
              Add Caption
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
