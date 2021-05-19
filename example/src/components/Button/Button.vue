<template>
  <div>
    <E3Button
      class="EButton"
      v-model="enter"
      style="position: relative; border-radius: 8px"
    >
      <div
        :style="{ transform: 'translateY(' + (enter ? 2 : 0) + 'px)' }"
        style="
          font-size: 24px;
          position: absolute;
          width: 100%;
          text-align: center;
          line-height: 60px;
          color: rgba(0, 0, 0, 0.6);
          text-shadow: 0px 1px 0px rgba(0,0,0,.2);
          z-index: 2;
        "
      >
        按钮
      </div>
      <draw
        :iTime="3.14159 / 8"
        :m1="m1"
        :m2="m2"
        :r="color.r"
        :g="color.g"
        :b="color.b"
        :style="enter ? buttonEnterStyle : buttonStyle"
        width="100"
        height="60"
        :iWidth="buttonWidth"
        :iHeight="buttonHeight"
      ></draw>
    </E3Button>
  </div>
</template>

<script>
import { E3Button } from "element3-core";
import draw from "../../webglComponents/metal.frag";
import { computed, ref } from "vue";
export default {
  components: {
    E3Button,
    draw,
  },
  props: {
    'type': {
      type: String,
      default: 'normal',
    }
  },
  setup(props) {
    const enter = ref(false);

    const buttonWidth = ref(60);
    const buttonHeight = ref(100);

    const color = computed(()=>{
      if(props.type=="primary"){
        return {
          r:97/255,g:139/255,b:239/255
        }
      }else if(props.type=="success"){
        return {
          r:152/255,g:195/255,b:121/255
        }
      }else if(props.type=="danger"){
        return {
          r:224/255, g:108/255, b:117/255
        }
      }else{
        return {
          r:.1,g:.1,b:.1
        }
      }
    });

    const buttonStyle = {
      width: "100px",
      height: "60px",
      boxShadow: "0px 3px 4px #000",
      borderRadius: "8px",
      transform: "translateY(0px)",
    };
    const buttonEnterStyle = {
      width: "100px",
      height: "60px",
      boxShadow: "0px 1px 4px #000",
      borderRadius: "8px",
      transform: "translateY(2px)",
    };

    const m1 = ref(70);
    const m2 = ref(15);

    return {
      buttonWidth,
      buttonHeight,
      buttonStyle,
      buttonEnterStyle,
      color,
      m1,
      m2,
      enter,
    };
  },
};
</script>

<style>
.EButton:focus {
  outline: none;
}
</style>
