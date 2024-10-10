import React, { useState } from "react";
import "./App.css";
import SearchPage from "./components/SearchPage";
import EditorPage from "./components/EditorPage";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="App">
      {selectedImage ? (
        <EditorPage
          imageUrl={selectedImage}
          onBack={() => setSelectedImage(null)}
        />
      ) : (
        <SearchPage onSelectImage={setSelectedImage} />
      )}
    </div>
  );
}

export default App;
