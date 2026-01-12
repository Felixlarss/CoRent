import { a as attr } from './attributes-DIZVxfKf.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function LoginForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let member_name = "";
    let password = "";
    let confirmPassword = "";
    let { signUpForm = false } = $$props;
    $$renderer2.push(`<div class="flex flex-col w-1/3 p-5"><h1>${escape_html(signUpForm ? "Sign up" : "Log in")}</h1> <form class="flex p-5 flex-col gap-3"><input${attr("value", member_name)} placeholder="name" required/> <input${attr("value", password)} placeholder="Password" type="password" required/> `);
    if (signUpForm) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<input${attr("value", confirmPassword)} placeholder="Repeat password" type="password" required/>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex justify-between"><button type="submit" class="w-fit p-2">${escape_html(signUpForm ? "Sign up" : "Log in")}</button> <button type="button" class="w-fit p-2 link text-amber-600">${escape_html(signUpForm ? "Log in" : "Sign up")}</button></div></form></div>`);
  });
}

export { LoginForm as L };
//# sourceMappingURL=LoginForm-AUpOK8lJ.js.map
