import { createPinia } from "pinia";
import { describe, expect, test } from "vitest";
import useGlobalStore from "@/stores/globalStore.js";
import { mount } from "@vue/test-utils";
import GalleryCard from "@/components/GalleryCard.vue";
import validation from "@/plugin/validation.js";
import i18n from "@/plugin/i18n.js";

describe("Car List", async () => {
    const store = useGlobalStore(createPinia());
    const carList = await store.getCarDetails();
    const wrapper = mount(GalleryCard, {
        global: {
            plugins: [validation, i18n],
            mocks: { carList },
        },
    });

    test("Renders List of cars", () => {
        expect(wrapper.findAll(".card-wrap")).toHaveLength(carList.length);
    });
});
