import { response, rest } from "msw";
import { setupServer } from "msw/node";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/auth-slice";

//Login terlebih dahulu untuk test server
// const accessToken = useSelector(selectToken);

const server = setupServer(
  rest.get("https://api.spotify.com/v1/search", (req, res, ctx) => {
    const { q, type } = req.params;
    return res(ctx.status(201));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());