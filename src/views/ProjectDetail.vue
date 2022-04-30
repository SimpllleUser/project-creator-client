<template>
  <div class="about">
    <h1>Project detail {{ id }}</h1>
  </div>
</template>
<script>
export default {
  name: 'ProjectDetail',
  props: {
    id: {
      type: String,
    }
  },
}
</script>
