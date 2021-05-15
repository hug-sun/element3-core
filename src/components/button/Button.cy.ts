import { mount } from "@cypress/vue";
import { ref } from "vue";
import Button from "./Button";
describe("Button", () => {
  it("init", () => {
    mount(Button, {
      slots: {
        default: "click",
      },
    });
  });

  it("enter", () => {
    const Comp = {
      template: `
        <div>
        {{boo}}
        <Button v-model="boo">btn</Button> 
        </div>
      `,
      components: {
        Button,
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
        <Button>hi,element3-core button</Button>
        </div>
      `,
      components: {
        Button,
      },
    };

    mount(Comp);

    cy.contains("hi,element3-core button");
  });
});
