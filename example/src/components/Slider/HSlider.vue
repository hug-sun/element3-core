<template>
  <div>
    <E3Slider :style="sliderStyle" v-model="value">
      <E3SliderButton :style="buttonStyle">
        <draw :iTime="myTime" style="width:50px;height:50px;" width="100" height="100" :iWidth="buttonWidth" :iHeight="buttonHeight"></draw>
      </E3SliderButton>
    </E3Slider>
  </div>
</template>

<script>
import { E3Slider, E3SliderButton } from "element3-core";
import { ref, computed } from "vue";
import draw from "../../metal2.frag";

export default {
  components: {
    E3Slider,
    E3SliderButton,
    draw
  },
  setup() {
    const width = 400;
    const value = ref(0);

    const buttonWidth = ref(100);
    const buttonHeight = ref(100);

    const sliderStyle = {
      height: "18px",
      margin:"0 auto",
      background: "linear-gradient(#333, #666)",
      width: width + "px",
      borderRadius:"9px",
      border:"2px solid #333"
    };

    const myTime = ref(0);

    setInterval(()=>{
      myTime.value = Date.now()/10000%(Math.PI*2);
    },20);

    const buttonStyle = computed(() => {
      return {
        background: "pink",
        borderRadius: "50%",
        overflow:"hidden",
        width: "50px",
        height: "50px",
        textAlign: "center",
        transform: `translate(${(value.value / 100) * width-25}px,-18px)`,
        boxShadow:"0px 3px 4px #000"
      };
    });

    return {
      myTime,
      buttonWidth,
      buttonHeight,
      sliderStyle,
      buttonStyle,
      value,
    };
  },
};
</script>

<style></style>
