import { defineStore } from 'pinia'
import axios from '@/axios/axios-config'
import { ref } from 'vue'

export const useBoardStore = defineStore('boardStore', () => {
  let board = {
    thumbnail:
      'https://media.cntraveler.com/photos/5edfc029b16364ea435ca862/master/pass/Roadtrip-2020-GettyImages-1151192650.jpg',
    boardId: 1,
    title: 'Board1',
    content:
      '<p>여행이란 각자가 살아온 환경과 문화와 생활에서 탈출하여 새로운 경험에 도전하는 것이다. 각자 살던 곳은 그 문화가 좋은 것 이든지 혹은 그렇지 않은 것 이든지 관계없이 모든 것이 나에게 맞춰져 있고 불편한 것도 살면서 내가 적응이 되어서 불편함이 없이 살아왔다. 그러나 여행지에 나오면 언어와 관습의 차이는 물론 음식 문화의 차이 등이 생소 함으로 인해 불편함을 느낄 수가 있는데 사실은 그 불편함은 내가 일상적으로 경험하지 못한 상황을 겪어보는 것이  여행이라고 보아도 과언이 아니다.</p>',
    readCount: 3,
    registerDate: new Date('2024-05-01'),
    writer: 'fosong'
  }
  const board2 = {
    thumbnail:
      'https://media.cntraveler.com/photos/5edfc029b16364ea435ca862/master/pass/Roadtrip-2020-GettyImages-1151192650.jpg',
    boardId: 2,
    title: 'Board2',
    content:
      '여행이란 각자가 살아온 환경과 문화와 생활에서 탈출하여 새로운 경험에 도전하는 것이다. 각자 살던 곳은 그 문화가 좋은 것 이든지 혹은 그렇지 않은 것 이든지 관계없이 모든 것이 나에게 맞춰져 있고 불편한 것도 살면서 내가 적응이 되어서 불편함이 없이 살아왔다. 그러나 여행지에 나오면 언어와 관습의 차이는 물론 음식 문화의 차이 등이 생소 함으로 인해 불편함을 느낄 수가 있는데 사실은 그 불편함은 내가 일상적으로 경험하지 못한 상황을 겪어보는 것이  여행이라고 보아도 과언이 아니다.',
    readCount: 3,
    registerDate: new Date('2024-05-01'),
    writer: 'fosong'
  }
  const boardList = ref([board, board2, board, board, board])

  const listBoard = async () => {
    // 목록
    // get /boards
    try {
      let response = await axios.get('/boards')
      // console.log(response)
      let { data } = response
      boardList.value = data
    } catch (error) {
      console.log(error)
    }
  }
  const insertBoard = async () => {
    // fetch + rest api
    // /boards POST
    axios
      .post('/boards', board.value)
      .then(function (response) {
        listBoard()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const deleteBoard = async () => {
    let url = '/boards/' + board.value.boardId

    // fetch + rest api
    // /boards DELETE
    axios
      .delete(url)
      .then(() => {
        listBoard()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const updateBoard = async () => {
    // fetch + rest api
    // /boards PUT
    let url = '/boards/' + board.value.boardId

    axios
      .put(url, board.value)
      .then(listBoard)
      .catch((error) => console.log(error))
  }

  const detailBoard = async (boardId) => {
    // 상세
    // get /boards/123
    // CURRENT_ID.value = item.boardId
    let url = '/boards/' + boardId

    try {
      // let response = await axios(url)
      // let { data } = response
      console.log('detailBoard store ' + boardId)
      board.boardId = boardId
    } catch (error) {
      console.log(error)
    }
  }
  const clear = () => {
    board.value = {}
  }

  return {
    detailBoard,
    listBoard,
    insertBoard,
    updateBoard,
    deleteBoard,
    clear,
    board,
    boardList
  }
})
