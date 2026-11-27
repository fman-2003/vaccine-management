// API tests: start the real server against a throwaway MongoDB and call it over HTTP.
//
//   MONGODB_URI=mongodb://127.0.0.1:27017/vaccine_test npm test
//
// MONGODB_URI must be set and point at a local database. server.js loads
// backend/.env, which would otherwise fill it in with the real database, and
// these tests create users.
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const path = require("node:path");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI || !/^mongodb:\/\/(localhost|127\.0\.0\.1)[:/]/.test(MONGODB_URI)) {
  console.error(
    "Refusing to run: set MONGODB_URI to a local test database, e.g. mongodb://127.0.0.1:27017/vaccine_test",
  );
  process.exit(1);
}

const PORT = process.env.TEST_PORT || "3999";
const BASE = `http://127.0.0.1:${PORT}/api`;
const ORIGIN = "http://localhost:5173";
let server;
let serverLog = "";

before(async () => {
  server = spawn(process.execPath, ["server.js"], {
    cwd: path.join(__dirname, ".."),
    env: {
      ...process.env,
      PORT,
      MONGODB_URI,
      CLIENT_URL: ORIGIN,
      JWT_SECRET: "test-secret",
      JWT_EXPIRES_IN: "1h",
      NODE_ENV: "test",
    },
  });
  server.stdout.on("data", (d) => (serverLog += d));
  server.stderr.on("data", (d) => (serverLog += d));

  // server.js only listens once MongoDB is connected, and exits if it can't connect.
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Server did not start:\n${serverLog}`)), 30000);
    server.on("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`Server exited with code ${code}:\n${serverLog}`));
    });
    server.stdout.on("data", () => {
      if (serverLog.includes("Server running on port")) {
        clearTimeout(timer);
        resolve();
      }
    });
  });
});

after(() => server?.kill());

const post = (route, body, headers = {}) =>
  fetch(BASE + route, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: ORIGIN, ...headers },
    body: JSON.stringify(body),
  });

test("unknown routes return 404 JSON", async () => {
  const res = await fetch(`${BASE}/does-not-exist`);
  assert.equal(res.status, 404);
  assert.equal((await res.json()).message, "Route not found");
});

test("CORS allows the configured client origin with credentials", async () => {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "OPTIONS",
    headers: { Origin: ORIGIN, "Access-Control-Request-Method": "POST" },
  });
  assert.equal(res.headers.get("access-control-allow-origin"), ORIGIN);
  assert.equal(res.headers.get("access-control-allow-credentials"), "true");
});

test("login validation errors come back as 422 { errors }", async () => {
  const res = await post("/auth/login", {});
  assert.equal(res.status, 422);
  const body = await res.json();
  assert.ok(Array.isArray(body.errors) && body.errors.length > 0);
  assert.ok(body.errors.some((e) => e.path === "password"));
});

test("signup rejects a password without a special character", async () => {
  const res = await post("/auth/signup", { username: "weakpw", email: "weak@example.com", password: "password1" });
  assert.equal(res.status, 422);
  const { errors } = await res.json();
  assert.ok(errors.some((e) => e.msg === "Password must contain at least one special character"));
});

test("protected routes need a session", async () => {
  const res = await fetch(`${BASE}/auth/me`);
  assert.equal(res.status, 401);
});

test("signup, duplicate signup, login and session check", async () => {
  const user = {
    username: `ci_${Date.now()}`,
    email: `ci_${Date.now()}@example.com`,
    password: "Sup3r$ecret",
  };

  const signup = await post("/auth/signup", user);
  assert.equal(signup.status, 201);

  const duplicate = await post("/auth/signup", user);
  assert.equal(duplicate.status, 409);
  assert.match((await duplicate.json()).message, /already in use/);

  const wrong = await post("/auth/login", { username: user.username, password: "nope" });
  assert.equal(wrong.status, 401);

  const login = await post("/auth/login", { username: user.username, password: user.password });
  assert.equal(login.status, 200);
  const cookie = login.headers.getSetCookie().find((c) => c.startsWith("token="));
  assert.ok(cookie, "login sets the token cookie");
  assert.match(cookie, /HttpOnly/i);

  const me = await fetch(`${BASE}/auth/me`, { headers: { Cookie: cookie.split(";")[0] } });
  assert.equal(me.status, 200);
  assert.deepEqual(await me.json(), { authenticated: true });
});
