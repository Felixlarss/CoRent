<script lang="ts">
	import '$lib/layout.css';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import type { MemberRow } from '$lib/types';
	import { getMembers, getMemberData, getMemberById } from '$lib/services/memberApi';

	let members: MemberRow[] = $state([]);
	let selectedMember: MemberRow | null = $state(null);
  let member: MemberRow | null = $state(null);
	let isLoading = $state(true);

	onMount(async () => {
    try {
		members = await getMembers();
    member = await getMemberData();
    } finally {
      isLoading = false
    }

	});
</script>

{#if isLoading}
{:else if !! member && !!member.house_id}
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
{:else if member}
  {goto(resolve('/new-user'))}
{:else}
  {goto(resolve('/'))}
{/if}
