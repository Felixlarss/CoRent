<script lang="ts">
	let openIndex = $state<number | null>(null);

	function toggleFaq(index: number) {
		openIndex = openIndex === index ? null : index;
	}

	const faqs = [
		{
			question: 'How does CoRent calculate fair rent splits?',
			answer:
				'CoRent calculates rent by having each member pay for their own private spaces while shared areas are split equally among all residents. This ensures that everyone contributes fairly based on what they have exclusive access to, while common spaces like kitchens, living rooms, and bathrooms are shared costs.'
		},
		{
			question: 'Do I need to create an account to use CoRent?',
			answer:
				'Yes, creating an account allows you to save your house setup, manage members, and keep track of rent calculations over time. This also ensures your data is secure and accessible from any device.'
		},
		{
			question: 'What if roommates share a room?',
			answer:
				"You can assign multiple members to the same room. CoRent will split that room's calculated rent equally among all assigned members. This is applicable to rooms aswell, one member can be assigned to multiple rooms."
		},
		// {
		// 	question: 'Can I export or share the rent breakdown?',
		// 	answer:
		// 		'Yes, you can view a detailed breakdown of how rent is calculated for each member. This transparency helps everyone understand and agree on the split. You can share this information with your housemates directly through the app.'
		// },
		{
			question: 'What if our total rent changes?',
			answer:
				"You can update the total rent amount at any time in the house settings. CoRent will automatically recalculate each member's share based on the new total while maintaining the same proportional distribution."
		},
		{
			question: 'Is my data secure?',
			answer:
				'Yes, we take data security seriously. All information is encrypted and stored securely. We only collect the minimum data necessary to provide the service, and we never share your information with third parties.'
		},
		{
			question: 'Can I use CoRent for utilities too?',
			answer:
				'Currently, CoRent is focused on rent splitting. However, the same principles can be applied to utility bills. You could create a separate "house" entry for utilities if you want to use the proportional split method for those costs as well.'
		},
		{
			question: 'What happens if someone moves out?',
			answer:
				'You can easily remove members from your house and reassign rooms. CoRent will automatically recalculate the rent split for the remaining members. You can also add new members when someone moves in.'
		},
		{
			question: 'Is CoRent free to use?',
			answer:
				'Yes, CoRent is currently free to use for all basic features. We believe fair housing should be accessible to everyone.'
		},
		{
			question: 'Can I use CoRent on my phone?',
			answer:
				'Absolutely! CoRent is fully responsive and works on all devices - desktop, tablet, and mobile. You can manage your house and view rent calculations from anywhere.'
		}
	];
</script>

<div class="container mx-auto max-w-4xl p-6">
	<div class="mb-8">
		<h1 class="mb-4 text-center text-5xl">Frequently Asked Questions</h1>
		<p class="text-center text-xl">Everything you need to know about CoRent</p>
	</div>

	<section class="mb-8 p-6">
		<div class="space-y-4">
			{#each faqs as faq, index (faq.question)}
				<div class="pb-4">
					<button
						class="flex w-full items-start justify-between text-left"
						onclick={() => toggleFaq(index)}
					>
						<h3 class="pr-4 text-lg font-semibold">{faq.question}</h3>
						<span
							class="shrink-0 text-2xl transition-transform"
							class:rotate-45={openIndex === index}
						>
							+
						</span>
					</button>
					{#if openIndex === index}
						<div class="animate-fade-in mt-3">
							<p class="leading-relaxed">{faq.answer}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<section class="mb-8 p-6">
		<h2 class="mb-4 text-2xl font-bold">Still have questions?</h2>
		<p class="mb-4 leading-relaxed">
			If you couldn't find the answer you were looking for, feel free to explore the about page to
			learn more about CoRent, or get started and try it out yourself!
		</p>
	</section>

	<section class="p-6 text-center">
		<h2 class="mb-4 text-2xl font-bold">Ready to Get Started?</h2>
		<p class="mb-6">Join CoRent today and make rent splitting fair and transparent.</p>
		<div class="flex justify-center gap-4">
			<a
				href="/about"
				class="rounded-lg bg-white px-6 py-3 font-semibold text-gray-800 shadow-md transition-all hover:shadow-lg"
			>
				Learn More
			</a>
			<a
				href="/signup"
				class="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
			>
				Get Started
			</a>
		</div>
	</section>
</div>

<style>
	.rotate-45 {
		transform: rotate(45deg);
	}

	.animate-fade-in {
		animation: fadeIn 0.3s ease-in;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
