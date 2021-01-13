$(function(){
    $('.thr').click(async()=>{
        const username = $('.one').val()
        const password = $('.two').val()

        if(!username || !password) return alert('请完整填写表单')

        if(!/^[a-z0-9]\w{4,11}$/i.test(username) || !/^\w{6,12}$/i.test(password)) return alert('表单不符合规则')
        
        const {code, nickname} = await $.post('../php/login.php',{username , password},null,'json')

        if(!code) return alert('错误')

        setCookie('nickname', nickname, 60*60*24)

        window.location.href = './index.html'
    })

    $('.for').click(function(){
        $('.box1').css('display','block')
        $('.box').css('display','none')
    })
    $('.nine').click(function(){
        $('.box1').css('display','none')
        $('.box').css('display','block')
    })

    $('.eig').click(async()=>{
        const username = $('.fiv').val()
        const password = $('.six').val()
        const nickname = $('.seve').val()
        console.log(username)
        console.log(password)
        console.log(nickname)
        if(!username || !password ||!nickname) return alert('注册你就好好注')
        if(!/^[a-z0-9]\w{4,11}$/i.test(username) || !/^\w{6,12}$/i.test(password)) return alert('用户名字母数字开头5-12位，密码6-12位，昵称随便')
        const {code} =  await $.post('../php/login2.php',{username , password, nickname},null,'json')
        if(!code){
            alert('注册失败')
        }else{
            alert('注册成功')
            $('.box').css({'display':'block'})
            $('.box1').css({'display':'none'})
        }
    })
})