<script lang="ts">

import type { RoomRow, MemberRow } from '$lib/types';
import { onMount } from 'svelte';

import { addHouse } from '../../lib/services/houseApi.ts'
import { addMemberRoom } from '../../lib/services/memberRoomApi.ts'
import { getMemberData } from '../../lib/services/memberApi.ts'
import { addRoom } from '../../lib/services/roomApi.ts'

import { goto } from '$app/navigation';
import { resolve } from '$app/paths';

let house_name: string = $state()
let house_rent: number = $state()
let house_m2: number = $state()

let rooms: RoomRow[] = $state([])
let room_id: string = $state("")
let temp_room_id: number = $state(0)

let member: MemberRow = $state()
let house_id: string = $state("")

async function addEmptyRoom() {
    rooms.push({"room_name": "", "room_m2": null, "room_id": temp_room_id})
    temp_room_id++
}

	onMount(async () => {
    addEmptyRoom()
    member = await getMemberData()
    house_id = member?.house_id
    if (member?.house_id) {
      goto(resolve('/home'))
    }
	});

async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
      if (!member.house_id) {
    house_id = await addHouse(house_name, house_rent, house_m2);
    rooms.forEach( async r => {
      room_id = await addRoom(r.room_name, r.room_m2, house_id.House_added?.house_id)
    if (r.room_id === 0)
      row = await addMemberRoom(room_id.Room_added?.room_id, member.member_id)
    });
  }
  await goto(resolve('/home'))
}

</script>

{#if !member?.house_id}

<div class="flex w-full justify-center">
	<form class="flex w-1/4 flex-col items-center justify-center py-5">
		<h2 class="flex justify-center font-bold">Add A House</h2>
		<label class="mt-5 flex w-full items-center justify-center">
			<input required placeholder="Name" type="text" name="house_name" bind:value={house_name} />
		</label>
		<label class="mt-5 flex w-full items-center justify-center">
			<input required placeholder="Rent" type="number" name="house_rent" bind:value={house_rent} />
		</label>
		<label class="mt-5 flex w-full items-center justify-center">
			<input required placeholder="Area" type="number" name="house_m2" bind:value={house_m2} />
		</label>
    {#each rooms as r (r.room_id)}
    <h2 class="pt-5">Room {rooms.indexOf(r) + 1}</h2>
{#if rooms.indexOf(r) === 0} <h1>(Your Room)</h1>{/if}
		<label class="mt-5 flex w-full items-center justify-center">
			<input required placeholder="Name" type="text" name="room_name" bind:value={r.room_name} />
		</label>
		<label class="mt-5 flex w-full items-center justify-center">
			<input required placeholder="Area" type="number" name="room_m2" bind:value={r.room_m2} />
		</label>
    {/each}
      <button onclick={addEmptyRoom} type="button" class="my-3 p-2">Add Room</button>
		<button onclick={handleSubmit} class="my-3 p-2">Add</button>
	</form>
</div>
{:else}
  {window.location.href='/home'}
{/if}
