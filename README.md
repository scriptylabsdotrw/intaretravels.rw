# Intare Travels - Tourism Platform

High-performance tourism platform for Rwanda with Next.js 16![alt text](image-1.png)+, Turborepo monorepo, and full admin CMS.

## Quick Start

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build
pnpm build
```![alt text](image.png)

**URLs:**
- Public Website: http://localhost:3000
- Admin Portal: http://localhost:3001

## Project Structure

```
intare-travels/
├── apps/
│   ├── web/          # Public website (intaretravels.rw)
│   └── admin/        # Admin CMS (admin.intaretravels.rw)
├── packages/
│   ├── ui/           # Shared components
│   ├── lib/          # SEO utilities
│   └── config/       # Shared configs
└── data/             # JSON content storage
```

## Features

### Public Website
- Tours & travel packages
- Luxury apartments
- Flight deals & promotions
- SEO-optimized (Lighthouse 95+)
- Static generation + ISR
- Mobile-first responsive

### Admin Portal
- Manage tours (add, edit, delete)
- Manage apartments
- Upload images
- Manage flight promotions
- Update airline partners
- SEO metadata editor
- FAQ management

## Admin Access

Default credentials (change in production):
- URL: http://localhost:3001
- Username: admin
- Password: (set via environment)

## Environment Variables

Create `.env.local` in both apps:

```env
# apps/web/.env.local
NEXT_PUBLIC_SITE_URL=https://intaretravels.rw

# apps/admin/.env.local
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

## Deployment

### CI/CD Pipeline

The project uses GitHub Actions for automated deployment:

#### Workflows

1. **CI - Build & Test** (`.github/workflows/ci.yml`)
   - Runs on every push and PR
   - Lints code
   - Type checks
   - Builds both apps
   - Runs tests

2. **Deploy to VPS** (`.github/workflows/deploy-vps.yml`)
   - Triggers on push to `main` branch
   - Builds applications
   - Deploys to production VPS
   - Runs health checks
   - Sends notifications

3. **Preview Deployment** (`.github/workflows/preview.yml`)
   - Runs on pull requests
   - Creates preview builds
   - Comments on PR with status

4. **Rollback** (`.github/workflows/rollback.yml`)
   - Manual trigger only
   - Rolls back to previous commit or specific SHA
   - Useful for emergency fixes

#### Required GitHub Secrets

Set these in your repository settings (Settings → Secrets and variables → Actions):

```
VPS_HOST=your-server-ip
VPS_USERNAME=your-ssh-username
VPS_SSH_KEY=your-private-ssh-key
```

#### Deployment Process

1. **Automatic Deployment**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
   GitHub Actions will automatically deploy to production.

2. **Manual Deployment**
   - Go to Actions tab in GitHub
   - Select "Deploy to VPS"
   - Click "Run workflow"

3. **Rollback**
   - Go to Actions tab
   - Select "Rollback Deployment"
   - Enter commit SHA (optional)
   - Click "Run workflow"

### VPS Deployment (Nginx + PM2)

Deployed on your VPS with:
- **Public Site**: https://intaretravels.rw (Port 3000)
- **Admin Portal**: https://admin.intaretravels.rw (Port 3001)
- **Database**: PostgreSQL
- **Process Manager**: PM2
- **Web Server**: Nginx

### Manual Deployment Script

```bash
# On server
cd /var/www/intaretravels
./deploy.sh
```

The deploy script:
- Pulls latest code from GitHub
- Installs dependencies
- Runs database migrations (if needed)
- Builds applications
- Restarts PM2 processes
- Shows deployment status

### Monitoring

Check application status:
```bash
pm2 status
pm2 logs intaretravels-web
pm2 logs intaretravels-admin
```

See `DEPLOYMENT.md` for complete VPS setup guide.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Monorepo**: Turborepo
- **Deployment**: Vercel
- **Storage**: JSON files (upgradeable to database)

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2.5s
- SEO Score: 100

## Content Management

Content stored in PostgreSQL database via Prisma ORM:
- Tours
- Apartments
- Flight promotions
- Airline partners

Admin portal provides full CRUD interface.

### Database Commands

```bash
# Generate Prisma client
pnpm db:generate

# Push schema changes
pnpm db:push

# Open Prisma Studio (GUI)
pnpm db:studio
```

## Development

```bash
# Run specific app
cd apps/web && pnpm dev
cd apps/admin && pnpm dev

# Lint
pnpm lint

# Type check
pnpm type-check
```

## Support

For issues or questions, contact the development team.
