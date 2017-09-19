<template>
  <div class="modal is-active">
    <div @click="closeMe" class="modal-background"></div>
      <div class="modal-card is-success">
        <header class="modal-card-head">
          <p class="modal-card-title">{{header}}</p>
          <button @click="closeMe" class="delete" aria-label="close"></button>
        </header>
      <section class="modal-card-body">
        <div v-html="message"></div>
      </section>
      <footer class="modal-card-foot">
      </footer>
    </div>
    <button @click="closeMe" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
export default {
  props: ['message', 'header'],
  methods: {
    closeMe () {
      this.$emit('closeMe')
    }
  }
}
</script>

<style>

</style>
