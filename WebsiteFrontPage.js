//Buttons
const BtnLink1 = document.getElementById('btnLink1');
const BtnLink2 = document.getElementById('btnLink2');
const BtnLink3 = document.getElementById('btnLink3');
const BtnLink4 = document.getElementById('btnLink4');
const BtnLink5 = document.getElementById('btnLink5');
const BtnLink6 = document.getElementById('btnLink6');
const BtnLink7 = document.getElementById('btnLink7');
const BtnLink8 = document.getElementById('btnLink8');

//Picture
const btnNext = document.getElementById('btnNext');
const btnPrev = document.getElementById('btnPrev');
const PicImg = document.getElementById('PicImg');
var i = 0;
const PicArray = ["https://static01.nyt.com/images/2018/05/03/us/03spongebob_xp/03spongebob_xp-articleLarge.jpg?quality=75&auto=webp&disable=upscale","https://cdn.vox-cdn.com/thumbor/ywwImRtZDaNCI6Hnwl6Bo5Z7j6I=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/63718716/spongebob_characters_wallpaper_thumb_1920_637740.0.jpg","https://i.pinimg.com/originals/56/f4/dd/56f4dda3fac4ea5ef162d4d9ca3e6a6d.jpg","https://cdn.vox-cdn.com/thumbor/wnfK7HybprDP8_VZtwpiNYRByKE=/0x0:638x404/1200x800/filters:focal(268x151:370x253)/cdn.vox-cdn.com/uploads/chorus_image/image/62424386/Spongebob_Squarepants.0.png","https://media1.fdncms.com/stranger/imager/u/large/41856421/1572556602-1510603395669960874.jpg"];

//Picture Shuffle
function NextPic() {
    if (i < PicArray.length - 1) {
        i++;
    } else {
        i = 0;
    }
    PicImg.src = PicArray[i];
}
function PrevPic() {
    if (i > 0) {
        i--;
    } else {
        i = PicArray.length - 1;
    }
    PicImg.src = PicArray[i];  
}
function Shuffle() {
    
}
function Wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}

btnNext.addEventListener('click', function() {
    NextPic();
})
btnPrev.addEventListener('click', function() {
    PrevPic();
})

//Buttons
//BtnLink1
BtnLink1.addEventListener('click', function() {
        window.location.href = 'Draw.html';
});
BtnLink1.addEventListener('auxclick', function() {
    if (event.which != 3) {
        window.open('Draw.html');
    }
});
//BtnLink2
BtnLink2.addEventListener('click', function() {
    window.location.href = 'Noughts&Crosses.html';
});
BtnLink2.addEventListener('auxclick', function() {
    if (event.which != 3) {
        window.open('Noughts&Crosses.html');
    }
});
//BtnLink3
BtnLink3.addEventListener('click', function() {
    window.location.href = 'Grid Game.html';
});
BtnLink3.addEventListener('auxclick', function() {
    if (event.which != 3) {
        window.open('Grid Game.html');
    }
});
//BtnLink4
BtnLink4.addEventListener('click', function() {
    
});
BtnLink4.addEventListener('auxclick', function() {

});
//BtnLink5
BtnLink5.addEventListener('click', function() {
    
});
BtnLink5.addEventListener('auxclick', function() {

});
//BtnLink6
BtnLink6.addEventListener('click', function() {
    
});
BtnLink6.addEventListener('auxclick', function() {

});
//BtnLink7
BtnLink7.addEventListener('click', function() {
    
});
BtnLink7.addEventListener('auxclick', function() {

});
//BtnLink8
BtnLink8.addEventListener('click', function() {
    
});
BtnLink8.addEventListener('auxclick', function() {

});