import axios from "axios";

type Data = {
  display_name: string;
  external_urls: Object;
  followers: Object;
  href: string;
  id: string;
  images: Array<Object>;
  type: string;
  uri: string;
};

const getUserId = async (url: string, accessToken: string) => {
  let data;
  try {
    const user = await axios.get<Data>(`${url}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    data = user.data;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export default getUserId;