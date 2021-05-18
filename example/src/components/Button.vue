<template>
  <div>
    <E3Button v-model="enter">
      {{ enter ? "按下" : "抬起" }}
      <draw></draw>
    </E3Button>
  </div>
</template>

<script>
import { E3Button } from "element3-core";
import draw from "./metal2.frag";
import { ref } from "vue";
export default {
  components: {
    E3Button,
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
