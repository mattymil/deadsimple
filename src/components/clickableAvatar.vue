<template>
    <div>
        <label for="image">
            <input v-on:change="updateFile" type="file" name="image" id="image" style="display:none;"/>
            <avatar :image="url" :size="size" :fullname="fullname"></avatar>
        </label>
        <p>Click to change</p>
    </div>
    
</template>

<script>
import Avatar from './Avatar.vue'

export default {
  mounted () {
      console.log(this.fullname)
  },
  data () {
      return {}
  },  
  props: ['url', 'size', 'fullname'],
  components: {
      Avatar
  },
  methods: {
      updateFile () {
          let file = document.getElementById('image').files[0]
          this.$emit('imageUpdated', file)
      }
  }
}
</script>

<style scoped>
img {
    height: 100px;
    width: 100px;
}
</style>
