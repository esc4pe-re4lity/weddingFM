/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$("a[href='#home-section1']").click(function(e){
    e.preventDefault();
    var position = $('#home-section1').position();
    $('html, body').animate({scrollTop:position.top}, '300');
});

$("a[href='#home-section2']").click(function(e){
    e.preventDefault();
    var position = $('#home-section2').position();
    $('html, body').animate({scrollTop:position.top}, '300');
});

$("a[href='#home-section3']").click(function(e){
    e.preventDefault();
    var position = $('#home-section3').position();
    $('html, body').animate({scrollTop:position.top}, '300');
});

$("a[href='#home-section4']").click(function(e){
    e.preventDefault();
    var position = $('#home-section4').position();
    $('html, body').animate({scrollTop:position.top}, '300');
});

$("a[href='#home-section5']").click(function(e){
    e.preventDefault();
    var position = $('#home-section5').position();
    $('html, body').animate({scrollTop:position.top}, '300');
});

/*
var menu = {
   aElt:"#home-section",
   scrollTop: 0,
   initMenu: function(){
       $(document).click(function (e) {
           if (e.which === 1) {
               if ($(e.target).is('a') || $(e.target).is('.deleteBasketItem *')) {
                   
               }
           }
            for(i=1;i<=5;i++){
                $("a[href='#home-section"+i+"']").click(function(e){
                     e.preventDefault();
                     var position = $('#home-section'+i).position();
                     $('html, body').animate({scrollTop:position.top}, '300');
                 });
            }
        });
   }
}
*/