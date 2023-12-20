<template>
  <div class="posts__page">
    <div class="posts__top">
      <h1 class="posts__title">
        Посты
      </h1>
      <div class="posts__actions">
        <my-input
            v-model="searchQuery"
            placeholder="Поиск..."
            class="posts__search"
        />
        <my-button
            @click="showDialog"
            class="posts__create"
        >
          Создать пост
        </my-button>
        <my-select
            v-model="selectedSort"
            :options="sortOptions"
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
        <div ref="observer" class="observer"></div>
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
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        console.log('Error: ' + e)
      }
    },
  },
  mounted() {
    this.fetchPosts()
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }

    const callback = (entries, observer) => {
      if(entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.observer)
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
  },
  watch: {

  }
}
</script>

<style>
.posts__page {
  padding: 20px;
}

.posts__top {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  margin-bottom: 45px;
}

.posts__actions {
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: calc(100% - 15px);
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

.posts__search {
  min-width: 200px;
  width: 100%;
}

.posts__create {
  min-width: 200px;
}

.observer {

}

@media (max-width: 1400px) {
  .posts__top {
    flex-direction: column;
    justify-content: center;
  }

  .posts__actions {
    flex-direction: column;
    align-items: center;
  }

  .posts__create {
    width: fit-content;
  }
}

</style>
