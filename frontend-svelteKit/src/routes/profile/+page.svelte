<script lang="ts">
	import '$lib/layout.css';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { getMemberData, deleteMemberById } from '$lib/services/memberApi';
	import { addMemberRoom, deleteMemberRoomById } from '$lib/services/memberRoomApi';
	import { getRooms } from '$lib/services/roomApi';
	import type { MemberRowResponse, RoomRow } from '$lib/types';
	import { onMount } from 'svelte';

	let rooms: RoomRow[] = $state([]);
	let selectedRooms: RoomRow[] | null = $state([]);

	let member: MemberRowResponse | undefined = $state(undefined);
	let member_id: string | null = null;

	let confirmDelete: boolean = false;

	let loading: boolean = $state(true);

	onMount(async () => {
		member = await getMemberData();
		rooms = await getRooms();
		if (member.ok && !member.data.house_id) {
			goto(resolve('/new-user'));
		}
		loading = false;
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (member && member.ok) {
			await deleteMemberRoomById(member.data.member_id);
		}
		if (member_id === '') throw new Error('no id submitted');
		for (let i = 0; i < selectedRooms!.length; i++) {
			const currentRoom = selectedRooms![i];
			if (member && member.ok) await addMemberRoom(String(currentRoom), member!.data.member_id);
		}
		selectedRooms = null;
		member = await getMemberData();
	}

	async function handleDelete() {
		confirmDelete = confirm('confirm delete');
		if (member && member.ok && confirmDelete) {
			await deleteMemberById(member.data.member_id);
		}
	}
</script>

{#if member && member.ok && !loading}
	<div class="flex w-full flex-col justify-center">
		<div class="flex justify-center gap-5">
			<ul class="flex flex-col space-y-5 align-middle sm:w-full md:w-1/3">
				<h1 class="m-5 text-center text-4xl">{member.data.member_name}</h1>
				<div class="flex w-full flex-col px-2 pb-2">
					<div class="flex w-full justify-center gap-3 pt-3">
						<div class="highlight hover:none flex w-min flex-col items-start p-2 align-middle">
							<span class="flex whitespace-nowrap">Rent: {member.data.member_rent} kr</span>
							<span class="flex whitespace-nowrap">Area: {member.data.member_m2} m²</span>
						</div>
					</div>
					<form onsubmit={handleSubmit} class="none my-2 flex w-full justify-center">
						<div class="flex w-full flex-col items-center justify-center gap-3 pt-3">
							<p>Change Rooms</p>
							{#each rooms as r (r.room_id)}
								<li class="flex w-full items-center justify-between px-2 md:w-2/3">
									<div class="flex items-center justify-start gap-2">
										<input
											class="flex cursor-pointer items-center"
											type="checkbox"
											bind:group={selectedRooms}
											value={r.room_id}
											id={r.room_id}
										/>
										<label for={r.room_id} class="pointer-events-none flex p-1">{r.room_name}</label
										>
									</div>
									<label class="pointer-events-none flex cursor-pointer p-1" for={r.room_id}
										>{r.room_m2} m²</label
									>
								</li>
							{/each}
							<button class="my-5 w-1/3 cursor-pointer p-1">Confirm</button>
							<button class="flex cursor-pointer items-center p-2" onclick={handleDelete}
								>Delete Account</button
							>
						</div>
					</form>
				</div>
			</ul>
		</div>
	</div>
{/if}
