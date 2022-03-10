import React, { useCallback } from "react";
import axios from "axios";

export const SearchImages = ({ setPhotos }) => {
  //   const [searchText, setSearchText] = useState("");

  const debounce = (fun, d) => {
    let timer;
    return function (...args) {
      let context = this;
      console.log(context);
      args = arguments;
      console.log(args);
      clearTimeout(timer);
      timer = setTimeout(() => {
        fun.apply(context, args);
      }, d);
    };
  };

  function fetchSearchImages(event) {
    const { value } = event.target;
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=01974d37b105336833a49ed15abecc2e&text=${value}&format=json&nojsoncallback=1`
      )
      .then((res) => {
        console.log(res);
        let picArray = res.data.photos.photo.map((ph) => {
          var srcPath = `https://live.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}.jpg`;
          // var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
          // console.log(srcPath);
          return srcPath;
        });
        setPhotos(picArray);
      });
  }

  //useCallback provides us the memoized callback
  const optimizedVersion = useCallback(debounce(fetchSearchImages, 300), []);

  return (
    <div>
      Search{" "}
      <input
        type="text"
        onChange={optimizedVersion}
        placeholder="Enter Something..."
      />
    </div>
  );
};
