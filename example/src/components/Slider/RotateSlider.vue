<template>
  <div>
    <E3Slider v-model="value">
      <E3SliderButton :style="buttonStyle">
        <div style="background:rgba(0,0,0,.3);top:180px;left:95px;border-radius:50%;width:10px;height:10px;position:absolute;z-index:2;"></div>
        <draw style="border-radius:50%;" :iTime="0" :width="buttonWidth" :height="buttonHeight" :iWidth="buttonWidth" :iHeight="buttonHeight"></draw>
      </E3SliderButton>
    </E3Slider>
  </div>
</template>

<script>
import { E3Slider, E3SliderButton } from "element3-core";
import { ref, computed } from "vue";
import draw from "../../webglComponents/metal3.frag";

export default {
  components: {
    E3Slider,
    E3SliderButton,
    draw
  },
  setup() {
    const buttonWidth = ref(100);
    const buttonHeight = ref(100);
    const value = ref(0);
    const buttonStyle = computed(() => {
      return {
        width:buttonWidth.value+"px",
        height:buttonHeight.value+"px",
        position:"relative",
        overflow:"hidden",
        borderRadius:"50%",
        boxShadow:"0px 3px 4px #000",
        transform:"rotate("+Math.ceil(value.value/100*360)+"deg)",
        overflow:"hidden"
      };
    });
    return {
      buttonStyle,
      buttonWidth,
      buttonHeight,
      value
    };
  },
};
</script>

<style></style>
