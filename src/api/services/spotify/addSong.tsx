import axios from "axios";

type Data = {
  status: number,
  data: {
    snapshot_id: string
  }
}

const addSongPlaylist = async (
  url: string,
  id: string | undefined,
  selected: Array<string>,
  accessToken: string
) => {
  let data;
  try {
    const add = await axios.post<Data>(
      `${url}/playlists/${id}/tracks`,
      {
        uris: selected,
        position: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    data = add;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export default addSongPlaylist;