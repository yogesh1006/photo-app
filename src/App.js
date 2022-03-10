import "./App.css";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { SearchImages } from "./components/SearchImages";

function App() {
  const [photos, setPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  function fetchImages() {
    axios
      .get(
        "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=01974d37b105336833a49ed15abecc2e&per_page=10&page=2&format=json&nojsoncallback=1"
      )
      .then(function (res) {
        console.log(res);
        let picArray = res.data.photos.photo.map((ph) => {
          var srcPath = `https://live.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}.jpg`;

          return srcPath;
        });
        setPhotos(picArray);
      });
  }

  const handleShowDialog = () => {
    setIsOpen(!isOpen);
    console.log("cliked");
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1
          className="App-title"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Welcome to React
        </h1>
        <SearchImages setPhotos={setPhotos} />
      </header>{" "}
      <InfiniteScroll
        dataLength={photos.length}
        next={fetchImages}
        hasMore={true}
        loader={
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            Loading...
          </h3>
        }
      >
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {photos.map((pic, index) => {
            return (
              <>
                {isOpen ? (
                  <dialog
                    className="dialog"
                    style={{ position: "absolute" }}
                    open
                    onClick={handleShowDialog}
                  >
                    <img
                      key={index}
                      className="image"
                      src={pic}
                      onClick={handleShowDialog}
                      alt="noimage"
                    />
                  </dialog>
                ) : (
                  <img
                    key={index}
                    src={pic}
                    alt="php"
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      height: "300px",
                      objectFit: "cover",
                    }}
                    onClick={handleShowDialog}
                  ></img>
                )}
              </>
            );
          })}
        </section>
      </InfiniteScroll>
    </div>
  );
}

export default App;
