/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var aboutMe = {
    seconds: 0,
    intervalSecs: "",
    imageDuration: 5000,
    idImage: 0,
    nbImages: 5,
    srcImages: [],
    altImages: [],
    firstH3: [],
    secondH3: [],
    thirdH3: [],
    firstText: [],
    secondText: [],
    thirdText: [],
    initAboutMe: function(){
        aboutMe.setTitles();
        aboutMe.setTexts();
        setTimeout(function(){
            $('#aboutMe-image').addClass('fadeOut');
        },4600);
        this.intervalSecs = setInterval(aboutMe.countDown, this.imageDuration);
    },
    countDown: function(){
        if(aboutMe.idImage < 4){
            aboutMe.idImage++;
        } else {
            aboutMe.idImage = 0;
        }
        aboutMe.changeImage();
        aboutMe.changeTitles();
        aboutMe.changeTexts();
    },
    setTitles: function(){
        aboutMe.firstH3 = ['Fiamma','Adventure Time Biggest Fan','Meme Lord','Photography Lover','Tattoo Addict'];
        aboutMe.secondH3 = ['23 y/o','Blanket Lover','Serie Addict','Globtrotter','Rock Style'];
        aboutMe.thirdH3 = ['French','Cat Person','Geek','Carpe Diem','Calm'];
    },
    setTexts: function(){
        aboutMe.firstText = [
            "Flame – in italian – cause I'm half Sicilian YAY",
            "This cartoon is my life",
            "",
            "Photography is all about sharing passed moments and damn I love sharing",
            ""];
        aboutMe.secondText = [
            "Still young, I have plenty of things to learn and try in my life",
            "My warm bloody body needs to stay warm ",
            "Hello, IT, have you tried to turn it off and on again   ?",
            "Travelling is my passion, I've already been in 20 country with at least one on each continent",
            "I mostly wear only black because it's easier to make laundry"];
        aboutMe.thirdText = [
            "Bonjour. Croissant. Merci. Fromage. Oui.",
            "Needy people, please move forward",
            "Indoor or outdoor     ?... I ain't need no sun",
            "I do enjoy the simple things of the living moment, I am trully attentive to smal attentions",
            "Even if I enjoy System Of A Down or listen to some nightcore, I am a calm and quiet person"];
    },
    changeImage: function(){
        $('#aboutMe-image').removeClass('fadeOut');
        setTimeout(function(){
            $('#aboutMe-image').addClass('fadeOut');
        },4600);
        $('#aboutMe-image').attr('src','Public/images/home/'+aboutMe.idImage+'.jpg');
    },
    changeTitles: function(){
        $('#aboutMe-first-h3').text(aboutMe.firstH3[aboutMe.idImage]);
        $('#aboutMe-second-h3').text(aboutMe.secondH3[aboutMe.idImage]);
        $('#aboutMe-third-h3').text(aboutMe.thirdH3[aboutMe.idImage]);
    },
    changeTexts: function(){
        $('#aboutMe-first-p').text(aboutMe.firstText[aboutMe.idImage]);
        $('#aboutMe-second-p').text(aboutMe.secondText[aboutMe.idImage]);
        $('#aboutMe-third-p').text(aboutMe.thirdText[aboutMe.idImage]);
    }
};