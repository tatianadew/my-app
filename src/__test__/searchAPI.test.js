import searchSong from "../api/services/spotify/searchSong";
import { server, rest } from "../mocks/searchAPI";

test("Successfully fetches data", async () => {
  let status = 0;
  const data = await searchSong(
    "https://api.spotify.com/v1/search",
    "tulus"
  ).then((response) => {
    status = response.status;
  });
  expect(status).toEqual(201);
});