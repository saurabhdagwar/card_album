import React from "react";

const CardPopup = (props) => {
  const { items, userId, itemClicked } = props;

  return (
    <div className="card-popup-container">
      {items.map((perItem, indx) => {
        return (
          <button
            className={`per-item-show  ${perItem.selected ? "selected-item" : ""}`}
            key={indx}
            onClick={(e) => {
              itemClicked(e, perItem.id, userId);
            }}
          >
            {perItem.title}
          </button>
        );
      })}
    </div>
  );
};

export default CardPopup;
