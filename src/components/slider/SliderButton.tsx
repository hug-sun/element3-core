import { defineComponent, h, unref, inject } from "vue";
import { sliderContext } from "./Slider";
export default defineComponent({
  setup() {
    const context = inject<sliderContext>("sliderContext");

    let dragging = false;
    const onDragEnd = () => {
      dragEnd();
      removeEventListeners();
    };

    const onMousedown = (e) => {
      dragStart(e);
      addEventListeners();
    };

    function removeEventListeners() {
      window.removeEventListener("mousemove", onDragging);
      window.removeEventListener("touchmove", onDragging);
      window.removeEventListener("mouseup", onDragEnd);
      window.removeEventListener("touchend", onDragEnd);
    }

    function addEventListeners() {
      window.addEventListener("mousemove", onDragging);
      window.addEventListener("touchmove", onDragging);
      window.addEventListener("mouseup", onDragEnd);
      window.addEventListener("touchend", onDragEnd);
    }

    function dragEnd() {
      dragging = false;
    }

    let startX = 0;
    let startY = 0;
    let startPosition = 0;
    const dragStart = (e) => {
      dragging = true;

      if (e.type === "touchstart") {
        e.clientY = e.touches[0].clientY;
        e.clientX = e.touches[0].clientX;
      }

      startY = e.clientY;
      startX = e.clientX;

      startPosition = parseFloat(unref(context.currentPosition));
    };

    const onDragging = (e) => {
      if (!dragging) return;

      if (e.type === "touchmove") {
        e.clientY = e.touches[0].clientY;
        e.clientX = e.touches[0].clientX;
      }

      if (context.vertical) {
        // 上下
        const currentY = e.clientY;
        const sliderHeight = 400;
        let diffY = ((currentY - startY) / sliderHeight) * 100;
        context.setPosition(diffY + startPosition);
      } else {
        // 处理 左右 移动
        const currentX = e.clientX;
        const sliderWidth = 400;
        let diffX = ((currentX - startX) / sliderWidth) * 100;
        context.setPosition(diffX + startPosition);
      }
    };

    return {
      onMousedown,
    };
  },

  render() {
    const children = this.$slots.default?.() || [];
    return <div onMousedown={this.onMousedown}>{children}</div>;
  },
});
