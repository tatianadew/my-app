import addSongPlaylist from "../api/services/spotify/addSong";
import createPlaylist from "../api/services/spotify/createPlaylist";
import getUserId from "../api/services/spotify/user";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/auth-slice";

type NewPlaylist = {
  title: string;
  description: string;
  viewPlaylist: Array<string>;
};

export default function useCreatePlaylist() {
  const BASE_URL = "https://api.spotify.com/v1";
  const [isSelected, setIsSelected] = useState<Array<string>>([]);
  const [newPlaylist, setNewPlaylist] = useState<NewPlaylist>({
    title: "",
    description: "",
    viewPlaylist: [],
  });
  const accessToken = useSelector(selectToken);

  let userId: string | undefined = "";
  let playlistId: string | undefined = "";
  let responseCreate: number | undefined = 0;

  const handleSelected = (uri: string) => {
    setIsSelected((oldArray) => oldArray.filter((id) => id !== uri));
    console.log(`Present id = ${isSelected}`);
  };

  const handleNotSelected = (uri: string) => {
    setIsSelected((oldArray) => [...oldArray, uri]);
    console.log(`Present id = ${isSelected}`);
  };

  const handleForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPlaylist({ ...newPlaylist, [name]: value });
  };

  const handlePlaylist = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (accessToken === null) {
      // eslint-disable-next-line no-alert
      alert("Login first");
    } else if (isSelected.length === 0) {
      alert("Select song first");
    } else {
      await getUserId(BASE_URL, accessToken).then((response) => {
        console.log(response?.id);
        userId = response?.id;
        console.log("getUserid = ", userId);
      });
      console.log("create playlist");
      await createPlaylist(
        BASE_URL,
        userId,
        newPlaylist.title,
        newPlaylist.description,
        accessToken
      ).then((response => {
        console.log(response)
        playlistId = response?.id;
      }))
      await addSongPlaylist(BASE_URL, playlistId, isSelected, accessToken)
      .then((response => {
        responseCreate = response?.status;
      }));
      console.log(responseCreate);
      if (responseCreate === 201) {
        alert("Playlist Created");
      }
    }
  };

  // const handleView = (event:ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   newPlaylistId = check.playlistId.replace("spotify:playlist:", "");
  // };

  const isLoggedOut = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "http://localhost:3000/";
  };

  return {
    handlePlaylist,
    handleForm,
    handleNotSelected,
    handleSelected,
    isLoggedOut,
    newPlaylist,
    isSelected,
  };
}