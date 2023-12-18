<template>
  <div class="posts__page">
    <div class="posts__top">
      <h1 class="posts__title">
        Посты
      </h1>
      <div class="posts__actions">
        <my-button
            @click="showDialog"
        >
          Создать пост
        </my-button>
        <my-select
          v-model="selectedSort"
          :options="sortOptions"
        />
        <my-input
          v-model="searchQuery"
          placeholder="Поиск..."
        />
      </div>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>
    <div class="container">
      <div class="posts__content">
        <post-list
            :posts="sortedAndSearched"
            @remove="removePost"
            v-if="!isLoading"
        />
        <div v-else class="loading">Идёт загрузка...</div>
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList,
    PostForm
  },

  data() {
    return {
      posts: [],
      dialogVisible: false,
      isLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'}
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },

    async fetchPosts() {
      try {
        this.isLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        console.log('Error: ' + e)
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      )
    },
    sortedAndSearched() {
      return this.sortedPosts.filter(post =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-width: 320px;
  scroll-behavior: smooth;
}

.posts__page {
  padding: 20px;
}

.container {
  max-width: 1640px;
  margin: 0 auto;
}

.posts__top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 45px;
}

.posts__actions {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.posts__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  gap: 15px;
}

.posts__title {
  font-weight: 600;
  font-size: 30px;
  line-height: 30px;
}
</style>
