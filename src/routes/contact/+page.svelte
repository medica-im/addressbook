<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import LeafletSveltified from '$components/Map/LeafletSveltified.svelte';

	import { createMapData } from '$lib/components/Map/mapData.ts';
	import LeafletMap from '$components/Map/LeafletMap.svelte';
	import { language } from '$lib/store/languageStore.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import LL from '$i18n/i18n-svelte.ts';
	import Fa from 'svelte-fa';
	import Address from '$lib/Address/Address.svelte';

	import { faCaretSquareDown } from '@fortawesome/free-regular-svg-icons';
	import {
		faBuilding,
		faLocationDot,
		faPhone,
		faServer,
		faTimeline,
		faBookMedical,
		faHouse,
		faMapLocationDot,
		faAddressBook,
		faEnvelope,
		faBlog
	} from '@fortawesome/free-solid-svg-icons';

	export let data;

	const createFacilityGeoData = (fData) => {
		let address = fData.contact.address;
		let facilityGeoData = {
			name: 'contact',
			latitude: Number(address?.latitude ?? 0),
			longitude: Number(address?.longitude ?? 0),
			zoom: address?.zoom ?? 0
		};
		return facilityGeoData;
	};
</script>

<svelte:head>
	<title>
		{$LL.CONTACT.TITLE()} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>
<div>
	<!-- programs -->
	<section id="programs" class="bg-surface-100-800-token programs-gradient">
		<div class="section-container">
			<div class="p-4">
				<div class="flex flex-wrap">
					<div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
						<div class="flex flex-wrap pt-12 lg:pt-0">
							<div
								class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12"
							>
								<div class="flex items-start">
									<div class="shrink-0">
										<div
											class="p-4 bg-primary-500 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
										>
											<Fa icon={faLocationDot} size="2x" />
										</div>
									</div>
									<div class="grow ml-6">
										<p class="font-bold mb-1">Siège social</p>
										<Address data={$facilityStore.contact} formattedName={true} />
									</div>
								</div>
							</div>
							<!--div
								class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12"
							>
								<div class="flex align-start">
									<div class="shrink-0">
										<div
											class="p-4 bg-primary-500 rounded-md shadow-md w-14 h-14 flex items-center justify-center"
										>
											<Fa icon={faPhone} size="2x" />
										</div>
									</div>
									<div class="grow ml-6">
										<p class="font-bold mb-1">{capitalizeFirstLetter($LL.PHONE(), $language)}</p>
										<p>Secrétariat</p>
										<a href="tel:+33490163675">0490163675</a>
									</div>
								</div>
							</div-->
						</div>
					</div>

					<div class="grow-0 shrink-0 basis-auto block w-full lg:flex lg:w-6/12 xl:w-4/12">
						<div class="h-64 lg:h-80 w-full">
							<LeafletSveltified data={createMapData(data?.facility?.contact?.address)} />
							<!--LeafletMap geoData={createFacilityGeoData(data.facility)} /-->
							<!--Map data={createMapData(data?.facility?.contact?.address)} /-->
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-8 md:py-12;
	}
	/* Hero Gradient */
	/* prettier-ignore */
	.hero-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
	/* Team Gradient */
	/* prettier-ignore */
	.team-gradient {
		background-image:
			radial-gradient(at 0% 100%, rgba(var(--color-secondary-500) / 0.50) 0px, transparent 50%);
	}
	/* Tailwind Gradient */
	/* prettier-ignore */
	.tailwind-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.50) 0px, transparent 50%),
			radial-gradient(at 100% 100%,  rgba(var(--color-primary-500) / 0.24) 0px, transparent 50%);
	}
	/* Programs Gradient */
	/* prettier-ignore */
	.programs-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 100% 0%,  rgba(var(--color-primary-500) / 0.33) 0px, transparent 50%);
	}
	.map-container-2 {
		height: 500px;
	}
</style>
