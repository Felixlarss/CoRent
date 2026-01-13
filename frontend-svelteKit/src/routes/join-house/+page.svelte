<script lang="ts">

import type { RoomRow, MemberRow, HouseRow } from '$lib/types';
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { addMemberRoom } from '../../lib/services/memberRoomApi.ts'
import { getMemberData } from '../../lib/services/memberApi.ts'
	import { getRooms, getRoomsById } from '$lib/services/roomApi.ts';
	import { getHouseById } from '$lib/services/houseApi.ts';

let house: HouseRow = $state()
let house_id: string = $state("")

let rooms: RoomRow[] = $state([])
let room_ids: RoomRow[] = $state([])

let member: MemberRow = $state()

let submitted: boolean = $state(false)


	onMount(async () => {
    member = await getMemberData()
	});

async function handleSubmit1(event: SubmitEvent) {
  event.preventDefault();
  rooms = await getRoomsById(house_id)
  house = await getHouseById(house_id)
  submitted = true
}

async function handleSubmit2(event: SubmitEvent) {
  event.preventDefault();
  room_ids.forEach(r => {
    addMemberRoom(r, member?.member_id)
  });
goto(resolve('/home'))
}

</script>

{#if !member?.house_id}

{#if !submitted}
<div class="flex w-full justify-center">
	<form class="flex w-1/4 flex-col items-center justify-center py-5">
		<h2 class="flex justify-center font-bold">Add A House</h2>
		<label class="mt-5 flex w-full items-center justify-center">
			<input required placeholder="House Key" type="number" name="house_id" bind:value={house_id} />
		</label>
		<button onclick={handleSubmit1} class="my-3 p-2">Join</button>
	</form>
</div>
{:else}
  <div class="flex w-full justify-center">
	<form class="flex w-1/4 flex-col items-center justify-center py-5">
		<h2 class="flex justify-center font-bold">What room(s) is yours?</h2>
		<h1 class="flex justify-center font-bold text-2xl pt-2">{house.house_name}</h1>
    {#each rooms as r (r.room_id)}
		<li class="mt-5 flex items-center justify-between w-2/3 p-3">
          <div class="justify-start gap-3 flex-row items-center flex">
        <input type="checkbox" bind:group={room_ids} value={r.room_id}>
        <p>{r.room_name}</p>
          </div>
        <p>{r.room_m2} m2</p>
		</li>
    {/each}
		<button onclick={handleSubmit2} class="my-3 p-2">Join</button>
	</form>
  </div>
{/if}
{:else}
  {goto(resolve('/home'))}
{/if}
