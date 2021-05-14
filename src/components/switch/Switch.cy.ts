import { mount } from "@cypress/vue";
import { ref } from "vue";
import Switch from "./Switch";
describe("Switch", () => {
  it("init", () => {
    mount(Switch, {
      slots: {
        default: "switch",
      },
    });
  });

  it("toggle", () => {
    const Comp = {
      template: `
        <div>
        {{boo}}
        <Switch v-model="boo">switch</Switch> 
        </div>
      `,
      components: {
        Switch,
      },
      setup() {
        const boo = ref(true);

        return {
          boo,
        };
      },
    };

    mount(Comp);

    cy.contains("true");
    cy.get("button").click();
    cy.contains("false");
  });

  it("slots", () => {
    const Comp = {
      template: `
        <div>
        <Switch>hi,element3-core switch</Switch> 
        </div>
      `,
      components: {
        Switch,
      },
    };

    mount(Comp);

    cy.contains("hi,element3-core switch");
  });
});
