<script lang="ts">
	import { onMount } from 'svelte';
	import { getHouseById } from '$lib/services/houseApi';
	import { getRooms } from '$lib/services/roomApi';
  import { getMemberData } from '$lib/services/memberApi';
	import type { HouseRow, RoomRow, MemberRow } from '$lib/types';

	let house: HouseRow | null = $state(null);
	let rooms: RoomRow[] = $state([]);
  let member: MemberRow = $state()

	onMount(async () => {
    member = await getMemberData();
		house = await getHouseById(member?.house_id);
		rooms = await getRooms();
	});
</script>
{#if member?.house_id}
{#if house}
	<p class="flex justify-center text-4xl font-bold">
		{house!.house_name}
	</p>
{/if}

<div class="flex w-full flex-col justify-center">
	<div class="flex justify-center gap-5 pt-5">
		<ul class="flex w-1/3 flex-col space-y-5 p-4 align-middle">
			{#each rooms as r (r.room_id)}
				<li class="flex flex-row">
					<div class="flex w-full flex-col">
						<div
							class="flex w-full cursor-pointer items-center justify-between gap-8 p-2 align-middle"
						>
							<span class="flex w-full text-start">{r.room_name}</span>
							<span class="flex text-end whitespace-nowrap">{r.room_m2} m²</span>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
{:else}
<div class="flex w-full justify-center pt-10">
<form class="flex items-center gap-5 flex-col p-5">
    <h1>No house connected</h1>
      <div class="flex justify-center gap-5 flex-row">
      <button class="p-2" onclick={window.location.href ='/make-house'}>Make House</button>
      <button class="p-2" onclick={window.location.href ='/join-house'}>Join House</button>
      </div>
    </form>
  </div>
{/if}
