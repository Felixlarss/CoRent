<script lang="ts">
	import '$lib/layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<ul class="m-5 flex justify-between gap-5">
		<div class="flex flex-row items-center gap-5 p-2">
			<div>
				<a class="p-2 hover:underline" href="/profile">Profile</a>
			</div>
			<div>
				<a class="p-2 hover:underline" href="/home">Home</a>
			</div>
			<!-- <div> -->
			<!-- 	<a class="p-2 hover:underline" href="/home/edit/member">Edit Members</a> -->
			<!-- </div> -->
			<div>
				<a class="p-2 hover:underline" href="/home/edit/house">Edit House</a>
			</div>
		</div>
		<div class="m-2 flex hidden lg:block items-center justify-center text-white">
			<a href="/" class="logo flex justify-center align-middle text-3xl">CoRent</a>
		</div>
	</ul>

	<link rel="icon" href={favicon} /></svelte:head
>
{@render children()}

<style>
	.logo {
		text-shadow: var(--text-shadow-carved);
		color: var(--bg-extra-dark);
		font-weight: 900;
	}
</style>
