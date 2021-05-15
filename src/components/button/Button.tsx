// 状态：
// v-model：
// - 按下 true
// - 抬起 false

import { defineComponent, h } from "vue";
export default defineComponent({
  props: ["modelValue"],
  setup(props, { emit }) {
    const enter = () => {
      emit("update:modelValue", true);
    };

    const putUp = () => {
      emit("update:modelValue", false);
    };

    const onMouseup = () => {
      putUp();
    };

    const onMousedown = () => {
      enter();
    };

    return {
      onMouseup,
      onMousedown,
    };
  },

  render() {
    const children = this.$slots.default?.() || [];
    // TODO 使用 jsx 可以优化生成的 vnode
    return h(
      "button",
      { onMouseup: this.onMouseup, onMousedown: this.onMousedown },
      children
    );
  },
});
