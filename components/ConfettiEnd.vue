<script setup>
import ConfettiExplosion from 'vue-confetti-explosion';

let particleCount = 300;
</script>

<template>
  <ConfettiExplosion
    :force="0.9"
    :particleCount="particleCount"
    duration="4000"
    style="--x: 72%; --y: -33vh"
  />
  <ConfettiExplosion
    :colors="['#90EE90', '#a2cffe', 'hotpink', '#FFFF00', '#39FF14']"
    :force="0.9"
    :particleCount="particleCount"
    duration="4000"
    style="--x: 22%; --y: -27vh"
  />
</template>

<!-- 
  :colors="['#90EE90', '#a2cffe', 'hotpink', '#FFFF00', '#39FF14']"
 -->
