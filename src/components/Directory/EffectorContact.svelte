<script lang="ts">
	import Phones from './Phones.svelte';
	import Addresses from './Addresses.svelte';
	import Address from './Address.svelte';
	import Map from '$components/Map/Map.svelte';
	export let effector: any;
</script>

<li>
    <h4 class="h4">{effector.types.map((type) => type.name)}</h4>
</li>
{#if effector.phones?.length}
    <li><Phones data={effector.phones} /></li>
{/if}
{#if effector.address}
    <li><Address data={effector.address} /></li>
{/if}
<div class="h-56 w-64 lg:h-64 lg:w-96 p-2">
    <Map data={effector.address} />
</div>
{#if effector.other_addresses?.length}
    <li><Addresses data={effector.other_addresses} /></li>
{/if}