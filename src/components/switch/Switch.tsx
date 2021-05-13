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
    // todo 使用 jsx 可以优化生成的 vnode
    return h("button", { onClick: this.onClick }, children);
  },
});
