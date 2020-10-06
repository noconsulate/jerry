<template>
  <div>
    <h3>value</h3>
    {{ value }}
    <h3>product</h3>
    {{ product }}
    <div>
      <h3>transaction</h3>
      {{ transaction }}
      </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'product', 'transaction', ]
}
</script>