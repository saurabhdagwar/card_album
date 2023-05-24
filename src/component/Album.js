import React, { useEffect } from "react";
import axios from "axios";
import "./style.scss";
const albumUrl = "https://jsonplaceholder.typicode.com/albums";

const Album = () => {
  const [albums, setAlbums] = React.useState([]);
  useEffect(() => {
    getAlbumData();
  }, []);

  const getAlbumData = async () => {
    const albumData = await axios.get(albumUrl);
    const objectData = await convertIntoAlbumObject(albumData.data);
    setAlbums(objectData);
    console.log("Check Data", objectData);
  };

  const convertIntoAlbumObject = (data) => {
    const separateArrays = [];
    data.forEach((item) => {
      const userId = item.userId;
      const existingArray = separateArrays.find(
        (arr) => arr[0] && arr[0].userId === userId
      );

      if (existingArray) {
        existingArray.push(item);
      } else {
        separateArrays.push([item]);
      }
    });

    return separateArrays;
  };
  return (
    <div className="album-main">
      <header className="header-display"></header>
      <main className="cards-display">
        {
            albums.map((card, index) => {
                const cardItemLength = card.length;
                const getUserId = card[0].userId;
                return (
                    <button className="each-card" key={index}>
                        <div className="item-count">{cardItemLength}</div>
                        <div className="userId-disp">{getUserId}</div>
                    </button>
                )
            })
        }
      </main>
    </div>
  );
};

export default Album;
