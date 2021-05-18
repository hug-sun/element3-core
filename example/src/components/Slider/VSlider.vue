<template>
  <div>
    <E3Slider :style="sliderStyle" v-model="value" vertical>
      <E3SliderButton :style="buttonStyle">
        <div>{{ value }}</div>
      </E3SliderButton>
    </E3Slider>
  </div>
</template>

<script>
import { E3Slider, E3SliderButton } from "element3-core";
import { ref, computed } from "vue";
export default {
  components: {
    E3Slider,
    E3SliderButton,
  },
  setup() {
    const height = 400;
    const value = ref(10);
    const buttonStyle = computed(() => {
      return {
        background: "pink",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        textAlign: "center",
        transform: `translateY(${(value.value / 100) * height}px)`,
      };
    });
    const sliderStyle = {
      width: "50px",
      background: "red",
      height: height + "px",
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
