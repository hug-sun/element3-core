<template>
  <div>
    <E3Slider :style="sliderStyle" v-model="value">
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
    const width = 400;
    const value = ref(10);

    const sliderStyle = {
      height: "50px",
      background: "red",
      width: width + "px",
    };

    const buttonStyle = computed(() => {
      return {
        background: "pink",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        textAlign: "center",
        transform: `translateX(${(value.value / 100) * width}px)`,
      };
    });

    return {
      sliderStyle,
      buttonStyle,
      value,
    };
  },
};
</script>

<style></style>
