import React from "react";
import "./CardSong.css";

type Parameter = {
  url: string;
  alt: string;
  artistName: string;
  albumName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isSelected: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  nameOfButton: string;
};

function CardSong(props: Parameter) {
  return (
    <div className="Card">
      <img src={props.url} alt={props.alt} />
      <div className="text-component">
        <p className="album">{props.albumName}</p>
        <p>{props.artistName}</p>
      </div>
      <div className="button-component">
        <button
          className="buttonSelect"
          type="button"
          onClick={() => props.onClick(props.isSelected)}
        >
          {props.nameOfButton}
        </button>
      </div>
    </div>
  );
}

export default CardSong;