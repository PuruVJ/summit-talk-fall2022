<script setup lang="ts"></script>

<template>
  <section class="slidev-layout four-col">
    <div>
      <slot name="col1" />
    </div>

    <div>
      <slot name="col2" />
    </div>

    <div>
      <slot name="col3" />
    </div>

    <div>
      <slot name="col4" />
    </div>
  </section>
</template>

<style scoped>
.four-col {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
}
</style>
