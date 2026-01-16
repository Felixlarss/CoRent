<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
import { getMemberData } from "$lib/services/memberApi";
	import type { MemberRow } from "$lib/types";
	import { onMount } from "svelte";

let member: MemberRow | null = $state(null)

onMount(async()=> {
  member = await getMemberData();
  if (member?.house_id) {
    goto(resolve('/home'))
  }
});

</script>

<div class="flex w-full justify-center pt-10">
<form class="flex items-center gap-5 flex-col p-5">
    <h1>No house connected</h1>
      <div class="flex justify-center gap-5 flex-row">
      <button class="p-2" onclick={window.location.href ='/make-house'}>Make House</button>
      <button class="p-2" onclick={window.location.href ='/join-house'}>Join House</button>
      </div>
    </form>
  </div>
