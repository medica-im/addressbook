<script lang="ts">
	import Select from 'svelte-select';
	import { onMount } from 'svelte';
	import { getSituations, situations, selectSituation, selectSituationValue } from '$lib/store/directoryStore.ts';
	import LL from '$i18n/i18n-svelte';
	import { get } from '@square/svelte-store';
	const label = 'label';
	const itemId = 'value';

	onMount(() => {
		selectSituationValue.set(getValue());
	});

	function getValue() {
		let sSituation = get(selectSituation);
		//console.log(`sSituation:${sSituation}`);
		if (sSituation == '') {
			return '';
		} else {
			let s = get(situations);
			//console.log(`s: ${JSON.stringify(s)}`);
			//console.log(`typeof s: ${typeof(s)}`);
			if (s) {
				let val = s.find((x) => sSituation == x.value);
				//console.log(`getValue(): ${JSON.stringify(val)}`);
				return val;
			}
		}
	}

	function handleClear(event) {
		if (event.detail) {
			selectSituation.set("");
		}
	}

	function handleChange(event) {
		//console.log(event);
		if (event.detail) {
			//console.log(event.detail);
			//console.log(event.detail.value);
			selectSituation.set(event.detail.value);
		}
	}
</script>
<!--
$selectSituation: {$selectSituation}<br>
value: {JSON.stringify(value)}
-->
{#await situations.load()}
	<div class="text-surface-700 theme">
		<Select loading={true} placeholder={$LL.ADDRESSBOOK.SITUATIONS.PLACEHOLDER()} />
	</div>
{:then}
	<div class="text-surface-700 theme">
		<Select
			{label}
			{itemId}
			items={$situations}
			searchable={false}
			on:change={handleChange}
			on:clear={handleClear}
			placeholder={$LL.ADDRESSBOOK.SITUATIONS.PLACEHOLDER()}
			bind:value={$selectSituationValue}
		/>
	</div>
{/await}

<style>
	/*
			CSS variables can be used to control theming.
			https://github.com/rob-balfre/svelte-select/blob/master/docs/theming_variables.md
	*/
	.theme {
		--border-radius: var(--theme-rounded-container);
		--border-color: rgb(var(--color-secondary-500));
		--border-focused: 1px solid rgb(var(--color-secondary-500));
		--border-hover: 1px solid rgb(var(--color-secondary-500));
		--item-active-outline: 1px solid rgb(var(--color-secondary-500));
		--item-outline: 1px solid rgb(var(--color-secondary-500));
		--clear-select-focus-outline: 1px solid rgb(var(--color-secondary-500));
		--height: 3rem;
		--list-z-index: 2000;
	}
</style>