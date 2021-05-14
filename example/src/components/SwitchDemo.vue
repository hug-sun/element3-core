<template>
  <Switch
    v-model="enabled"
    :class="enabled ? 'bg-blue-600' : 'bg-gray-200'"
    class="
      relative
      inline-flex
      items-center
      h-6
      transition-colors
      rounded-full
      w-11
      focus:outline-none
      focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
    "
  >
    <draw
      :class="enabled ? 'translate-x-6' : 'translate-x-1'"
      class="
        inline-block
        w-4
        h-4
        transition-transform
        transform
        bg-white
        rounded-full
      "
      :iTime="time"
    >
    </draw>
    <!-- <span
      :class="enabled ? 'translate-x-6' : 'translate-x-1'"
      class="
        inline-block
        w-4
        h-4
        transition-transform
        transform
        bg-white
        rounded-full
      "
    /> -->
  </Switch>
</template>

<script>
import { ref } from "vue";
import { Switch } from "../../../dist/element3-core.esm.js";
import draw from "./draw.frag";
export default {
  components: {
    Switch,
    draw,
  },
  setup() {
    const enabled = ref(false);
    const time = useTime();

    return { enabled, time };
  },
};

function useTime() {
  const iTime = ref(1);
  setInterval(() => {
    iTime.value++;
    if (iTime.value > 100) {
      iTime.value = 1;
    }
  }, 100);

  return iTime;
}
</script>

<style></style>
