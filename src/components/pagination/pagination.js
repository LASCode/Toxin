import 'paginationjs'

const container = $(".pagination")
container.find(".pagination__wrapper").each((index, el)=>{
  const totalPages = $(el).closest(".pagination").data('totalpages')

  const pagesArr = new Array(totalPages).fill(false).map((el, i)=>i+1)
  console.log(pagesArr)
  $(el).pagination({
    pageSize: 1,
    dataSource: pagesArr,
    pageRange: 1,
    prevText: "arrow_back",
    nextText: "arrow_forward"
  })
})