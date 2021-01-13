const body = document.querySelector('body')
const icon = document.querySelector('.icon')
const sec_list = document.querySelector('.sec_list')
const banner = document.querySelector('.banner')


icon.addEventListener('click',()=>{
    if(sec_list.style.display === 'block'){
        sec_list.style.display = 'none'
    }else{
        sec_list.style.display = 'block'
    }
})
//轮播图区域
class Banners{
    constructor(select){
        this.ele = document.querySelector(select)
        this.thr_list = this.ele.querySelector('.thr_list')
        this.pointBox = this.ele.querySelector('.pointBox')
        this.leftBtn = this.ele.querySelector('.left')
        this.rightBtn = this.ele.querySelector('.right')
        this.banner_width = this.ele.clientWidth
        this.timer = 0
        this.index = 1
        this.flag = true
        this.init()
    }
    init(){
        this.setPoint()
        this.copy()
        this.autoPlay()
        this.overOut()
        this.leftRightEvent()
        this.pointEvent()
        this.tabChange()
    }

    setPoint(){
        const num = this.thr_list.children.length
        const frg = document.createDocumentFragment()
        for(let i = 0; i<num;i++){
            const li = document.createElement('li')
            if(i === 0)li.classList.add('active')
            li.dataset.page = i
            frg.appendChild(li)
        }
        this.pointBox.appendChild(frg)
        this.pointBox.style.width = num *(20+10) +'px'
    }
    copy(){
        const first = this.thr_list.firstElementChild.cloneNode(true)
        const last = this.thr_list.lastElementChild.cloneNode(true)
        this.thr_list.appendChild(first)
        this.thr_list.insertBefore(last,this.thr_list.firstElementChild)
        this.thr_list.style.width = this.thr_list.children.length *100 + '%'
        this.thr_list.style.left = -this.banner_width +'px'
    }

    autoPlay(){
        this.timer = setInterval(() => {
            this.index++

            move(this.thr_list,{left: -this.index * this.banner_width},()=>{this.moveEnd()})

        }, 3000);

    }
    moveEnd(){
        const{index, thr_list:box,banner_width:bw,pointBox:pBox} = this
        if (index === box.children.length - 1) {
            this.index = 1
            box.style.left = -this.index * bw + 'px'
        }
        if (index === 0) {
            this.index = box.children.length - 2
            box.style.left = -this.index * bw + 'px'
        }
        for (let i = 0; i < pBox.children.length; i++) {
            pBox.children[i].classList.remove('active')
        }
        pBox.children[this.index - 1].classList.add('active')
        this.flag = true
    }
    overOut(){
        this.ele.addEventListener('mouseover', () => clearInterval(this.timer))
        this.ele.addEventListener('mouseout', () => this.autoPlay())
    }
    leftRightEvent(){
        this.leftBtn.addEventListener('click', () => {
            if (!this.flag) return
            this.flag = false
            this.index--
            move(this.thr_list, { left: -this.index * this.banner_width }, this.moveEnd.bind(this))
        })
        this.rightBtn.addEventListener('click', () => {
            if (!this.flag) return
            this.flag = false
            this.index++
            move(this.thr_list, { left: -this.index * this.banner_width }, this.moveEnd.bind(this))
          })
    }
    pointEvent(){
        this.pointBox.addEventListener('click', e => {
            e = e || window.event
            const target = e.target || e.srcElement
            if (target.nodeName === 'LI') {
              if (!this.flag) return
              this.flag = false
              this.index = target.dataset.page - 0 + 1
              move(this.thr_list, { left: -this.index * this.banner_width }, this.moveEnd.bind(this))
            }
          })
    }
    tabChange(){
        document.addEventListener('visibilitychange', () => {
          const state = document.visibilityState
    
          if (state === 'hidden') clearInterval(this.timer)
          if (state === 'visible') this.autoPlay()
        })
      }
}
//选项卡
const for_list = document.querySelector('.for_list')
const tt = for_list.children
const brother = document.querySelectorAll('.q1')

for(let i =0 ; i < tt.length; i++){
    tt[i].addEventListener('click',function(){
        for(let j = 0 ; j < tt.length; j++){
            tt[j].classList.remove('active')
            brother[j].classList.remove('active')
        }
        tt[i].classList.add('active')
        brother[i].classList.add('active')
    })
}
//搜索框
const ul = document.querySelector('.list')
const inp = document.querySelector('.fir_inp')
inp.addEventListener('input', function () {
    const text = this.value.trim()
    const script = document.createElement('script')
    script.src = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,33222,33306,33259,33235,32973,33351,33313,33312,33311,33310,33309,33308,33307,33145,22159,33389&wd=${ text }&req=2&csor=4&pwd=aiq&cb=bindHtml&_=1608775410035`
    document.body.appendChild(script)
    script.remove()
})
function bindHtml(res) {
    console.log(res)
    if (!res.g) {
      ul.style.display = 'none'
      return
    }
    let str = ''
    res.g.forEach(item => {
      str += `
        <li>${ item.q }</li>
      `
    })
    ul.innerHTML = str
    ul.style.display = 'block'
  }
//点击跳转详情页
const connet_one_two1 = document.querySelector('.connet_one_two1')
connet_one_two1.onclick = function(){
    window.location.href = './detail.html'
}