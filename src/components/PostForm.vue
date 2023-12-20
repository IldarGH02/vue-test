<template>
  <form id="form" @submit.prevent>
    <h4 class="form__title">
      Создание поста
    </h4>
    <my-input
        v-focus
        v-model="post.title"
        type="text"
        placeholder="Название"
    />
    <my-input
        v-model="post.body"
        type="text"
        placeholder="Описание"
    />
    <my-button
        class="form__submit"
        @click="createPost"
    >
      Добавить пост
    </my-button>
  </form>
</template>

<script>


export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped>
#form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
}

.form__title {
  font-weight: 500;
  font-size: 30px;
  line-height: 30px;
}
</style>