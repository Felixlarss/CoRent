<script lang="ts">
	import '$lib/layout.css';
	import { onMount } from 'svelte';
	import type { HouseRow, MemberRow, MemberRowResponse } from '$lib/types';
	import { getMembers, getMemberData, getMemberById } from '$lib/services/memberApi';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { getHouseById } from '$lib/services/houseApi';
	import { houseDataToPdf } from '$lib/services/exportToPdf';

	let members: MemberRow[] = $state([]);
	let selectedMember: MemberRow | null = $state(null);
	let member: MemberRowResponse | null = $state(null);

	let house_id: number | undefined = $state(undefined);
	let house: HouseRow | undefined = $state(undefined);

	let loading: boolean = $state(true);

	onMount(async () => {
		members = await getMembers();
		member = await getMemberData();
		if (member.ok) {
			house_id = member.data.house_id;
			house = await getHouseById(house_id);
		}
		if (!house_id) {
			await goto(resolve('/new-user'));
		}
		loading = false;
	});
</script>

{#if members.length && !loading}
	<div class="flex w-full flex-col justify-center text-white">
		<div class="flex flex-col items-center pt-5">
			<p class="flex justify-center pb-5 text-4xl font-bold">{house?.house_name}</p>
			<ul class="flex flex-col items-center space-y-5 p-4 align-middle sm:w-full md:w-1/3">
				<p class="flex w-full text-start">House Key: {house_id}</p>
				{#each members as m (m.member_id)}
					<button
						type="button"
						class="align-middle0 flex w-full cursor-pointer items-center justify-between gap-8 p-2"
						onclick={async () => (selectedMember = await getMemberById(m.member_id))}
					>
						{#if m.member_rent}
							<span class="flex w-full text-start whitespace-nowrap">{m.member_name}</span>
							<span class="flex w-full text-start whitespace-nowrap">{m.member_rent} kr</span>
							<span class="flex whitespace-nowrap">{m.member_m2} m²</span>
						{:else}
							<span class="flex w-full text-start">{m.member_name}</span>
							<p class="flex whitespace-nowrap">Member not assigned to room</p>
							<span class="flex w-full text-start"></span>
						{/if}
					</button>
				{/each}
				<button
					type="button"
					class="mb-5 w-min cursor-pointer px-4 py-2 font-bold whitespace-nowrap"
					onclick={houseDataToPdf}>Save as PDF</button
				>
			</ul>
		</div>

		<div class="flex justify-center">
			{#if selectedMember}
				<ul class="mt-6 p-4 sm:w-full md:w-1/8">
					<h2 class="mb-2 text-lg font-semibold">CoRentor</h2>
					<p><strong>Name:</strong> {selectedMember.member_name}</p>
					<p><strong>Rent:</strong> {selectedMember.member_rent} kr</p>
					<p><strong>Area:</strong> {selectedMember.member_m2} m²</p>
				</ul>
			{/if}
		</div>
	</div>
{/if}
