<script lang="ts">
	import { onMount } from 'svelte';
	import { getHouseById } from '$lib/services/houseApi';
	import { getRooms } from '$lib/services/roomApi';
	import { getMemberData } from '$lib/services/memberApi';
	import type { HouseRow, RoomRow, MemberRow } from '$lib/types';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let house: HouseRow | null = $state(null);
	let house_id: number | null = $state(null);
	let rooms: RoomRow[] = $state([]);
	let member: MemberRow | undefined = $state(undefined);

	onMount(async () => {
		member = await getMemberData();
		if (member) {
			house_id = member.data.house_id;
			house = await getHouseById(member.data.house_id);
		}
		rooms = await getRooms();
		if (!house_id) {
			goto(resolve('/new-user'));
		}
	});
</script>

{#if house}
	<p class="flex justify-center text-4xl font-bold">
		{house!.house_name}
	</p>
{/if}

<div class="flex w-full flex-col justify-center">
	<div class="flex justify-center gap-5 pt-5">
		<ul class="flex flex-col space-y-5 p-4 align-middle sm:w-full lg:w-1/3">
			<p class="flex w-full text-start">House Key: {house_id}</p>
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
