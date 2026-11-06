# kirides.github.io

Source of <https://kirides.github.io/>, a card-based overview of my projects (Gaming | Tooling).

Plain HTML, CSS and a little JavaScript in [`site/`](site/). No build step, no dependencies, and no
third-party requests: no external fonts, scripts, CDNs, analytics, cookies or local storage.

## Preview locally

```sh
cd site
python3 -m http.server 8000
# open http://localhost:8000/
```

(Opening `site/index.html` directly from disk works too.)

## Adding a project

Copy one `<li class="card">` block in `site/index.html` into the right tab and group, then change the link,
the one or two line description and the tags.

## How publishing works

This is a GitHub **user site**: a repository named `<user>.github.io` is served at the root,
`https://kirides.github.io/`. Project repositories that already use GitHub Pages (for example
`digital-world-patcher`) keep working unchanged at `https://kirides.github.io/<repo>/`.

The page is deployed by [`.github/workflows/pages.yml`](.github/workflows/pages.yml) **only when a tag
matching `v*` is pushed**. Pushing to `main` or any other branch does not change the live page.

One-time setup:

1. **Settings > Pages > Build and deployment > Source:** choose **GitHub Actions**.
2. **Settings > Environments > github-pages > Deployment branches and tags:** add a rule for tags `v*`.
   GitHub only lets the default branch deploy by default, so without this rule tag deploys are rejected.

Release:

```sh
git tag v1.0.0
git push origin v1.0.0
```

To roll back, re-run the workflow for an older tag from the Actions tab.

## Legal

`site/legal.html` holds the Impressum and privacy notice (Datenschutzerklärung). Fill in the
`[placeholders]` before the first release.
