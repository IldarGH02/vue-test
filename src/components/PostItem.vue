<template>
  <li class="post">
    <div class="post__content">
      <h2 class="post_title">Название: {{post.title}}</h2>
      <p class="post__text">Описание: {{post.body}}</p>
    </div>
    <div class="post__actions">
      <my-button
          class="post__open"
          @click="$router.push(`/posts/${post.id}`)"
      >
        Открыть
      </my-button>
      <my-button
          class="post__delete"
          @click="$emit('remove', post)"
      >
        Удалить
      </my-button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  display: flex;
  padding: 15px;
  border: 2px solid teal;
  border-radius: 5px;
  flex-flow: row;
  gap: 15px;
}

.post__actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
}

.post__delete,
.post__open {
  transition: background-color .3s ease, color .3s ease;
}

.post__open:hover {
  background-color: teal;
  color: #fff;
}

.post__delete:hover {
  background-color: red;
  color: #fff;
}
</style>