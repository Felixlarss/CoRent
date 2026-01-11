<script lang="ts">
	import '$lib/layout.css';
	import { addMember } from '$lib/services/memberApi';
	import { addMemberRoom } from '$lib/services/memberRoomApi';
	import { getRooms } from '$lib/services/roomApi';
	import type { MemberRow, RoomRow } from '$lib/types';
	import { onMount } from 'svelte';

	let member_name: string | null = $state(null);
	let rooms: RoomRow[] = $state([]);
	let added_member: MemberRow | null = $state(null);
	let selectedRooms: string[] = $state([]);
  let member: MemberRow = $state()

	onMount(async () => {
		rooms = await getRooms();
    member = await getMemberData();
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		added_member = await addMember(member_name!);
		if (!added_member) throw new Error('no member added!');
		for (const room_id of selectedRooms) {
			await addMemberRoom(room_id, added_member.member_id);
		}

		member_name = null;
		selectedRooms = [];
	}
</script>

{#if member?.house_id}
<div class="flex w-full justify-center">
	<form onsubmit={handleSubmit} class="flex w-1/4 flex-col items-center justify-center py-5">
		<h2 class="flex justify-center font-bold">Add A CoRentor</h2>
		<label class="my-5 flex w-full items-center justify-center">
			<input required placeholder="Name" type="text" name="member_name" bind:value={member_name} />
		</label>
		{#each rooms as r (r.room_id)}
			<li class="m-1 flex w-2/3 gap-4 p-2 px-4">
				<div class="flex items-center justify-start">
					<input value={r.room_id} bind:group={selectedRooms} type="checkbox" id={r.room_id} />
				</div>
				<div class=" flex w-full justify-between">
					<label class="flex pl-2 text-start" for={r.room_id}>{r.room_name}</label>
					<label class="flex text-end whitespace-nowrap" for={r.room_id}>{r.room_m2} m²</label>
				</div>
			</li>
		{/each}
		<button class="my-3 flex p-2">Add</button>
	</form>
</div>
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
