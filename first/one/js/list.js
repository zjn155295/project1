const list1 = document.querySelector('.list')

one()
function one(){
    ajax({
        url:'/real',
        data:{
            skuIds: '644,643,652,651,646,645,623,635,624,633,634,630,629,604,603,602,617,618,619,569,567,558,557,541,540,525,522,526,527,481,484,487,488,475,553,472,458,489,455,421,582,581,655,656,659,658,660,661,662,664,663,672,667,666,665,671,670,608,607,612,611,613,669,668,610,609,606,605,572,573,578,577,570,575,576,579,519,521,520,495,494,480,500,462,461,465,464,463,537,535,550,467,449,448,471,470,437,673,674,689,687'
        },
        success(res){ 
            bindHtml(res.data)
            
        }
    })

}

function bindHtml(list){
    console.log(list)
    let str = ''
    for(i in list){
        str += `
        <li class="list_li">
        <div class="list_li1">
            <img src="https://r1.realme.net/general/20201012/1602492036109.jpg" alt="">
        </div>
        <p class="p1">${list[i].skuName}</p>
        <p>￥${list[i].nowPrice}</p>
        </li>
        `
        $('.list').html(str)
    }
}
