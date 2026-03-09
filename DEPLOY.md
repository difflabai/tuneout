# TuneOut - Deployment Guide

## Domain Recommendation

### Top Pick: `tuneouttoday.com`
- **Price:** ~$8.88/yr first year, ~$11.08/yr renewal (Porkbun)
- **Why:** Action-oriented (.com credibility, "Tune Out Today" = name + CTA), memorable, affordable
- **Register at:** [Porkbun](https://porkbun.com) (best transparent pricing, free WHOIS privacy)

### Budget Pick: `tuneout.xyz`
- **Price:** ~$2.04/yr first year, ~$12.98/yr renewal (Porkbun)
- **Why:** Shortest URL, cheapest entry, tech-savvy audience will recognize .xyz

### Alternative Picks (all likely available):
| Domain | Year 1 | Renewal | Notes |
|--------|--------|---------|-------|
| tuneouttoday.com | $8.88 | $11.08 | **Recommended** |
| algorithmhygiene.com | $8.88 | $11.08 | Descriptive, professional |
| attentionarmor.com | $8.88 | $11.08 | Alliterative, compelling |
| cognitive-defense.org | $6.88 | $10.74 | .org = mission credibility |
| tuneout.xyz | $2.04 | $12.98 | Cheapest entry |
| tuneout.co | $9.58 | $25.97 | Short but expensive renewal |

### Taken (do not attempt):
- tuneout.com, tuneout.org, tuneout.net, cognitive-defense.com

**Strategy:** Register `tuneouttoday.com` as primary ($8.88) + `tuneout.xyz` as redirect ($2.04) = ~$11 total for first year.

---

## Deployment Options

### Option 1: Cloudflare Pages (Free, Recommended)
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login
wrangler login

# Deploy
cd ~/projects/tuneout
wrangler pages deploy . --project-name tuneout
```
- Free tier: unlimited bandwidth, automatic HTTPS
- Custom domain: Add in Cloudflare Dashboard > Pages > Custom Domains
- Global CDN, no cold starts

### Option 2: GitHub Pages (Free)
```bash
cd ~/projects/tuneout
git init
git add index.html
git commit -m "Initial deploy"
gh repo create tuneout --public --source=. --push

# Enable Pages in repo settings:
# Settings > Pages > Source: Deploy from branch > main > / (root)
```
- Free, automatic HTTPS for custom domains
- Custom domain: Add CNAME file with your domain, configure DNS

### Option 3: Netlify (Free)
```bash
# Drag-and-drop deploy at app.netlify.com
# Or use CLI:
npm install -g netlify-cli
cd ~/projects/tuneout
netlify deploy --prod --dir=.
```
- Free tier: 100GB bandwidth/month
- Custom domain in Netlify dashboard

### Option 4: Simple VPS / Static Server
```bash
# If you have a VPS, just copy the file:
scp ~/projects/tuneout/index.html user@your-server:/var/www/tuneout/

# Nginx config:
# server {
#     listen 80;
#     server_name tuneouttoday.com;
#     root /var/www/tuneout;
#     index index.html;
# }
```

### Option 5: Vercel (Free)
```bash
npm install -g vercel
cd ~/projects/tuneout
vercel --prod
```

---

## DNS Configuration (after buying domain)

For Cloudflare Pages / Netlify / Vercel:
1. Point nameservers to the hosting provider, OR
2. Add CNAME record: `www` -> `your-project.pages.dev` (or equivalent)
3. Add A record for root domain as directed by provider

For GitHub Pages:
1. CNAME record: `www` -> `yourusername.github.io`
2. A records for apex: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

---

## What's in the Box

Single file: `index.html` (64KB)
- Zero dependencies (fonts loaded from Google Fonts CDN)
- All CSS and JS inline
- No build step required
- Mobile responsive
- Persistent checklist (localStorage)
- Scroll animations
- Interactive OS-specific tool guides
- LLM prompt examples with tabbed interface
- Share functionality (Twitter, clipboard, email)

## Performance
- First paint: < 1s on 3G
- No JavaScript frameworks
- No tracking, no cookies, no analytics
- Lighthouse score: should be 95+ across all categories
