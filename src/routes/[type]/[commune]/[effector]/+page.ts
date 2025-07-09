import type { PageLoad } from './$types';
import { getEffectors } from '$lib/store/directoryStore.ts';
import { get } from '@square/svelte-store';
import { variables } from '$lib/utils/constants.ts';

function findEffector(effectors, params) {
    return effectors.find(e => e.commune.slug==params.commune && e.effector_type.slug==params.type && e.slug==params.effector)
}

const fetchCareHome = async (fetch, uid) => {
    const apiUrl = `${variables.BASE_API_URI}/carehomes/${uid}`;
    try {
        const response = await fetch(apiUrl);
        if (response?.ok) {
            const data = await response.json();
            return data;
        } else {
            const error = `HTTP Response Code: ${response?.status}`;
            console.error(error)
            throw new Error(error);
        }
    } catch (error) {
        return null;
    }
}

export const load: PageLoad = async ({ fetch, params }) => {
    console.log(JSON.stringify(params))
    const effectors = await getEffectors.load();
    //console.log(`effectors:${JSON.stringify(effectors)}`);

    let effector = findEffector(effectors, params)
    let component;
    const careHomeSlugArray = ['ehpad', 'usld'];
    if (careHomeSlugArray.includes(effector.effector_type.slug)) {
        let careHomeData = await fetchCareHome(fetch, effector.effector_uid);
        effector.careHome=careHomeData;
        if (params.type == "ehpad") {
            component="careHome"
        } else if (params.type == "usld") {
            component="usld"
        }
    } else {
        component="default"
    }
    return {
        //type: params.type,
        //commune: params.commune,
        //effector: params.effector,
        effector: effector,
        component: component
    }
}