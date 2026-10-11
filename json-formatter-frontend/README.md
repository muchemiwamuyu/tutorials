# JSON Fixer frontend

Static page (no build step) for the broken-JSON formatter API at
`https://softwares-u80c.onrender.com/format`.

The API takes the raw broken JSON as a `text/plain` POST body and returns formatted JSON.

Run locally: `python3 -m http.server 8000` and open http://localhost:8000.
Change the endpoint in `app.js` (`API_URL`).
