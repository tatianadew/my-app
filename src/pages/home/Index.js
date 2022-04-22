/* eslint-disable no-unused-vars */
import "./Home.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToken } from "../../redux/auth-slice";
import tapeImage from "../../assets/home/tape.png";

function Home() {
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = "4992f788e96348279b8114b185ba76e3";
  const REDIRECT_URI = "http://localhost:3000/create-playlist";
  const SCOPE = "playlist-modify-private";
  const AUTH_URL = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=token&show_dialog=true`;
 const dispatch = useDispatch();

  const isAuth = () => {
    window.location = AUTH_URL;
    localStorage.setItem("isLoggedIn", true);
  };

    return (
      <div className="Home">
        <div className="centerImage">
        <img className="tapeImage" src={tapeImage}/>
      </div>
      <div className="content">
      <div className="title-ofContent">
          <p className="titleHome">SPOTIFY</p>
          <p className="titleHomeChild">The best song</p>
          <p className="titleDescription">Listening to your favourite musics <br/> Enjoy <br/> and have fun :D</p>
        </div>
        <button className="buttonLogin" type="submit" onClick={isAuth}>
          Click here to login
        </button>
      </div>
      <div className="footer">
        <p className="watermark">
        </p>
      </div>
</div>
    );
}

export default Home;