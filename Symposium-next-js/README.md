# 991Collective Website (Next.js)

## Environment Variables

Create `.env` in `package/` with:

```env
RESEND_API_KEY=your_resend_api_key
DEMO_SUBMISSIONS_TO=demo@yourdomain.com
DEMO_FROM_EMAIL=991Collective Demos <submit@991collective.com>
CONTACT_SUBMISSIONS_TO=contact@yourdomain.com
CONTACT_FROM_EMAIL=991Collective Contact <submit@991collective.com>
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL=https://open.spotify.com/playlist/your-playlist-id
```

`CONTACT_SUBMISSIONS_TO` is optional. If not set, contact messages fallback to `DEMO_SUBMISSIONS_TO`.

## Local Run

```bash
cd package
npm install
npm run dev
```

## Deploy (Vercel)

- Root directory: `Symposium-next-js/package`
- Build command: `npm run build`
- Output: default Next.js output
