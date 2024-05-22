import { defineStore } from 'pinia'
import axios from '@/axios/axios-config'
import { ref ,reactive,computed} from 'vue'
import { useRouter } from 'vue-router'
import { useRouteStore } from './route'
export const useBoardStore = defineStore('boardStore', () => {
  const router=useRouter()
  const routerStore=useRouteStore()
  const board = ref({
    thumbnail:
      'https://media.cntraveler.com/photos/5edfc029b16364ea435ca862/master/pass/Roadtrip-2020-GettyImages-1151192650.jpg',
    boardId: 1,
    title: 'Board1',
    content:
      '<p>여행이란 각자가 살아온 환경과 문화와 생활에서 탈출하여 새로운 경험에 도전하는 것이다. 각자 살던 곳은 그 문화가 좋은 것 이든지 혹은 그렇지 않은 것 이든지 관계없이 모든 것이 나에게 맞춰져 있고 불편한 것도 살면서 내가 적응이 되어서 불편함이 없이 살아왔다. 그러나 여행지에 나오면 언어와 관습의 차이는 물론 음식 문화의 차이 등이 생소 함으로 인해 불편함을 느낄 수가 있는데 사실은 그 불편함은 내가 일상적으로 경험하지 못한 상황을 겪어보는 것이  여행이라고 보아도 과언이 아니다.</p>',
    readCount: 3,
    regDt: new Date('2024-05-01'),
    writer: 'fosong'
  })
  let date = computed(() => {
    return board.value.regDt.getFullYear() + '-' + (board.value.regDt.getMonth() + 1) + '-' + board.value.regDt.getDate()
  })
  const boardStore = reactive({
    modal_show:true,
    // list
    list: [],
    limit: 10,
    offset: 0,
    orderBy: 'reg_dt',
    ascDesc: 'desc',
    searchWord: '',

    // pagination
    listRowCount: 10,
    pageLinkCount: 10,
    currentPageIndex: 1,
    totalListItemCount: 0,

    // detail, update, delete
    boardId: 0,
    title: '',
    content: '',
    userName: '',
    regDate: '',
    regTime: '',
    readCount: 0,
    fileList: [],
    sameUser: false
  })
  
  const boardList = ref([])
  // pagination
  const pageCount = computed(() => Math.ceil(boardStore.totalListItemCount / boardStore.listRowCount))
  const startPageIndex = computed(() => {
    if (boardStore.currentPageIndex % boardStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      return (boardStore.currentPageIndex / boardStore.pageLinkCount - 1) * boardStore.pageLinkCount + 1
    } else {
      return Math.floor(boardStore.currentPageIndex / boardStore.pageLinkCount) * boardStore.pageLinkCount + 1
    }
  })

  const endPageIndex = computed(() => {
    let tempEndPageIndex = 0
    if (boardStore.currentPageIndex % boardStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      tempEndPageIndex = boardStore.currentPageIndex
    } else {
      tempEndPageIndex = Math.floor(boardStore.currentPageIndex / boardStore.pageLinkCount) * boardStore.pageLinkCount + boardStore.pageLinkCount
    }
    // endPageIndex 가 전체 pageCount(페이지 전체 수) 보다 크면 페이지 전체 수로 보정
    if (tempEndPageIndex > pageCount.value) tempEndPageIndex = pageCount.value
    return tempEndPageIndex
  })

  const prev = computed(() => (boardStore.currentPageIndex <= boardStore.pageLinkCount ? false : true))
  const next = computed(() => (endPageIndex.value == pageCount.value ? false : true)) // 위에서 더 큰 값은 보정했으므로 같은 지만 비교
  
  const setTotalListItemCount = (count) => (boardStore.totalListItemCount = count)
  const setBoardMovePage = (pageIndex) => {
    boardStore.offset = (pageIndex - 1) * boardStore.listRowCount
    boardStore.currentPageIndex = pageIndex
  }
  //pagination end
  const listBySearch=async ()=>{
    setBoardMovePage(1)
    console.log('listBySearch')
    await listBoard()
  }
  const listBoard = async () => {
    // 목록
    
    let params = {
      limit: boardStore.limit,
      offset: boardStore.offset,
      orderBy: boardStore.orderBy,
      ascDesc: boardStore.ascDesc,
      searchWord: boardStore.searchWord
    }
    // console.log('listBoard '+params)
    try {
      let response = await axios.get('/boards',{params})
      // console.log(response)
      let { data } = response
      data.list.forEach((e)=>{
        e.thumbnail='https://media.cntraveler.com/photos/5edfc029b16364ea435ca862/master/pass/Roadtrip-2020-GettyImages-1151192650.jpg'
        e.regDt=new Date(e.regDt)
      })
      // console.log(data)
      boardList.value = data.list
      setTotalListItemCount(data.count)
      
    } catch (error) {
      console.log(error)
    }
  }
  // const insertBoard = async () => {
  //   // fetch + rest api
  //   // /boards POST
  //   axios
  //     .post('/boards', board.value)
  //     .then(function () {
  //       router.push('/boards')
  //       listBoard()
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }
  const deleteBoard = async () => {
    let url = '/boards/' + board.value.seq

    // fetch + rest api
    // /boards DELETE
    // if (confirm('이 글을 삭제하시겠습니까?')) {
      axios
      .delete(url)
      .then(() => {
        router.push('/boards')
        listBoard()
      })
      .catch((error) => {
        console.log(error)
      })
    // }
  }
  const updateBoard = async () => {
    // fetch + rest api
    // /boards PUT
    let url = '/boards/' + board.value.seq

    axios
      .post(url, board.value)
      .then(listBoard)
      .catch((error) => console.log(error))
  }
  const baseUrl = "http://localhost:8080";
  const detailBoard = async (boardId) => {
    // 상세
    // get /boards/123
    // CURRENT_ID.value = item.boardId
    let url = '/boards/' + boardId

    try {
      let response = await axios(url)
      let { data } = response
      data.dto.regDt=new Date(data.dto.regDt)
      data.dto.thumbnailUrl = `${baseUrl}/images/${data.dto.thumbnail}`;
      board.value=data.dto
  
      routerStore.sel_route.title=data.dto.routeName
      routerStore.sel_route.startDate=new Date(data.dto.startDate)
      routerStore.sel_route.overview=data.dto.overview
      routerStore.sel_route.thumbnail=data.dto.thumbnail
      routerStore.sel_route.thumbnailUrl=data.dto.thumbnailUrl
      routerStore.sel_route.routeId=data.dto.routeSeq

      console.log(board.value)
    } catch (error) {
      console.log(error)
    }
  }

  const findBoardByRouteId = (routeId) => {
    return boardList.value
  }

  const clear = () => {
    board.value = {}
  }

  return {
    boardStore,date,
    detailBoard,
    listBoard,listBySearch,
    // insertBoard,
    updateBoard,
    deleteBoard,
    findBoardByRouteId,
    clear,
    board,
    boardList,
    pageCount,
    startPageIndex,
    endPageIndex,
    prev,
    next,
    setBoardMovePage,
    setTotalListItemCount
  }
})
