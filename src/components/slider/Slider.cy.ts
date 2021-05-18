import { mount } from "@cypress/vue";
import { ref, computed } from "vue";
import SliderButton from "./SliderButton";
import Slider from "./Slider";
describe("Slider", () => {
  it("init", () => {
    const Comp = {
      template: `
      <div>
        <Slider :style="barStyle" v-model="value">
          <SliderButton :style="style">
            <div>{{value}}</div>
          </SliderButton>
        </Slider>
      </div>
      `,
      setup() {
        const width = 400;
        const value = ref(11);
        const style = computed(() => {
          return {
            background: "pink",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            textAlign: "center",
            transform: `translateX(${(value.value / 100) * width}px)`,
          };
        });
        const barStyle = {
          height: "50px",
          background: "red",
          width: width + "px",
        };
        return {
          style,
          value,
          barStyle,
        };
      },
      components: {
        Slider,
        SliderButton,
      },
    };
    mount(Comp, {});
  });

  it("vertical", () => {
    const Comp = {
      template: `
      <div>
        <Slider :style="barStyle" v-model="value" vertical>
          <SliderButton :style="style">
            <div>{{value}}</div>
          </SliderButton>
        </Slider>
      </div>
      `,
      setup() {
        const height = 400;
        const value = ref(11);
        const style = computed(() => {
          return {
            background: "pink",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            textAlign: "center",
            transform: `translateY(${(value.value / 100) * height}px)`,
          };
        });
        const barStyle = {
          width: "50px",
          background: "red",
          height: height + "px",
        };
        return {
          style,
          value,
          barStyle,
        };
      },
      components: {
        Slider,
        SliderButton,
      },
    };
    mount(Comp, {});
  });
});
