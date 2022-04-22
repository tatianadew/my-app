/* eslint-disable no-unused-vars */
import React, {useEffect} from "react";
import "../spotify/Spotify.css";
import axios from "axios";
import CardSong from "../../component/CardSong";

const BASE_URL = "https://api.spotify.com/v1";
const CLIENT_ID = "4992f788e96348279b8114b185ba76e3";
const REDIRECT_URI = "http://localhost:3000/callback/";
const SCOPE = "playlist-modify-private";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";


class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      savedToken: "",
      searchQuery: "",
      searchResult: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    console.warn("didMount");
    const access_token = new URLSearchParams(window.location.hash).get(
      "#access_token"
    );
    this.setState(
      {
        savedToken: access_token,
        isLoggedIn: true,
      },
      () => console.log(this.state.savedToken)
    );
  }

  handleChange(event) {
    this.setState({
      searchQuery: event.target.value,
    });
  }

  onSearch(event) {
    axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${this.state.savedToken}`,
        },
        params: {
          q: `${this.state.searchQuery}`,
          type: "track",
        },
      })
      .then((response) => {
        const data = response.data.tracks.items;
        console.log(data);
        this.setState({
          searchResult: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  }

  onSubmit(event) {
    const url = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=token&show_dialog=true`;
    window.location = url;
    event.preventDefault();
  }

  onClick(event) {
    this.setState({
      isLoggedIn: false,
      savedToken: "",
    });
    window.location.replace = "http://localhost:3000/";
  }

  render() {
    let element;
    if (this.state.isLoggedIn === true && this.state.savedToken != null) {
      element = (
        <form onSubmit={this.onSearch}>
          <input type="text" id="inpuText" onChange={this.handleChange} />
          <button type="submit" value="submit">
            Search
          </button>
          <button onClick={this.onClick}>Back to home</button>
          {this.state.searchResult.map((item, index) => (
            <CardSong
              url={item.album.images[0].url}
              albumName={item.album.name}
              artistName={item.artists[0].name}
              alt="Image not loaded"
              key={index}
            />
          ))}
        </form>
      );
    } else
      element = (
        <form onSubmit={this.onSubmit}>
          <p className="title">Click the button to Login</p>
          <button type="submit" value="submit">
            Submit
          </button>
        </form>
      );

    document.onkeydown = function () {
      if (window.event.keyCode === "13") {
        this.onSearch();
      }
    };
    return (
      <div className="spotify-track">
        {element}
        {/* {this.state.isLoggedIn ? (
          <form onSubmit={this.onSubmit}>
            <input type="text" id="inpuText" onChange={this.handleChange} />
            <button type="submit" value="submit">
              Search
            </button>
          </form>
        ) : (
          <form onSubmit={this.handleClick}>
            <p>Click the button </p>
            <button type="submit" value="submit">
              Submit
            </button>
          </form>
        )} */}
      </div>
    );
  }
}

export default Index;