# content-relay-widget

A tiny, zero-dependency client for pushing small pieces of content (a thought,
an announcement, anything) into any static site — Netlify, GitHub Pages,
wherever — without a rebuild or redeploy.

Backed by a single Cloudflare Worker + KV namespace shared across every site
that uses it, scoped by `project`/`key` so one backend serves any number of
sites.

## Usage

```html
<div id="thought">Loading…</div>
<script src="https://unpkg.com/content-relay-widget"></script>
<script>
  ContentWidget.mount('#thought', {
    project: 'kritika-space',
    key: 'thought',
    fallback: ''
  });
</script>
```

`ContentWidget.mount(selector, options)`:

- `project` — your site's namespace
- `key` — which piece of content within that namespace
- `fallback` — text to show if nothing's been pushed yet, or the request fails
- `render(el, data)` — optional custom renderer; `data` is `{ value, updatedAt }`
- `endpoint` — override the default backend URL

## Pushing content

Requires a push key (see the backend's own setup). Example with `curl`:

```bash
curl -X POST https://content-relay.consciousness-portal.workers.dev/content/kritika-space/thought \
  -H "X-Push-Key: $CONTENT_RELAY_KEY" \
  -H "Content-Type: application/json" \
  -d '{"value": "One breath at a time. Today counts too."}'
```

Or use `scripts/push-content.sh <project> <key> "<value>"` from the
[netlify-mono](https://github.com/0x-auth/netlify-mono) repo.

## License

MIT
