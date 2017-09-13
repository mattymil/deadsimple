<template>
    <div class="modal is-active">
    <div @click="closeMe" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Error</p>
          <button @click="closeMe" class="delete" aria-label="close"></button>
        </header>
      <section class="modal-card-body">
        <p>An error has occurred and your email has not been sent. Please contact <a href="mailto:support@digitalvecte.com">our support team</a> for resolution.</p>
      </section>
      <footer class="modal-card-foot">
      </footer>
    </div>
    <button @click="closeMe" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
export default {
  methods: {
    closeMe () {
      this.$emit('closeMe')
    }
  }
}
</script>

<style>

</style>
