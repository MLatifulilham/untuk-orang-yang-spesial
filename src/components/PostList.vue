<script setup lang="ts">
// 1. Import tipe data yang tadi kita bikin di src/types/post.ts
import type { Post } from '../types/post'
import { ref, onMounted } from 'vue'

// 2. ref<Post[]>([]) artinya:
//    "posts" adalah data reaktif berbentuk ARRAY OF Post, mulai dari array kosong
const posts = ref<Post[]>([])

// 3. State tambahan untuk UX: loading & error
const isLoading = ref(true)
const errorMessage = ref('')

// 4. Fungsi async untuk ambil data dari API publik
async function fetchPosts() {
  try {
    isLoading.value = true
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')

    if (!response.ok) {
      throw new Error('Gagal mengambil data dari server')
    }

    // 5. response.json() hasilnya "any", makanya kita kasih tahu TypeScript
    //    bahwa hasilnya harus berbentuk Post[]
    const data = (await response.json()) as Post[]
    posts.value = data
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Terjadi kesalahan'
  } finally {
    isLoading.value = false
  }
}

// 6. onMounted = jalankan fetchPosts() begitu komponen ini muncul di layar
onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold text-[#243e90] mb-4">
      Daftar Post
    </h1>

    <!-- 7. Kondisi loading -->
    <div v-if="isLoading" class="text-gray-500 text-center py-8">
      Memuat data...
    </div>

    <!-- 8. Kondisi error -->
    <div v-else-if="errorMessage" class="bg-red-100 text-red-700 p-3 rounded-lg">
      {{ errorMessage }}
    </div>

    <!-- 9. Kondisi sukses: tampilkan list dengan v-for -->
    <ul v-else class="space-y-3">
      <li
        v-for="post in posts"
        :key="post.id"
        class="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
      >
        <h2 class="font-semibold text-gray-800 capitalize">
          {{ post.title }}
        </h2>
        <p class="text-sm text-gray-500 mt-1 line-clamp-2">
          {{ post.body }}
        </p>
      </li>
    </ul>
  </div>
</template>
