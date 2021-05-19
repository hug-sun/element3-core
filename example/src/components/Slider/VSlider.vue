<template>
  <div>
    <E3Slider :style="sliderStyle" v-model="value" vertical>
      <E3SliderButton :style="buttonStyle">
        <draw></draw>
      </E3SliderButton>
    </E3Slider>
  </div>
</template>

<script>
import { E3Slider, E3SliderButton } from "element3-core";
import { ref, computed } from "vue";
import draw from "../../webglComponents/metal2.frag";

export default {
  components: {
    E3Slider,
    E3SliderButton,
    draw
  },
  setup() {
    const height = 400;
    const value = ref(10);
    const buttonStyle = computed(() => {
      return {
        background: "pink",
        borderRadius: "50%",
        overflow:"hidden",
        width: "50px",
        height: "50px",
        textAlign: "center",
        transform: `translate(-18px,${(value.value / 100) * height-25}px)`,
        boxShadow:"0px 3px 4px #000"
      };
    });
    const sliderStyle = {
      width: "18px",
      margin:"0 auto",
      background: "linear-gradient(to left,#333, #666)",
      height: height + "px",
      borderRadius:"9px",
      border:"2px solid #333"
    };
    return {
      buttonStyle,
      value,
      sliderStyle,
    };
  },
};
</script>

<style></style>
