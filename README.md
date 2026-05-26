# DQC-SI Workshop site

Static Jekyll site for the **Distributed Quantum Computing Systems and Infrastructure (DQC-SI)** workshop at IEEE Quantum Week. Hosted on GitHub Pages.

The whole point of this structure: **content lives in `_data/*.yml`, never in templates.** To update the site for next year you edit YAML, you don't touch HTML.

## How the site is organized

```
.
├── _config.yml                   ← global settings: year, URLs, contact email
├── _data/
│   ├── workshop.yml              ← summary, abstract, objectives, CFP policy
│   ├── dates.yml                 ← important dates
│   ├── organizers.yml            ← 5 organizers + photo paths
│   ├── program_committee.yml     ← PC members + photo paths
│   ├── topics.yml                ← topics of interest (auto-numbered)
│   └── sessions.yml              ← agenda blocks
├── _layouts/default.html         ← page scaffolding (topbar, masthead, nav, footer)
├── _includes/                    ← header / nav / footer partials
├── assets/
│   ├── css/style.css             ← styles
│   ├── js/tabs.js                ← single-page tab switcher
│   └── img/people/               ← organizer & PC photos
└── index.html                    ← the single page (5 tabbed sections)
```

The site is single-page. The five "tabs" (About, CFP, Program, Committee, Attend) are five `<article class="page">` blocks; `tabs.js` swaps the `.active` class so only one is visible at a time. The URL anchor (`#about`, `#cfp`, …) is updated on click so users can deep-link.

## How to update something

| What                 | Where                                                  |
| -------------------- | ------------------------------------------------------ |
| Workshop year        | `_config.yml` → `year:`                                |
| Page deadlines       | `_data/dates.yml`                                      |
| EasyChair URL        | `_config.yml` → `submission_url:`                      |
| Add / drop organizer | `_data/organizers.yml` + photo in `assets/img/people/` |
| Add / drop PC member | `_data/program_committee.yml` + photo                  |
| Topics list          | `_data/topics.yml`                                     |
| Session titles       | `_data/sessions.yml`                                   |
| Abstract / summary   | `_data/workshop.yml`                                   |
| Workshop name        | `_config.yml` → `short_name:` / `full_name:`           |
| Tab order or names   | `_includes/nav.html` + `data-page` IDs in `index.html` |

After editing, just commit and push — GitHub Pages rebuilds automatically.

## How to archive this year and start next year

Two approaches; pick one.

### A. Archive into a subfolder (recommended)

When QCE'26 is done and you want to start QCE'27:

```bash
mkdir -p archive/2026
cp -r _config.yml _data _layouts _includes assets index.html archive/2026/
```

The archived copy can be checked in unchanged. Then update `_config.yml`, `_data/*.yml`, and any photos for 2027. The live site shows 2027; old years remain accessible at `archive/2026/` if you choose to link them.

### B. Branches per year

Use a `2026` branch frozen forever, and develop `main` against 2027. Simpler in git terms but visitors can't see old years from the live site.

## Local preview

GitHub Pages builds Jekyll for you automatically — you don't have to install anything to deploy. But if you want to preview locally before pushing:

```bash
# one-time
gem install bundler
bundle install

# every time
bundle exec jekyll serve
# open http://localhost:4000
```

If you don't have Ruby installed and don't want to bother, just push and let GitHub Pages render it. The build log is visible in the Actions tab of the repo.

## Deploying to GitHub Pages

1. Create a new public repo on GitHub (suggested name: `dqc-si.github.io` for a clean URL like `https://dqc-si.github.io/`, or any name if you're OK with `https://<user>.github.io/repo/`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial DQC-SI 2026 site"
   git branch -M main
   git remote add origin git@github.com:<you>/<repo>.git
   git push -u origin main
   ```
3. On GitHub → repo Settings → Pages → "Build and deployment" → Source: **Deploy from a branch** → Branch: **main** / Folder: **/ (root)**.
4. Wait ~30 seconds. Visit the URL GitHub shows.
5. If the URL is `https://<user>.github.io/<repo>/`, set `baseurl: "/<repo>"` in `_config.yml` and commit.

The PDF (`2026_Workshop_DQC_SI.pdf`) is in `exclude:` in `_config.yml`, so it won't be served by default. If you want to link to it from the site, remove it from `exclude:` and add a link in `_data/workshop.yml`.

## Photo credits

All headshots downloaded from the people's official faculty / lab pages (URLs in the corresponding YAML entries' `url:` field). Please replace any that the person prefers to be hidden or updated.

## Reusing this template for a future workshop

Beyond DQC-SI: fork this repo, change `_config.yml` (`short_name`, `full_name`, `tagline`, `host_conference`, `submission_url`, `main_contact_email`), then rewrite `_data/workshop.yml`, `_data/topics.yml`, etc. The layout templates won't need to change unless you want to add or remove a tab.
