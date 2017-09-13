<template>
  <div class="modal is-active">
    <div @click="closeMe" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Success!</p>
          <button @click="closeMe" class="delete" aria-label="close"></button>
        </header>
      <section class="modal-card-body">
        <p>Your email has been sent. Check your inbox and follow the instructions to enable your Dead Simple Notes account. When complete, login <router-link :to="{path: '/login'}">here.</router-link></p>
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
