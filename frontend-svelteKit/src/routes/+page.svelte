<script lang="ts">
import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
</script>

 <div class="flex items-center flex-col">
<div class="flex layer2 m-5 p-5 gap-10 flex-col w-2/5 items-center">
    <h1 class="text-5xl text-center ">Welcome to CoRent</h1>
    <p class="wrap-normal text-2xl text-center">CoRent is a tool for you and your roomates to split rent fairly</p>
  </div>
<div class="flex layer2 m-5 p-5 gap-3 flex-col w-min items-center">
    <button onclick={goto(resolve("/learn-more"))} class="wrap-normal w-60 p-1 cursor-pointer text-center">Learn more about how the rentsplit is calculated</button>
    <div class="flex flex-row gap-3">
    <button onclick={goto(resolve("/login"))} class="whitespace-nowrap p-1 px-2 cursor-pointer text-center w-min">Log In</button>
    <button onclick={goto(resolve("/register"))} class="whitespace-nowrap p-1 px-2 cursor-pointer text-center w-min">Register</button>
    </div>
  </div>
</div>
