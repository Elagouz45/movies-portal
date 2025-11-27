import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "..", "db.json"));
const middlewares = jsonServer.defaults();

server.db = router.db;

// Middlewares
server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

/**
 * -------------------------------------
 * OVERRIDE DEFAULT /login FROM AUTH
 * -------------------------------------
 */
server.post("/login", (req, res, next) => {

  const originalSend = res.send;

  res.send = function (body) {
    try {
      const data = JSON.parse(body);

      // json-server-auth returns: accessToken + user
      // We add refreshToken in the SAME style
      data.refreshToken = "refresh_" + Date.now();

      return originalSend.call(this, JSON.stringify(data));
    } catch (e) {
      return originalSend.call(this, body);
    }
  };

  next();
});

/**
 * -------------------------------------
 * AUTH HANDLERS FROM JSON-SERVER-AUTH
 * -------------------------------------
 */
server.use(auth);

/**
 * -------------------------------------
 * CUSTOM REFRESH TOKEN ENDPOINT
 * -------------------------------------
 */
server.post("/refresh", (req, res) => {
  res.json({
    accessToken: "new_access_" + Date.now(),
    refreshToken: "new_refresh_" + Date.now()
  });
});

/**
 * -------------------------------------
 * NORMAL JSON SERVER ROUTES
 * -------------------------------------
 */
server.use(router);

server.listen(3000, () => {
  console.log("Mock Auth Server running at http://localhost:3000");
});
