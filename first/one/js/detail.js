//详情页图片切换
const pc1 = document.querySelectorAll('.pc1')
const li  = document.querySelectorAll('.banner1_1_1list > li')
const span = document.querySelectorAll('.banner1_1_1list > li > span')
const mask2 = document.querySelector('.mask2')
const mask1 = document.querySelector('.mask1')
const mask = document.querySelector('.mask')
const mask_width = mask.clientWidth
const mask_heigh = mask.clientHeight
const bgWidth = parseInt(window.getComputedStyle(mask2).backgroundSize.split(' ')[0])
const bgHight = parseInt(window.getComputedStyle(mask2).backgroundSize.split(' ')[1])
const mask2_width = parseInt(window.getComputedStyle(mask2).width)
const mask2_height = parseInt(window.getComputedStyle(mask2).height)



//选项卡
for(let i = 0 ; i < pc1.length; i++ ){
    li[i].addEventListener('click',function(){
        for(let j = 0; j < pc1.length; j++){
            pc1[j].classList.remove('active')
            span[j].classList.remove('active')
            
        }
        pc1[i].classList.add('active')
        span[i].classList.add('active')

        mask2.style.backgroundImage =  `url(${ pc1[i].getAttribute('data-show') })`
    })
}

mask.addEventListener('mouseover',function(){
    mask1.style.display = 'block'
    mask2.style.display = 'block'
})
mask.addEventListener('mouseout',function(){
    mask1.style.display = 'none'
    mask2.style.display = 'none'
})

    const mask1Width = mask_width * mask2_width / bgWidth
    const mask1Height = mask_heigh * mask2_height / bgHight
    mask1.style.width = mask1Width + 'px'
    mask1.style.height = mask1Height + 'px'


//放大镜
mask.addEventListener('mousemove',function(e){
    e = e || window.event
    let X = e.offsetX - mask1Width / 2
    let Y = e.offsetY - mask1Height / 2

    if (X <= 0) X = 0
    if (Y <= 0) Y = 0
    if (X >= mask_width - mask1Width) X = mask_width - mask1Width
    if (Y >= mask_heigh - mask1Height) Y = mask_heigh - mask1Height

    mask1.style.left = X + 'px'
    mask1.style.top = Y + 'px'

    const bgX = X * mask2_width /  mask1Width
    const bgY = Y * mask2_height / mask1Height

    mask2.style.backgroundPosition = `-${ bgX }px -${ bgY }px`

})