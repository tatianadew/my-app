import axios from "axios";

type search = {
  tracks: {
    items: Array<Object>
  };
};

const searchSong = async (
  url: string,
  searchQuery: string,
  accessToken: string
) => {
  let data;
  try {
    const result = await axios.get<search>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: `${searchQuery}`,
        type: "track",
      },
    });
    data = result;
    console.log("data", data);
  } catch (error) {
    console.log(error);
  }
  console.log("at api", data);
  return data;
};

export default searchSong;