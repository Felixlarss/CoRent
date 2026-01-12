<script lang="ts">
	import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
	import { getHouseById } from '$lib/services/houseApi';
	import { getRooms, addRoom } from '$lib/services/roomApi';
  import { getMemberData } from '$lib/services/memberApi';
	import type { HouseRow, RoomRow, MemberRow } from '$lib/types';

	let house: HouseRow | null = $state(null);
	let rooms: RoomRow[] = $state([]);
  let member: MemberRow = $state()

  let new_rooms: RoomRow[] = $state([])
  let temp_room_id: number = $state(0)
  let add_room_state: boolean = $state(false)


  async function addEmptyRoom() {
    new_rooms.push({"room_name": "", "room_m2": null, "room_id": temp_room_id})
    temp_room_id++
  }

	onMount(async () => {
    addEmptyRoom()
    member = await getMemberData();
		house = await getHouseById(member?.house_id);
		rooms = await getRooms();
    if (!member?.house_id){
      await goto(resolve('/'))
    }
	});

    async function handleSubmit(event: SubmitEvent){
    event.preventDefault();
    new_rooms.forEach( async r => {
      await addRoom(r.room_name, r.room_m2, house.house_id)
    add_room_state = false
      rooms = await getRooms()
    });
    }

</script>
{#if member?.house_id}
{#if house}
	<p class="flex justify-center text-4xl font-bold">
		{house!.house_name}
	</p>
{/if}

<div class="flex gap-5  w-full flex-col justify-center">
	<div class="flex justify-center gap-5 items-center flex-col pt-5">
      <form class="flex items-center justify-center p-3 gap-3 w-1/3">
      <h1 class="flex text-3xl justify-center text-center">House Key:</h1>
      <h1 class="flex text-3xl justify-center text-center">{member?.house_id}</h1>
      </form>
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
  <div class="flex justify-center">
      {#if !add_room_state}
    <button onclick={add_room_state = true} class="w-min whitespace-nowrap p-2">add room</button>
      {/if}
    {#if add_room_state}
<form class="px-3">
    {#each new_rooms as r (r.room_id)}
    <h2 class="pt-5">Room {new_rooms.indexOf(r) + 1}</h2>
		<label class="mt-5 flex w-full items-center justify-center">
			<input required placeholder="Name" type="text" name="room_name" bind:value={r.room_name} />
		</label>
		<label class="mt-5 flex w-full items-center justify-center">
			<input required placeholder="Area" type="number" name="room_m2" bind:value={r.room_m2} />
		</label>
    {/each}
      <button onclick={handleSubmit} type="button" class="my-3 p-2">Add Room</button>
    </form>
      {/if}
  </div>
</div>
{/if}
