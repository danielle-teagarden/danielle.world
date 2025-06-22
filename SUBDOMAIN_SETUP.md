# Subdomain Configuration for danielle.world

This document outlines how to set up subdomains for personal projects on danielle.world.

## DNS Configuration

Add these CNAME records to your DNS provider (Cloudflare, etc.):

```
inventory.danielle.world  →  danielle.world
music.danielle.world      →  danielle.world
recipes.danielle.world    →  danielle.world
garden.danielle.world     →  danielle.world
```

All subdomains should point to the main domain, and Netlify will handle the routing via the redirects in `netlify.toml`.

## Netlify Setup

1. **Deploy each project to Netlify:**
   - Inventory: Deploy from `~/personal/apps/inventory` to `inventory-danielle.netlify.app`
   - Piano Player: Deploy from `~/personal/apps/piano-player` to `classical-piano-player.netlify.app`
   - Recipes: Deploy from `~/personal/apps/family-recipes` to `family-recipes-danielle.netlify.app`
   - Garden: Deploy from `~/personal/home-and-garden/hill-reclamation` to `hill-reclamation.netlify.app`

2. **The main danielle.world site handles routing** via the redirects configured in `netlify.toml`

## Testing

Once DNS propagates (can take up to 48 hours), test:
- https://inventory.danielle.world
- https://music.danielle.world
- https://recipes.danielle.world
- https://garden.danielle.world

## Alternative: Direct Netlify Subdomains

If you prefer, you can also set up each subdomain to point directly to its Netlify app:

```
inventory.danielle.world  →  inventory-danielle.netlify.app
music.danielle.world      →  classical-piano-player.netlify.app
recipes.danielle.world    →  family-recipes-danielle.netlify.app
garden.danielle.world     →  hill-reclamation.netlify.app
```

Then configure custom domains in each Netlify app's settings.

## Current Status

- Main portfolio site: ✅ Deployed
- Subdomain redirects: ✅ Configured in netlify.toml
- DNS records: ⏳ Need to be added
- Individual app deployments: ⏳ Need to be set up