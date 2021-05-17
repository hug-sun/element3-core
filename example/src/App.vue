<template>
  <div>
    hi element3-core
    <div>
      <div>
        <p>switch</p>
        <SwitchDemo></SwitchDemo>
      </div>

      <div>
        <p>button</p>
        <ButtonDemo></ButtonDemo>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import { Switch } from "element3-core";
import { defineComponent } from "vue";
import SwitchDemo from "./components/SwitchDemo.vue";
import ButtonDemo from "./components/ButtonDemo.vue";

export default defineComponent({
  name: "App",
  components: {
    SwitchDemo,
    ButtonDemo,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
