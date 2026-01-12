import { e as escape_html } from './escaping-CqgfEcN3.js';
import { g as goto } from './client-BT11c9Ng.js';
import { f as resolve_route, i as initial_base, b as base } from './routing-DQ6Ee1B0.js';
import { B as try_get_request_store } from './utils2-D9XmxBLN.js';
import './index-CVwmXrTZ.js';
import './state.svelte-CywT8WwD.js';

function resolve(id, params) {
  const resolved = resolve_route(
    id,
    /** @type {Record<string, string>} */
    params
  );
  {
    const store = try_get_request_store();
    if (store && !store.state.prerendering?.fallback) {
      const after_base = store.event.url.pathname.slice(initial_base.length);
      const segments = after_base.split("/").slice(2);
      const prefix = segments.map(() => "..").join("/") || ".";
      return prefix + resolved;
    }
  }
  return base + resolved;
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`${escape_html(goto(resolve("/")))}`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D7wVoKw9.js.map
