/* eslint-disable no-unused-vars */
import "./Spotify.css";
import React, { useEffect, useState } from "react";
import useSearch from "../../hooks/useSearch";
import SearchForm from "../../component/searchForm/SearchForm";
import CardSong from "../../component/cardSong/CardSong";
import PlaylistForm from "../../component/playlistForm/playlistForm";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import { useDispatch } from "react-redux";
import { addToken } from "../../redux/auth-slice";

function Spotify() {
  const { searchResult, handleChange, onSearch, dataSlice } = useSearch();
  
  
  const { 
    handlePlaylist,
    handleForm,
    handleNotSelected,
    handleSelected,
    isLoggedOut,
    isSelected,
  } = useCreatePlaylist();

  const [pageNumber, setPageNumber] = useState(0);

  const dataPerPage = 10;
  const pageVisited = pageNumber * dataPerPage;
  const displayData = dataSlice
    .slice(pageVisited, pageVisited + dataPerPage)
    .map((item) => (
      <CardSong
        url={item.album.images[0].url}
        albumName={item.album.name}
        artistName={item.artists[0].name}
        alt="Image not loaded"
        key={item.uri}
        isSelected={isSelected.includes(item.uri)}
        onClick={(isSelect) =>
          isSelect ? handleSelected(item.uri) : handleNotSelected(item.uri)
        }
        nameOfButton={isSelected.includes(item.uri) ? "Deselect" : "Select"}
      />
    ));
  const pageCount = Math.ceil(dataSlice.length / dataPerPage);
  const onChangePagination = (event, value) => {
    setPageNumber(value - 1);
  };

  const getToken = new URLSearchParams(window.location.hash).get(
    "#access_token"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addToken(getToken));
  }, []);


  return (
    <div className="container">
      <div className="header">
      <SearchForm onSearch={onSearch} handleChange={handleChange} />
          <button type="submit" onClick={isLoggedOut}>
            Logout
            </button>
      </div>
      {/* <div className="formAndView"> */}
        <div className="create-playlist">
        <p className="createTitle">Create Playlist</p>
          <PlaylistForm
            onCreate={handlePlaylist}
            handleChangeTitle={handleForm}
            handleChangeDesc={handleForm}
          />
        </div>
      {/* </div> */}
      <div className="spotify-track">
        <p className="searchTitle"></p>
        {searchResult.length === 0 ? (
          <p className="emptyResult"></p>
        ) : (
          <div className="searchResult">
          <div className="pagination">
            <Pagination
              color="primary"
              variant="text"
              count={pageCount}
              onChange={onChangePagination}
              showFirstButton
              showLastButton
            />{" "}
          </div>
          <div className="listOf-track">{displayData}</div>
        </div>
  )}
  </div>
  </div>
  );
}

export default Spotify;