import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import $ from "jquery";
import CardPopup from "./CardPopup";
const albumUrl = "https://jsonplaceholder.typicode.com/albums";

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [displaySerched, setDisplaySerched] = useState([]);
  useEffect(() => {
    getAlbumData();
  }, []);

  useEffect(() => {
    let copuAlbum = albums;
    let searchedData = [];
    copuAlbum.map((data) => {
      data.items.map((dta) => {
        if (dta.title.includes(searchInput)) {
          searchedData.push(dta);
        }
      });
    });
    setDisplaySerched(searchedData);
    // console.log("print input",searchedData)
  }, [searchInput]);

  const getAlbumData = async () => {
    const albumData = await axios.get(albumUrl);
    const objectData = await convertIntoAlbumObject(albumData.data);
    setAlbums(objectData);
    console.log("Check Data", objectData);
  };

  const convertIntoAlbumObject = (data) => {
    const separateObjects = {};
    data.forEach((dataItem) => {
      const item = { ...dataItem, selected: false };
      const userId = item.userId;

      if (!separateObjects[userId]) {
        separateObjects[userId] = {
          userId: userId,
          items: [],
          selected: false,
          itemCount: 0,
        };
      }
      separateObjects[userId].items.push(item);
      separateObjects[userId].selected = false;
      separateObjects[userId].itemCount = separateObjects[userId].items.length;
    });

    return Object.values(separateObjects);
  };

  $(window).click(function () {
    let copuAlbum = albums;
    let albm = copuAlbum.map((card) => {
      return { ...card, selected: false };
    });
    setAlbums(albm);
  });

  const clickOnCard = (e, uId) => {
    e.stopPropagation();
    let copuAlbum = albums;
    let albm = copuAlbum.map((card) => {
      if (card.userId == uId) {
        return { ...card, selected: true };
      } else {
        return { ...card, selected: false };
      }
    });
    setAlbums(albm);
  };

  const itemClicked = (event, id, uId) => {
    event.stopPropagation();
    let copuAlbum = albums;
    let albm = copuAlbum.map((card) => {
      let count = card.itemCount;
      let currentItem = card.items.map((perItem) => {
        if (perItem.id == id && !perItem.selected) {
          count = card.itemCount - 1;
          return { ...perItem, selected: true };
        } else {
          return perItem;
        }
      });
      if (card.userId == uId) {
        return { ...card, itemCount: count, items: currentItem };
      } else {
        return card;
      }
    });
    setAlbums(albm);
  };

  return (
    <div className="album-main">
      <header className="header-display">
        <div className="logo-disp" />
        <input
          className="search-input"
          role="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search"
        />
      </header>
      <main>
        {searchInput == "" ?
          <div className="cards-display">
            {albums.map((card, index) => {
              const cardItemLength = card.itemCount;
              const getUserId = card.userId;
              return (
                <button
                  className={"each-card"}
                  key={index}
                  onClick={(e) => {
                    clickOnCard(e, getUserId);
                  }}
                >
                  <div className="item-count">{cardItemLength}</div>
                  <div className="userId-disp">{getUserId}</div>
                  {card.selected ? (
                    <CardPopup
                      items={card.items}
                      userId={getUserId}
                      itemClicked={itemClicked}
                    />
                  ) : (
                    <></>
                  )}
                </button>
              );
            })}
          </div> : 
          <div className="searched-field">
                {displaySerched.map((data, index) => {
                    return (
                        <div className="each-item" key={index}>
                            {data.title}
                        </div>
                    )
                })}
          </div>
        }{" "}
      </main>
    </div>
  );
};

export default Album;
