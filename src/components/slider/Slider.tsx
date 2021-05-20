import { Ref, unref, defineComponent, h, provide, computed } from "vue";

type sliderContext = {
  setPosition(position: number): any;
  currentPosition: Ref<string>;
  vertical: boolean;
};

export { sliderContext };

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const currentPosition = computed(
      () =>
        `${
          ((props.modelValue - unref(props.min)) /
            (unref(props.max) - unref(props.min))) *
          100
        }%`
    );

    const api = {
      vertical: props.vertical,
      currentPosition,
      setPosition(newPosition) {
        if (newPosition === null || isNaN(newPosition)) return;
        if (newPosition < 0) {
          newPosition = 0;
        } else if (newPosition > 100) {
          newPosition = 100;
        }
        const lengthPerStep = 100 / ((props.max - props.min) / props.step);
        console.log(props.step);
        const steps = Math.round(newPosition / lengthPerStep);
        let value =
          steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min;
        value = parseFloat(value.toFixed(1));

        emit("update:modelValue", value);
      },
    };

    provide("sliderContext", api);
  },

  render() {
    const children = this.$slots.default?.() || [];

    return <div>{children}</div>;
  },
});
