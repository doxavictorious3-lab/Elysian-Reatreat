# Elysian Retreat (demo)

## Run
    npm install
    npm run dev

## How it connects
- `main.jsx` wraps `App` in `BrowserRouter`. `App.jsx` maps routes to `pages/`.
- `Layout` (Navbar + Footer + skip link) wraps every page. Pages compose components from `components/`.
- Content lives in `data/` (`site.js`, `experiences.js`, `gallery.js`, `testimonials.js`), never inside components.
- Forms use React Hook Form + Zod schemas in `utils/validation.js`. All submissions go through `submitDemo`.

## Replace sample content
- Photos: `img()` placeholders in `data/*.js`. Put your files in `src/assets/` and import them, or use your own URLs. Update every `alt` text.
- Prices and rooms: edit them in the staff area (Rooms tab). The starting rooms live in `server/seedRooms.js` and are only used when the database is empty. Keep the "sample pricing" labels until prices are real.
- Contact details, offer banner, address: `data/site.js`.
- Testimonials: `data/testimonials.js`. Use only real, permitted reviews and remove the "demo" labels afterwards.
- Legal pages: replace the template text in `pages/Privacy.jsx` and `pages/Terms.jsx`.
- Forms: edit `submitDemo` in `utils/validation.js` to call your API or email service. Keep secrets on the server.
- Page titles and descriptions: the `usePageTitle` call at the top of each page.

## Testing checklist
- [ ] `npm run build` succeeds with no errors
- [ ] Every nav and footer link opens the right page; an unknown URL shows "Page not found"
- [ ] `/rooms/garden-room` loads; `/rooms/nope` shows the not-found message
- [ ] Home search: empty dates, check-out before check-in, and valid input behave correctly
- [ ] Booking: each validation message appears; a valid submit shows the summary with the "no room reserved" notice
- [ ] Contact and newsletter: errors, then success states
- [ ] Gallery: filters work; lightbox opens, Left/Right/Escape work, focus returns to the thumbnail
- [ ] Tab through every page: focus is visible, mobile menu is reachable
- [ ] Resize from 360px to 1440px with nothing overflowing
- [ ] Enable "reduce motion" in your OS and confirm animations stop

## Backend and database (server/)
Express API with a SQLite database (`server/data/elysian.db`, created automatically). It needs Node 22.13 or newer, because it uses Node's built-in `node:sqlite`.

Tables: `rooms`, `guests`, `reservations` (status: pending, confirmed, declined, cancelled, completed), `messages`, `subscribers`, `admins`.

Public API: `GET /api/rooms`, `POST /api/booking`, `POST /api/contact`, `POST /api/newsletter`.
Protected API (`/api/admin/...`): reservations, messages and rooms. Staff sign in at `/staff` on the website.

Setup (in `server/`):

    npm install
    cp .env.example .env            # set ADMIN_TOKEN_SECRET (openssl rand -hex 32)
    npm run create-admin            # asks for a username and a 12+ character password
    npm run dev                     # http://localhost:4000

Run the website in a second terminal (`npm run dev` in the project root). Vite proxies `/api` to the server.

How booking works: a guest's enquiry is saved as a `pending` reservation with a reference like ER-00012. Staff open it in `/staff` and confirm or decline it. Confirming is refused when every room of that type is already confirmed for overlapping dates (set "Rooms of this type" in the Rooms tab). A same-day turnover (check-out day equals another guest's check-in day) is allowed.

Backups: the whole database is the file `server/data/elysian.db` (plus `-wal` and `-shm` files while running). Copy it regularly. It contains guests' personal data, so keep it private and cover it in your privacy policy.

Production: deploy `server/` to a Node host that has a persistent disk, set `DB_PATH` to a path on that disk, set the `.env` values on the host, run `npm run create-admin` there once, and build the website with `VITE_API_URL=https://your-api-address`. Hosts with temporary disks will erase the database on redeploy.
