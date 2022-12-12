function register(){
    document.getElementById('label1').innerHTML = 'Создайте логин'
    document.getElementById('label2').innerHTML = 'Создайте пароль'
    document.getElementById('submit').value = 'Сохранить'
    document.getElementById('button-register').disabled = 'disabled'
}
///////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////
function parseData(data){

    let div = (document.getElementById('div_image')? document.getElementById('div_image'):document.getElementById('div_video'))

    let JSONParse = JSON.parse(JSON.stringify(data))

    let showMethod = (div.id === 'div_image'? showImage:showVideo)

    if(JSONParse.length != undefined){

        JSONParse.forEach(function(item, i, arr) {
            
            // let a = document.createElement('a')
            // a.href = item.url
            
            let img = document.createElement('img')
            img.style.width = '100px'
            img.style.height = '100px'
            img.style.padding = '2px'
            img.onclick = showMethod
            img.src = item.url
            
            // a.appendChild(img)
            div.appendChild(img)
        })
    }else{
        // let a = document.createElement('a')
        // a.href = JSONParse.image

        let img = document.createElement('img')
        img.style.width = '100px'
        img.style.height = '100px'
        img.style.padding = '2px'
        img.onclick = showMethod
        img.src = JSONParse.url

        // a.appendChild(img)
        document.body.querySelector('img').before(img)
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////

function showImage(){
    let div_image = document.getElementById('show')

    let img = document.createElement('img')
    img.id = 'bigImage'
    img.src = this.src
    img.style.maxWidth = '100%'
    img.style.maxHeight = '100%'
    img.style.margin = 'auto'
    // img.style.position = 'absolute'
    // img.style.width = '100%'
    // img.style.height = '100%'

    div_image.appendChild(img)
    div_image.style.display = 'flex'
    console.log('##############################################') 
    document.getElementById('div_image').style.display = 'none'
    // document.querySelector('body').onclick = closeImage
}

function closeImage(){
    console.log('///////////////////////////////////') 

    if(document.getElementById('bigImage')){
        document.getElementById('bigImage').remove()
        document.getElementById('show').style.display = 'none'
        // document.querySelector('body').onclick = undefined
    }
    if(document.getElementById('bigVideo')){
        document.getElementById('bigVideo').remove()
        document.getElementById('show').style.display = 'none'
        // document.querySelector('body').onclick = undefined
        console.log('///////////////////////////////////') 
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////

function showVideo(){
    // <video src="trailer_480p.mp4" width="480" height="270" poster="poster.gif" controls />
    let show_video = document.createElement('video')
    show_video.id = 'bigVideo'
    show_video.src = this.src
    show_video.controls = 'controls'
    show_video.style.position = 'absolute'
    show_video.style.top = '20px'
    
    let div_image = document.getElementById('show')
    div_image.appendChild(show_video)
    div_image.style.display = 'flex'
    // document.querySelector('body').onclick = closeImage
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function getImage(){

    if (!document.getElementById('div_image')){

        let div_image = document.createElement('div')
        div_image.id = 'div_image'
        div_image.style.top = '50px'
        div_image.style.background = 'grey'
        document.querySelector('body').appendChild(div_image)

        if(!document.getElementById('file')){
            createButton()
            document.getElementById('load').onclick = addImage
        }

        if(document.getElementById('div_video')){
            document.getElementById('div_video').remove()
            document.getElementById('load').onclick = addImage
        }

        $.ajax({
            url: '/Image',
            type: "GET",
            data: {'personId':document.getElementById('hidden').value},
            success: parseData,
        });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

function addImage(){
    console.log('addImage')

    // let file = document.getElementById('file').files[0]
    // let formData = new FormData()
    // formData.append('file', file)
    // formData.append('personId', document.getElementById('hidden').value)

    // $.ajax({
    //     url: '/Image',
    //     type: "POST",
    //     processData: false,
    //     contentType: false,
    //     data: formData,
    //     headers: {
    //       "X-Requested-With": "XMLHttpRequest",
    //       "X-CSRFToken": jQuery("[name=csrfmiddlewaretoken]").val(),
    //     },

    //     success: parseImage,

    //     error: (error) => {
    //       console.log(error);
    //     }
    //   });
}


////////////////////////////////////////////////////////////////////////////////////////////////

function video(){

    if (!document.getElementById('div_video')){

        let div_video = document.createElement('div')
        div_video.id = 'div_video'
        document.querySelector('body').appendChild(div_video)

        if(!document.getElementById('file')){
            createButton()
            document.getElementById('load').onclick = addVideo
        }

        if(document.getElementById('div_image')){
            document.getElementById('div_image').remove()
            document.getElementById('load').onclick = addVideo
        }

        $.ajax({
            url: '/Video',
            type: "GET",
            success: parseData,
        });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

function addVideo(){
    console.log('addVideo')
}

////////////////////////////////////////////////////////////////////////////////////////////////

function createButton(){
    let unload = document.createElement('input')
    unload.id = 'file'
    unload.type = 'file'
    unload.style.width = '50%'

    let button = document.createElement('input')
    button.type = 'button'
    button.id = 'load'
    button.value = 'Загрузить'
    // button.onclick = text
    button.style.width = '50%'

    let menu = document.getElementById('menu')
    menu.appendChild(unload)
    menu.appendChild(button)
}