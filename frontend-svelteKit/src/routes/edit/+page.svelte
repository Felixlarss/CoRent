<script lang="ts">
	import { getMembers, getMemberById, deleteMemberById } from '$lib/services/memberApi';
	import { addMemberRoom, deleteMemberRoomById } from '$lib/services/memberRoomApi';
	import { getRooms } from '$lib/services/roomApi';
	import type { MemberRow, RoomRow } from '$lib/types';
	import { onMount } from 'svelte';

	let members: MemberRow[] = $state([]);
	let selectedMember: MemberRow | null = $state(null);

	let rooms: RoomRow[] = $state([]);
	let selectedRooms: RoomRow[] | null = $state([]);

	let member_id: string | null = null;

	onMount(async () => {
		members = await getMembers();
		rooms = await getRooms();
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

{#if !members.length}
	<h1 class="text-center text-6xl font-bold">Members Loading...</h1>
{:else}
	<h2 class="flex justify-center text-2xl font-bold">Edit A CoRentor</h2>
	<div class="flex w-full flex-col justify-center">
		<div class="flex justify-center gap-5 pt-5">
			<ul class="flex w-1/3 flex-col space-y-5 rounded-2xl border-2 p-2 align-middle">
				{#each members as m (m.member_id)}
					<li class="flex flex-row p-2">
						<div class="flex w-full flex-col">
							<div class="flex w-full justify-center">
								<button
									type="button"
									class="flex w-full cursor-pointer items-center justify-between gap-8 rounded-l-2xl border p-2 align-middle hover:bg-blue-50"
									onclick={async () => (selectedMember = await getMemberById(m.member_id))}
								>
									<span class="flex w-full text-start">{m.member_name}</span>
									<span class="flex w-full text-start">{m.member_rent} kr</span>
									<span class="flex whitespace-nowrap">{m.member_m2} m²</span>
								</button>
								<button
									class="flex cursor-pointer items-center rounded-r-2xl border border-l-0 p-2 hover:bg-blue-50"
									onclick={async () => {
										await deleteMemberById(m.member_id);
										members = await getMembers();
									}}>Delete</button
								>
							</div>
							{#if selectedMember && selectedMember.member_id === m.member_id}
								<form onsubmit={handleSubmit} class="flex justify-center">
									<div class="flex w-1/2 flex-col items-center justify-center gap-3 pt-3">
										{#each rooms as r (r.room_id)}
											<ul
												class="flex w-full items-center justify-between gap-2 rounded border p-1 px-5"
											>
												<div class="flex items-center justify-start gap-2">
													<input
														class="flex cursor-pointer items-center rounded"
														type="checkbox"
														bind:group={selectedRooms}
														value={r.room_id}
														id={r.room_id}
													/>
													<label
														for={r.room_id}
														class="flex cursor-pointer rounded p-1 hover:bg-blue-50"
														>{r.room_name}</label
													>
												</div>
												<label
													class="flex cursor-pointer rounded p-1 hover:bg-blue-50"
													for={r.room_id}>{r.room_m2} m²</label
												>
											</ul>
										{/each}
										<button class="w-1/2 cursor-pointer rounded border p-1 hover:bg-blue-50"
											>Confirm</button
										>
									</div>
								</form>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<!-- {#if selectedMember} -->
<!-- 	<form onsubmit={handleSubmit} class="flex justify-center"> -->
<!-- 		<div> -->
<!-- 			{#each rooms as r (r.room_id)} -->
<!-- 				<ul> -->
<!-- 					<input type="checkbox" bind:group={selectedRooms} value={r.room_id} id={r.room_id} /> -->
<!-- 					<label for={r.room_id}>{r.room_name}</label> -->
<!-- 				</ul> -->
<!-- 			{/each} -->
<!-- 			<button class="cursor-pointer">Confirm</button> -->
<!-- 		</div> -->
<!-- 	</form> -->
<!-- {/if} -->

<!-- 	{#if selectedMember} -->
<!-- 		<div class="flex w-full justify-center p-5"> -->
<!-- 			<div class="flex w-1/3 justify-between rounded-2xl border-2 p-2"> -->
<!-- 				<form onsubmit={handleSubmit} class=" flex w-full flex-row gap-5"> -->
<!-- 					<div class="flex w-full justify-between"> -->
<!-- 						<label class="flex flex-col"> -->
<!-- 							<input -->
<!-- 								bind:value={member_name} -->
<!-- 								placeholder={selectedMember.member_name} -->
<!-- 								name="member_name" -->
<!-- 								type="text" -->
<!-- 								class="rounded-2xl hover:bg-blue-50" -->
<!-- 							/> -->
<!-- 						</label> -->
<!-- 						<label class="flex flex-col"> -->
<!-- 							<input -->
<!-- 								placeholder={selectedMember.member_m2} -->
<!-- 								bind:value={member_m2} -->
<!-- 								step="0.01" -->
<!-- 								name="member_m2" -->
<!-- 								type="number" -->
<!-- 								class="rounded-2xl hover:bg-blue-50" -->
<!-- 							/> -->
<!-- 						</label> -->
<!-- 						<button -->
<!-- 							class="flex items-center rounded-2xl px-2 hover:bg-blue-50" -->
<!-- 							onclick={async () => (member_id = selectedMember!.member_id)}>Confirm</button -->
<!-- 						> -->
<!-- 					</div> -->
<!-- 				</form> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 	{:else} -->
<!-- 		<div class="flex justify-center"> -->
<!-- 			<p class="m-5 flex rounded-2xl border-2 p-2">Select a member to edit</p> -->
<!-- 		</div> -->
<!-- 	{/if} -->
