<script lang="ts">
	import '$lib/layout.css';
	import { onMount } from 'svelte';
	import type { HouseRow, MemberRow } from '$lib/types';
	import { getMembers, getMemberData, getMemberById } from '$lib/services/memberApi';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
	import { getHouseById } from '$lib/services/houseApi';

	let members: MemberRow[] = $state([]);
	let selectedMember: MemberRow | null = $state(null);
  let member: MemberRow | null = $state(null);
  let house_id: number | undefined = $state(undefined)
  let house: HouseRow | undefined = $state(undefined)

	onMount(async () => {
		members = await getMembers();
    member = await getMemberData();
    house_id = member?.house_id;
    house = await getHouseById(house_id)
    if (!house_id) {
      goto(resolve('/new-user'))
    }
	});
</script>

  {#if !members.length}
  {:else}
    <div class="flex w-full flex-col justify-center text-white">
      <div class="flex flex-col items-center pt-5">
      <p class="flex justify-center text-4xl font-bold pb-5">{house?.house_name}</p>
        <ul class="flex w-1/3 flex-col space-y-5 p-4 align-middle">
			<p class="flex w-full text-start">House Key: {house_id}</p>
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
