import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/auth-slice";
import searchSong from "../api/services/spotify/searchSong";

export default function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Object | undefined>([]);
  const [dataSlice, setDataSlice] = useState<Object | undefined>([]);
  const url = "https://api.spotify.com/v1/search";
  const accessToken = useSelector(selectToken);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(accessToken);
    if (accessToken !== "") {
      searchSong(url, searchQuery, accessToken)
        .then(response => {
            setSearchResult(response?.data.tracks.items);
            setDataSlice(response?.data.tracks.items);
        });
      console.log("data slice = ", dataSlice);
    } else {
      alert("Login first");
    }
    event.preventDefault();
  };

  return {
    searchResult,
    dataSlice,
    handleChange,
    onSearch,
  };
}