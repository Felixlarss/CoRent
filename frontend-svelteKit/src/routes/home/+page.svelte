<script lang="ts">
	import '$lib/layout.css';
	import { onMount } from 'svelte';
	import type { MemberRow } from '$lib/types';
	import { getMembers, getMemberData, getMemberById } from '$lib/services/memberApi';

	let members: MemberRow[] = $state([]);
	let selectedMember: MemberRow | null = $state(null);
  let member: MemberRow | null = $state(null);

	onMount(async () => {
		members = await getMembers();
    member = await getMemberData();
    await console.log(member.house_id)
	});
</script>

{#if member?.house_id}
  {#if !members.length}
    <h1 class="text-center text-6xl font-bold">Members Loading...</h1>
  {:else}
    <div class="flex w-full flex-col justify-center text-white">
      <div class="flex justify-center pt-10">
        <ul class="flex w-1/3 flex-col space-y-5 p-4 align-middle">
          {#each members as m (m.member_id)}
            <button
              type="button"
              class="align-middle0 flex w-full cursor-pointer items-center justify-between gap-8 p-2"
              onclick={async () => (selectedMember = await getMemberById(m.member_id))}
            >
              {#if m.member_rent}
                <span class="flex w-full text-start">{m.member_name}</span>
                <span class="flex w-full text-start">{m.member_rent} kr</span>
                <span class="flex whitespace-nowrap">{m.member_m2} m²</span>
              {:else}
                <span class="flex w-full text-start">{m.member_name}</span>
                <p class="flex whitespace-nowrap">Member not assigned to room</p>
                <span class="flex w-full text-start"></span>
              {/if}
            </button>
          {/each}
        </ul>
      </div>

      <div class="flex justify-center">
        {#if selectedMember}
          <ul class="mt-6 w-1/8 p-4">
            <h2 class="mb-2 text-lg font-semibold">CoRentor</h2>
            <p><strong>Name:</strong> {selectedMember.member_name}</p>
            <p><strong>Rent:</strong> {selectedMember.member_rent} kr</p>
            <p><strong>Area:</strong> {selectedMember.member_m2} m²</p>
          </ul>
        {/if}
      </div>
    </div>
  {/if}
{:else}
<div class="flex w-full justify-center pt-10">
<form class="flex items-center gap-5 flex-col p-5">
    <h1>No house connected</h1>
      <div class="flex justify-center gap-5 flex-row">
      <button class="p-2" onclick={window.location.href ='/make-house'}>Make House</button>
      <button class="p-2">Join House</button>
      </div>
    </form>
  </div>
{/if}
