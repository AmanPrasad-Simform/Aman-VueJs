import { createPinia } from "pinia";
import { describe, expect, test } from "vitest";
import useGlobalStore from "@/stores/globalStore.js";
describe("stores", () => {
    const store = useGlobalStore(createPinia());
    test("authenticated user", async () => {
        await store.postLoginDetails({
            email: "test@123.co",
            password: "test@123",
        });
        console.log(store.isLoggedIn);
        expect(store.isLoggedIn).toBe(true);
    });
});
