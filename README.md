# Elysian Retreat (demo)

## Run
    npm install
    npm run dev

## How it connects
- `main.jsx` wraps `App` in `BrowserRouter`. `App.jsx` maps routes to `pages/`.
- `Layout` (Navbar + Footer + skip link) wraps every page. Pages compose components from `components/`.
- Content lives in `data/` (`site.js`, `rooms.js`, `experiences.js`, `gallery.js`, `testimonials.js`), never inside components.
- Forms use React Hook Form + Zod schemas in `utils/validation.js`. All submissions go through `submitDemo`.

## Replace sample content
- Photos: `img()` placeholders in `data/*.js`. Put your files in `src/assets/` and import them, or use your own URLs. Update every `alt` text.
- Prices and rooms: `data/rooms.js` (keep the "sample pricing" labels until prices are real).
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

## Backend (server/)
Express API with endpoints `POST /api/booking`, `/api/contact`, `/api/newsletter`. It validates with Zod, rate-limits, uses Helmet and CORS, saves submissions to `server/data/submissions.jsonl`, and emails the team if SMTP is configured.

    cd server
    npm install
    cp .env.example .env      # then edit .env
    npm run dev               # http://localhost:4000

Run the website in a second terminal (`npm run dev` in the project root). Vite proxies `/api` to the server.

Production: deploy `server/` to a Node host, set the `.env` values there, set `CLIENT_ORIGIN` to your site address, and build the website with `VITE_API_URL=https://your-api-address`.
Remember: keep `.env` private, update `server/schemas.js` when you change rooms, and cover stored personal data in your privacy policy.

## Staff area
Staff open `/staff` on the website (it is not linked in the menu) and sign in with `ADMIN_PASSWORD` from `server/.env`. They can filter enquiries, email guests and mark enquiries as handled. Set `ADMIN_PASSWORD` (12+ characters) and `ADMIN_TOKEN_SECRET` (`openssl rand -hex 32`), then restart the server. Sessions last 8 hours. This is a single shared password; for several staff members with their own logins, use a proper auth service.
