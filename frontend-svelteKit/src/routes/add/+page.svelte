<script lang="ts">
	import { addMember } from '$lib/services/memberApi';
	import { addMemberRoom } from '$lib/services/memberRoomApi';
	import { getRooms } from '$lib/services/roomApi';
	import type { MemberRow, RoomRow } from '$lib/types';
	import { onMount } from 'svelte';

	let member_name: string | null = $state(null);
	let rooms: RoomRow[] = $state([]);
	let added_member: MemberRow | null = $state(null);
	let selectedRooms: string[] = $state([]);

	onMount(async () => {
		rooms = await getRooms();
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		added_member = await addMember(member_name!);
		if (!added_member) throw new Error('no member added!');
		for (const room_id of selectedRooms) {
			await addMemberRoom(room_id, added_member.member_id);
		}

		alert(`${member_name} was added!`);
		member_name = null;
		selectedRooms = [];
	}
</script>

<form onsubmit={handleSubmit} class="flex flex-row items-center justify-center">
	<div class="prose w-1/5 justify-center">
		<h2 class="flex justify-center">Add A CoRentor</h2>
		<div class="flex w-full flex-col items-center gap-5 rounded-2xl border-2 p-2">
			<label class="mt-5 flex w-full items-center justify-center">
				<input
					class="rounded-2xl border-2 hover:bg-blue-50"
					required
					placeholder="Name"
					type="text"
					name="member_name"
					bind:value={member_name}
				/>
			</label>
			{#each rooms as r (r.room_id)}
				<ul class="flex w-2/3 rounded-2xl border-2 p-2 px-4">
					<div class="flex items-center justify-start">
						<input
							class="flex rounded"
							value={r.room_id}
							bind:group={selectedRooms}
							type="checkbox"
							id={r.room_id}
						/>
					</div>
					<div class="flex w-full justify-between">
						<label class="flex pl-2 text-start" for={r.room_id}>{r.room_name}</label>
						<label class="flex text-end whitespace-nowrap" for={r.room_id}>{r.room_m2} m²</label>
					</div>
				</ul>
			{/each}
			<button class="flex rounded-2xl p-2 hover:bg-blue-50">Add</button>
		</div>
	</div>
</form>

<style>
	ul {
		margin: 0;
	}
</style>
