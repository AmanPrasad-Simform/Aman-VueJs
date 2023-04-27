import { Form as VForm, Field as VField, defineRule, ErrorMessage } from "vee-validate"
import { required, min, max, alpha_spaces as alphaSpaces, integer } from "@vee-validate/rules"

export default {
    install(app) {
        app.component("VForm", VForm);
        app.component("VField", VField);
        app.component("ErrorMessage", ErrorMessage);

        defineRule("required", required);
        defineRule("min", min);
        defineRule("max", max);
        defineRule("alphaSpaces", alphaSpaces);
        defineRule("integer", integer);

    }
}