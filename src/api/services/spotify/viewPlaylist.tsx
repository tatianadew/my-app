import axios from "axios";

const viewPlaylist = async (url: string, id: string, accessToken: string) => {
  let data;
  try {
    const view = await axios.get(`${url}/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    data = view.data;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export default viewPlaylist;