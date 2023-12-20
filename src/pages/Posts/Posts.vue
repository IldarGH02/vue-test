<template>
  <div class="posts__page">
    <div class="posts__top">
      <h1 class="posts__title">
        Посты
      </h1>
      <div class="posts__actions">
        <my-input
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
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
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
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
        <div v-intersection="loadMorePosts" class="observer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
import {mapGetters, mapState, mapActions, mapMutations} from 'vuex'
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
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: "setPage",
      setSearchQuery: "setSearchQuery",
      setSelectedSort: "setSelectedSort"
    }),
    ...mapActions({
      loadMorePosts: "loadMorePosts",
      fetchPosts: 'fetchPosts'
    }),

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


  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.posts,
      isLoading: state => state.isLoading,
      selectedSort: state => state.selectedSort,
      sortOptions: state => state.sortOptions,
      searchQuery: state => state.searchQuery,
      page: state => state.page,
      limit: state => state.limit,
      totalPages: state => state.totalPages
    }),
    ...mapGetters({
      sortedPosts: "sortedPosts",
      sortedAndSearched: "sortedAndSearched",
    })
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
