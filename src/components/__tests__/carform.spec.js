import { createPinia } from "pinia";
import { describe, expect, test } from "vitest";
import useGlobalStore from "@/stores/globalStore.js";
import { mount, shallowMount } from "@vue/test-utils";
import CarForm from "@/components/CarForm.vue";
import validation from "@/plugin/validation.js";
import i18n from "@/plugin/i18n.js";

describe("CarForm.vue", () => {
    const store = useGlobalStore(createPinia());
    const wrapper = mount(CarForm, {
        global: {
            plugins: [validation, i18n],
            $t: (m) => m,
            mocks: {
                modalType: "edit",
            },
        },
    });

    test("renders correct modaltype", () => {
        expect(wrapper.find(".modal-title").text()).toContain(
            "Edit Car Details"
        );
    });
    test("renders correct button", () => {
        console.log(wrapper.find(".modal-body"));
        expect(wrapper.find(".modal-footer").text()).toContain("Update");
    });
});
