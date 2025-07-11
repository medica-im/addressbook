<script lang="ts">
	import { language } from '$lib/store/languageStore';
	import LL from '$i18n/i18n-svelte';
	import { page } from '$app/stores';
	import { writable, type Writable } from 'svelte/store';
	import { variables } from '$lib/utils/constants';
	import DocsIcon from '$components/Icon/Icon.svelte';
	import { menuNavLinks, menuNavCats } from '../../links';
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import SoMed from '$components/SoMed/SoMed.svelte';
	// Stores
	import { storeCurrentUrl } from '$lib/store/skeletonStores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { faBlog } from '@fortawesome/free-solid-svg-icons';
	// Props
	export let embedded = false;
	export let data;

	const drawerStore = getDrawerStore();

	// Local
	let currentRailCategory: keyof typeof menuNavLinks | undefined = undefined;

	const storeCategory: Writable<string> = writable(menuNavCats?.[0]?.id);
	let filteredMenuNavLinks: any[] = menuNavLinks;

	function drawerClose(): void {
     drawerStore.close();
}
	function setNavCategory(c: string): void {
		storeCategory.set(c);
		// prettier-ignore
		switch($storeCategory) {
			case('education'):
			    filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => ['education-therapeutique', 'education-sante'].includes(linkSet?.id));
				break;
			case('msp'):
			    filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => linkSet?.id === 'maison-de-sante');
				break;
			case('prevention'):
			    filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => linkSet?.id === 'prevention');
				break;
		}
	}

	// Lifecycle
	page.subscribe((page) => {
		let path: string = page.url.pathname;
		if (!path) return;
		// Translate path to menuNavCats id
		filteredMenuNavLinks = menuNavLinks.filter((linkSet: any) => {
			return linkSet.list.some((e: any) => e.href == path);
		});
		if (filteredMenuNavLinks.length) {
			let menuNavLinkId = filteredMenuNavLinks[0].id;
			let selectNavCats = menuNavCats.filter((navCat: any) => {
				return navCat.list.some((e: any) => e == menuNavLinkId);
			});
			if (selectNavCats.length) {
				let menuNavCatId: string = selectNavCats[0].id;
				storeCategory.set(menuNavCatId);
			}
		}
	});
	storeCategory.subscribe((c: string) => setNavCategory(c));

	// Reactive
	$: classesActive = (href: string) => {
		return $storeCurrentUrl == href ? 'variant-ringed-primary' : '';
	};
	let currentTile: number = 0;
</script>

<div class="z-50">
<AppRail>
	<AppRailAnchor
		href="/"
		selected={$page.url.pathname === '/'}
		on:click={drawerClose}
	>
		<svelte:fragment slot="lead"
			><DocsIcon name="addressBook" width="w-6" height="h-6" /></svelte:fragment
		>
		<span>{$LL.NAVBAR.ADDRESSBOOK()}</span>
	</AppRailAnchor>
	<AppRailAnchor
		href="/contact"
		selected={$page.url.pathname === '/contact'}
		on:click={() => {
			drawerClose();
		}}
	>
		<svelte:fragment slot="lead"
			><DocsIcon name="envelope" width="w-6" height="h-6" /></svelte:fragment
		>
		<span>Contact</span>
	</AppRailAnchor>
</AppRail>
</div>
<!--div
	class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 {$$props.class ??
		''}"
-->
<!--AppRail background="bg-transparent" border="border-r border-surface-500/30">
		{#if variables.ORGANIZATION_CATEGORY == 'msp'}
			<AppRailTile bind:group={$storeCategory} name={'maison-de-sante'} value={'msp'}>
				<svelte:fragment slot="lead"
					><DocsIcon name="outpatientClinic" width="w-6" height="h-6" /></svelte:fragment
				>
				<span>Maison de santé</span>
			</AppRailTile>
			<AppRailTile bind:group={$storeCategory} name={'education'} value={'education'}>
				<svelte:fragment slot="lead"
					><DocsIcon name="faPersonChalkboard" width="w-6" height="h-6" /></svelte:fragment
				>
				<span>Éducation</span>
			</AppRailTile>
			<AppRailTile bind:group={$storeCategory} name="Prévention" value={'prevention'}>
				<svelte:fragment slot="lead"
					><DocsIcon name="faShieldHeart" width="w-6" height="h-6" /></svelte:fragment
				>
				<span>Prévention</span>
			</AppRailTile>

			<hr class="opacity-30" />
		{/if}
		<AppRailAnchor
		href="/"
		class="lg:hidden"
		on:click={() => {
			onClickAnchor();
		}}
	>
		<svelte:fragment slot="lead"
			><DocsIcon name="addressBook" width="w-6" height="h-6" /></svelte:fragment
		>
		<span>{$LL.NAVBAR.ADDRESSBOOK()}</span>
	</AppRailAnchor>
		<AppRailAnchor
			href="/sites"
			class="lg:hidden"
			on:click={() => {
				onClickAnchor();
			}}
		>
			<svelte:fragment slot="lead"
				><DocsIcon name="mapLocationDot" width="w-6" height="h-6" /></svelte:fragment
			>
			<span>Sites</span>
		</AppRailAnchor>
		<AppRailAnchor
			href="/contact"
			class="lg:hidden"
			on:click={() => {
				onClickAnchor();
			}}
		>
			<svelte:fragment slot="lead"
				><DocsIcon name="envelope" width="w-6" height="h-6" /></svelte:fragment
			>
			<span>Contact</span>
		</AppRailAnchor>
		{#if variables.BLOG_URI}
			<AppRailAnchor
				href={variables.BLOG_URI}
				rel="external"
				class="lg:hidden"
				on:click={() => {
					onClickAnchor();
				}}
			>
				<svelte:fragment slot="lead"
					><Fa icon={faBlog} size="lg" class="inline-block outline-none" /></svelte:fragment
				>
				<span>Blog</span>
			</AppRailAnchor>
		{/if}

		<SoMed data={data.contact.socialnetworks} appRail={true} />
	</AppRail>
	{#if filteredMenuNavLinks.length}
	<section class="p-4 pb-20 space-y-4 overflow-y-auto">
		{#each filteredMenuNavLinks as { id, title, href, list }, i}
			{#if list.length > 0}
				<div {id} class="text-primary-700 dark:text-primary-500 font-bold uppercase px-4">
					{title[$language]}
				</div>
				<nav class="list-nav">
					<ul>
						{#each list as { href, label, badge }}
							<li on:click={onListItemClick} on:keypress>
								<a {href} class={classesActive(href)} data-sveltekit-preload-data="hover">
									<span class="flex-auto">{@html label}</span>
									{#if badge}<span class="badge variant-filled-secondary">{badge}</span>{/if}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
				{#if i + 1 < filteredMenuNavLinks.length}<hr class="!my-6 opacity-50" />{/if}
			{/if}
		{/each}
	</section-->
<!--/div-->
