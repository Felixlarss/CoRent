import { x as ensure_array_like } from './index2-PQVwvKQs.js';
import './utils2-D9XmxBLN.js';
import { a as attr } from './attributes-DIZVxfKf.js';
import './state.svelte-CywT8WwD.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './context-CXhJZien.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let house_name = null;
    let house_rent = null;
    let house_m2 = null;
    let rooms = [];
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex w-full justify-center"><form class="flex w-1/4 flex-col items-center justify-center py-5"><h2 class="flex justify-center font-bold">Add A House</h2> <label class="mt-5 flex w-full items-center justify-center"><input required placeholder="Name" type="text" name="house_name"${attr("value", house_name)}/></label> <label class="mt-5 flex w-full items-center justify-center"><input required placeholder="Rent" type="number" name="house_rent"${attr("value", house_rent)}/></label> <label class="mt-5 flex w-full items-center justify-center"><input required placeholder="Area" type="number" name="house_m2"${attr("value", house_m2)}/></label> <!--[-->`);
      const each_array = ensure_array_like(rooms);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let r = each_array[$$index];
        $$renderer2.push(`<h2 class="pt-5">Room ${escape_html(rooms.indexOf(r) + 1)}</h2> `);
        if (rooms.indexOf(r) === 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<h1>(Your Room)</h1>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <label class="mt-5 flex w-full items-center justify-center"><input required placeholder="Name" type="text" name="room_name"${attr("value", r.room_name)}/></label> <label class="mt-5 flex w-full items-center justify-center"><input required placeholder="Area" type="number" name="room_m2"${attr("value", r.room_m2)}/></label>`);
      }
      $$renderer2.push(`<!--]--> <button type="button" class="my-3 p-2">Add Room</button> <button class="my-3 p-2">Add</button></form></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B8ilcWg-.js.map
