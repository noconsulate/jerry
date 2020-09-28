<template>
  <div>
    <h3>value</h3>
    {{ value }}
    <h3>product</h3>
    {{ product }}
  </div>
</template>

<script>
export default {
  props: ['value', 'product',]
}
</script>