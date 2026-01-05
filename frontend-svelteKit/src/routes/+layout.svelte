<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<ul class="w-fill m-5 flex justify-between gap-5 rounded-2xl border-2">
		<div class="flex flex-row items-center gap-5 p-2">
			<li>
				<a class="rounded-2xl p-2 hover:bg-blue-50" href="/">Home</a>
			</li>
			<li>
				<a class="rounded-2xl p-2 hover:bg-blue-50" href="/add">Add</a>
			</li>
			<li>
				<a class="rounded-2xl p-2 hover:bg-blue-50" href="/edit">Edit</a>
			</li>
		</div>
		<li class="flex items-center p-2 align-middle">
			<a href="/" class="flex justify-center align-middle text-3xl">CoRent</a>
		</li>
	</ul>

	<link rel="icon" href={favicon} /></svelte:head
>
{@render children()}
