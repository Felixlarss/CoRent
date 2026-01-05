<script lang="ts">
	import { onMount } from 'svelte';
	import type { MemberRow } from '$lib/types';
	import { getMembers, getMemberById } from '$lib/services/memberApi';

	let members: MemberRow[] = $state([]);
	let selectedMember: MemberRow | null = $state(null);

	onMount(async () => {
		members = await getMembers();
	});
</script>

{#if !members.length}
	<h1 class="text-center text-6xl font-bold">Members Loading...</h1>
{:else}
	<div class="flex w-full flex-col justify-center">
		<div class="flex justify-center pt-10">
			<ul class="flex w-1/3 flex-col space-y-5 rounded-2xl border-2 p-2 align-middle">
				{#each members as m (m.member_id)}
					<li class="flex flex-row p-2">
						<button
							type="button"
							class="flex w-full cursor-pointer items-center justify-between gap-8 rounded-2xl border p-2 align-middle hover:bg-blue-50"
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
					</li>
				{/each}
			</ul>
		</div>

		<div class="flex justify-center">
			{#if selectedMember}
				<div class="mt-6 w-1/8 rounded-2xl border-2 p-4">
					<h2 class="mb-2 text-lg font-semibold">CoRentor</h2>
					<p><strong>Name:</strong> {selectedMember.member_name}</p>
					<p><strong>Rent:</strong> {selectedMember.member_rent} kr</p>
					<p><strong>Area:</strong> {selectedMember.member_m2} m²</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
