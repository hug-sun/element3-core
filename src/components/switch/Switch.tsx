import { defineComponent, h } from "vue";
export default defineComponent({
  props: ["modelValue"],
  setup(props, { emit }) {
    const toggle = () => {
      emit("update:modelValue", !props.modelValue);
    };

    const onClick = () => {
      toggle();
    };

    return {
      onClick,
    };
  },

  render() {
    const children = this.$slots.default?.() || [];
    return <button onClick={this.onClick}>{children}</button>;
  },
});
