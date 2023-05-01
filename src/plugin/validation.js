import { Form as VForm, Field as VField, defineRule, ErrorMessage, configure } from "vee-validate"
import { required, min, max, alpha_num as alphaSpaces, integer } from "@vee-validate/rules"

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

        configure({
            generateMessage: (ctx) => {
                const messages = {
                    required: `The field ${ctx.field} is required.`,
                    min: `The field ${ctx.field} is too short.`,
                    max: `The field ${ctx.field} is too large.`,
                    alphaSpaces: `The field ${ctx.field} may contain alphabetic characters or spaces`,
                    integer: `The field ${ctx.field} must be an integer.`,
                };

                const message3 = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid`;
                return message3;
            }
        })
    }
}