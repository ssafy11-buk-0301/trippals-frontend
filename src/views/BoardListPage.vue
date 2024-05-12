<script setup>
import { ref } from 'vue'
import BoardCard from '@/components/BoardCard.vue'
import BoardListView from '@/components/BoardListView.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const insertBoardPage = () => {
  router.push({
    path: '/boards/insert'
  })
}
let newest = ref(true)

let setNewest = (value) => {
  newest.value = value
}

let board = {
  thumbnail:
    'https://media.cntraveler.com/photos/5edfc029b16364ea435ca862/master/pass/Roadtrip-2020-GettyImages-1151192650.jpg',
  boardId: 1,
  title: 'Board1',
  content:
    '여행이란 각자가 살아온 환경과 문화와 생활에서 탈출하여 새로운 경험에 도전하는 것이다. 각자 살던 곳은 그 문화가 좋은 것 이든지 혹은 그렇지 않은 것 이든지 관계없이 모든 것이 나에게 맞춰져 있고 불편한 것도 살면서 내가 적응이 되어서 불편함이 없이 살아왔다. 그러나 여행지에 나오면 언어와 관습의 차이는 물론 음식 문화의 차이 등이 생소 함으로 인해 불편함을 느낄 수가 있는데 사실은 그 불편함은 내가 일상적으로 경험하지 못한 상황을 겪어보는 것이  여행이라고 보아도 과언이 아니다.',
  readCount: 3,
  registerDate: new Date('2024-05-01'),
  writer: 'fosong'
}
let boardList = ref([board, board, board, board, board])
</script>

<template>
  <div class="container">
    <h3 class="display-6 fw-bold mb-3 mt-3">Board</h3>
    <div class="input-group w-75 mx-auto mb-4">
      <label class="input-group-text searchForm" for="searchKeyword"
        ><i class="bi bi-search fs-4"></i
      ></label>
      <input
        type="text"
        class="form-control searchForm"
        id="searchKeyword"
        aria-describedby="inputGroupFileAddon04"
        aria-label="Upload"
      />
      <button class="btn btn-warning fw-bold" type="button" id="searchButton">Search</button>
    </div>
    <div class="d-flex w-100">
      <button class="btn btn-warning fw-bold ms-auto" @click="insertBoardPage">글쓰기</button>
    </div>
    <ul class="nav nav-tabs justify-content-center" id="boardNav">
      <li class="nav-item">
        <button @click="setNewest(true)" class="nav-link" :class="{ active: newest }">
          Newest
        </button>
      </li>
      <li class="nav-item">
        <button @click="setNewest(false)" class="nav-link" :class="{ active: !newest }">
          Popular
        </button>
      </li>
    </ul>
    <BoardListView :boardList="boardList" />

    <nav class="ms-auto w-100 my-5 pt-5">
      <ul class="pagination">
        <li class="page-item ms-auto">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link active" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item me-auto">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.searchForm {
  border: none;
  color: #9c9c4a;
  background-color: #f5f5e8;
  height: 60px;
  border-radius: 50%;
}

.searchForm::selection,
.searchForm:focus {
  outline: none !important;
  background-color: #f5f5e8;
  border-color: black;
  box-shadow: 0 0 2px black;
}

#searchButton {
  border-top-right-radius: 30%;
  border-bottom-right-radius: 30%;
}

.nav-tabs .nav-item .nav-link {
  color: #9c9c4a;
}

.nav-tabs .nav-item .nav-link.active {
  background-color: #f5f5e8;
  border-bottom-color: #ffc107;
  border-bottom-width: 5px;
}

.page-link {
  background-color: #f5f5e8;
  color: black;
}

.page-link:focus {
  background-color: #f5f5e8;
  color: black;
  box-shadow: none;
}

.page-item .page-link.active {
  background-color: #ffc107;
  border-color: #ffc107;
}
</style>
