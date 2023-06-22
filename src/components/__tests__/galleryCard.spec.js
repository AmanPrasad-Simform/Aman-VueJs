import { createPinia } from "pinia";
import { describe, expect, test } from "vitest";
import useGlobalStore from "@/stores/globalStore.js";
import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import GalleryCard from "@/components/GalleryCard.vue";

describe("GalleryCard", async () => {
    const store = useGlobalStore(createPinia());
    await store.getCarDetails();
    const carList = store.carList;
    const car = carList[0].id;
    const wrapper = shallowMount(GalleryCard, {
        global: {
            components: { "router-link": RouterLinkStub },
            mocks: {
                $t: (m) => m,
            },
        },
    });
    test("carID is dynamic or not?", () => {
        expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
            name: "carDetail",
            params: { id: `${car}` },
        });
    });
});
