<template>
  <div>
    <Button v-model="enter">
      {{ enter ? "按下" : "抬起" }}
      <draw></draw>
    </Button>
  </div>
</template>

<script>
import { Button } from "../../../dist/element3-core.esm.js";
import draw from "./metal2.frag";
import { ref } from "vue";
export default {
  components: {
    Button,
    draw,
  },
  setup() {
    const enter = ref(false);

    return {
      enter,
    };
  },
};
</script>

<style></style>
