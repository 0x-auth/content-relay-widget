/**
 * content-widget — drop-in client for the content-relay push/pull backend.
 * Zero dependencies, works in any static site (Netlify, GitHub Pages, wherever).
 *
 * Usage:
 *   <script src="content-widget.js"></script>
 *   <script>
 *     ContentWidget.mount('#thought', { project: 'kritika-space', key: 'thought' });
 *   </script>
 */
(function (global) {
  const DEFAULT_ENDPOINT = 'https://content-relay.consciousness-portal.workers.dev';

  async function fetchContent({ project, key, endpoint = DEFAULT_ENDPOINT }) {
    const res = await fetch(`${endpoint}/content/${encodeURIComponent(project)}/${encodeURIComponent(key)}`);
    if (!res.ok) return null;
    return res.json();
  }

  async function mount(selector, opts) {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!el) return null;
    const { fallback = '', render } = opts;
    try {
      const data = await fetchContent(opts);
      if (!data) {
        el.textContent = fallback;
        return null;
      }
      if (typeof render === 'function') {
        render(el, data);
      } else {
        el.textContent = data.value;
      }
      return data;
    } catch (e) {
      el.textContent = fallback;
      return null;
    }
  }

  global.ContentWidget = { mount, fetchContent };
})(typeof window !== 'undefined' ? window : globalThis);
