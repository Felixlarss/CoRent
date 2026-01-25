<script lang="ts">
	import { resolve } from '$app/paths';
	import { getMemberData } from '$lib/services/memberApi';
	import type { MemberRowResponse } from '$lib/types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let member: MemberRowResponse | null = $state(null);

	let loading: boolean = $state(true);

	onMount(async () => {
		member = await getMemberData();
		if (member.ok && member?.data.house_id) {
			await goto(resolve('/home'));
		}
		loading = false;
	});
</script>

{#if !loading}
	<div class="flex w-full justify-center pt-10">
		<form class="flex flex-col items-center gap-5 p-5">
			<h1>No house connected</h1>
			<div class="flex flex-row justify-center gap-5">
				<a class="highlight p-2" href="/make-house">Make House</a>
				<a class="highlight p-2" href="/join-house">Join House</a>
			</div>
		</form>
	</div>
{/if}
