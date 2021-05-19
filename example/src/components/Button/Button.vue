<template>
  <div>
    <E3Button class="EButton" v-model="enter" style="position:relative;border-radius:8px;">
      <div :style="{transform:'translateY('+(enter?2:0)+'px)'}" style="font-size:24px;position:absolute;width:100%;text-align:center;line-height:60px;color:rgba(0,0,0,.6);text-shadow:0px 2px 1px #bbb;z-index:2;">按钮</div>
      <draw :iTime="3.14159/8" :m1="m1" :m2="m2" :r="r" :g="g" :b="b" :style="enter?buttonEnterStyle:buttonStyle" width="100" height="60" :iWidth="buttonWidth" :iHeight="buttonHeight"></draw>
    </E3Button>
  </div>
</template>

<script>
import { E3Button } from "element3-core";
import draw from "../../metal2.frag";
import { ref } from "vue";
export default {
  components: {
    E3Button,
    draw,
  },
  props:{
    r:{
      type: Number,
      default: .5
    },
    g:{
      type: Number,
      default: .5
    },
    b:{
      type: Number,
      default: .5
    }
  },
  setup(props) {
    const enter = ref(false);

    const buttonWidth = ref(60);
    const buttonHeight = ref(100);

    const buttonStyle ={
      width:"100px",
      height:"60px",
      boxShadow:"0px 3px 4px #000",
      borderRadius:"6px",
      transform:"translateY(0px)"
    }
    const buttonEnterStyle ={
      width:"100px",
      height:"60px",
      boxShadow:"0px 1px 4px #000",
      borderRadius:"6px",
      transform:"translateY(2px)"
    }

    const m1 = ref(75);
    const m2 =ref(40);

    return {
      buttonWidth,
      buttonHeight,
      buttonStyle,
      buttonEnterStyle,
      m1,
      m2,
      enter,
    };
  },
};
</script>

<style>
  .EButton:focus
  {
    outline: none;
  }
</style>
