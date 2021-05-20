<template>
  <div style="height:1000px;">
    hi element3-core
    <div>
      <div>
        <p>switch</p>
        <Switch></Switch>
      </div>

      <div>
        <p>button</p>
        <div style="display:flex;justify-content:space-evenly;">
        <Button type="success" label="success"></Button>
        <Button type="danger" label="danger"></Button>
        <Button type="primary" label="primary"></Button>
        </div>
      </div>

      <div>
        <p>slider 水平</p>
        <HSlider></HSlider>
      </div>

      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Switch from "./components/Switch/Switch.vue";
import Button from "./components/Button/Button.vue";
import HSlider from "./components/Slider/HSlider.vue";
import RotateSlider from "./components/Slider/RotateSlider.vue";
import { ref, computed } from "vue";

export default defineComponent({
  name: "App",
  components: {
    Switch,
    Button,
    HSlider,
    RotateSlider
  },
  setup(){
    const slideR = ref(0);
    const slideG = ref(0);
    const slideB = ref(0);

    const colorR = computed(()=>{
      return slideR.value/255;
    });
    const colorG = computed(()=>{
      return slideG.value/255;
    });
    const colorB = computed(()=>{
      return slideB.value/255;
    });

    return {
      colorR,
      colorG,
      colorB,
      slideR,
      slideG,
      slideB
    }
  }
});
</script>

<style>
*{
  box-sizing: border-box;
  user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background: radial-gradient(#000 16%, transparent 17%), radial-gradient(#444 16%, transparent 17%) 0px 1px, radial-gradient(#000 16%, transparent 17%) 8px 8px, radial-gradient(#444 16%, transparent 17%) 8px 9px;
    background-color: #282828;
    background-size: 16px 16px;
}
</style>
