<script lang="ts">
	import '$lib/layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { getMemberData } from '$lib/services/memberApi';
	import type { MemberRowResponse } from '$lib/types';

	let member: MemberRowResponse | null = $state(null);
	let loading: boolean = $state(true);

	onMount(async () => {
		member = await getMemberData();
		loading = false;
	});
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ul class="m-5 flex flex-col justify-between gap-5 p-2 lg:flex-row">
	<div class="flex flex-row items-center justify-center gap-5 p-2 lg:justify-start">
		<div>
			<a class="p-2 hover:underline" href={member ? '/profile' : '/about'}
				>{loading ? '' : member ? 'Profile' : 'About'}</a
			>
		</div>
		<div>
			<a class="p-2 hover:underline" href={member ? '/home' : '/faq'}
				>{loading ? '' : member ? 'Home' : 'FAQ'}</a
			>
		</div>
		{#if member}
			<div>
				<a class="p-2 hover:underline" href="/home/edit/house">Edit House</a>
			</div>
		{/if}
	</div>
	<div class="m-2 flex items-center justify-center text-white lg:flex">
		<a href="/" class="logo flex justify-center align-middle text-3xl">CoRent</a>
	</div>
</ul>

{@render children()}

<style>
	.logo {
		text-shadow: var(--text-shadow-carved);
		color: var(--bg-extra-dark);
		font-weight: 900;
	}
</style>
