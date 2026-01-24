<script lang="ts">
	import '$lib/layout.css';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import {
		getMembers,
		getMemberById,
		getMemberData,
		deleteMemberById
	} from '$lib/services/memberApi';
	import { addMemberRoom, deleteMemberRoomById } from '$lib/services/memberRoomApi';
	import { getRooms } from '$lib/services/roomApi';
	import type { MemberRow, RoomRow } from '$lib/types';
	import { onMount } from 'svelte';

	let members: MemberRow[] = $state([]);
	let selectedMember: MemberRow | null = $state(null);

	let rooms: RoomRow[] = $state([]);
	let selectedRooms: RoomRow[] | null = $state([]);

	let member: MemberRow = $state();
	let member_id: string | null = null;

	onMount(async () => {
		member = await getMemberData();
		members = await getMembers();
		rooms = await getRooms();
		if (!member.house_id) {
			goto(resolve('/new-user'));
		}
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		await deleteMemberRoomById(selectedMember!.member_id);
		if (member_id === '') throw new Error('no id submitted');
		for (let i = 0; i < selectedRooms!.length; i++) {
			const currentRoom = selectedRooms![i];
			await addMemberRoom(String(currentRoom), selectedMember!.member_id);
		}
		members = await getMembers();
		selectedRooms = null;
		selectedMember = null;
	}
</script>

{#if members.length}
	<div class="flex w-full flex-col justify-center">
		<div class="flex justify-center gap-5 pt-5">
			<ul class="flex w-1/3 flex-col space-y-5 p-2 align-middle">
				<h2 class="flex justify-center font-bold">Edit A CoRentor</h2>
				{#each members as m (m.member_id)}
					<div class="flex w-full flex-col px-2 pb-2">
						<div class="flex w-full justify-center gap-3">
							<button
								type="button"
								class="flex w-full cursor-pointer items-center justify-between p-2 align-middle"
								onclick={async () => (selectedMember = await getMemberById(m.member_id))}
							>
								<span class="flex w-full text-start">{m.member_name}</span>
								<span class="flex w-full text-start">{m.member_rent} kr</span>
								<span class="flex whitespace-nowrap">{m.member_m2} m²</span>
							</button>
							<button
								class="flex cursor-pointer items-center p-2"
								onclick={async () => {
									await deleteMemberById(m.member_id);
									members = await getMembers();
								}}>Delete</button
							>
						</div>
						{#if selectedMember && selectedMember.member_id === m.member_id}
							<form onsubmit={handleSubmit} class="none my-2 flex justify-center">
								<div class="flex w-full flex-col items-center justify-center gap-3 pt-3">
									{#each rooms as r (r.room_id)}
										<li class="flex w-2/3 items-center justify-between px-2">
											<div class="flex items-center justify-start gap-2">
												<input
													class="flex cursor-pointer items-center"
													type="checkbox"
													bind:group={selectedRooms}
													value={r.room_id}
													id={r.room_id}
												/>
												<label for={r.room_id} class="pointer-events-none flex p-1"
													>{r.room_name}</label
												>
											</div>
											<label class="pointer-events-none flex cursor-pointer p-1" for={r.room_id}
												>{r.room_m2} m²</label
											>
										</li>
									{/each}
									<button class="my-5 w-1/3 cursor-pointer p-1">Confirm</button>
								</div>
							</form>
						{/if}
					</div>
				{/each}
			</ul>
		</div>
	</div>
{/if}
