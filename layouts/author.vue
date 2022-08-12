<script setup lang="ts">
defineProps({
  eventLogo: {
    type: String,
  },
  eventUrl: {
    type: String,
  },
  twitter: {
    type: String,
  },
  twitterUrl: {
    type: String,
  },
  presenterImage: {
    type: String,
  },
});
</script>

<template>
  <section class="slidev-layout author">
    <div class="photo">
      <img :src="presenterImage" />
    </div>

    <div class="right">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.author {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
}

.photo img {
  height: 250px;
  width: auto;

  border-radius: 50%;

  box-shadow: 0 0 0 0.5rem #1fff9e;
}
</style>
