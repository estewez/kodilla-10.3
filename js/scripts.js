var carouselList = $('#carousel .list');
var currentSlide = 2;
$('.c-2').css('background-color', 'white');


$(function(){
    var Interval = setInterval(changeSlide, 3500);
    $('#carousel').hover(function() {
        clearInterval(Interval);
    },
    function() {
        Interval = setInterval(changeSlide, 3500);
    });

    $('.right').click(function() {
        changeSlide();
    });
    $('.left').click(function() {
        reverseChangeSlide();
    });

    $('.c-1').click(function() {
        goToSlide(1);
    });
    $('.c-2').click(function() {
        goToSlide(2);
    });
    $('.c-3').click(function() {
        goToSlide(3);
    });
    $('.c-4').click(function() {
        goToSlide(4);
    });
});



function changeSlide() {
    carouselList.animate({'marginLeft':-960}, 480, moveFirstSlide);
    checkSlide(1);
}

function moveFirstSlide() {
    var firstItem = carouselList.find('li').first();
    var lastItem = carouselList.find('li').last();
    lastItem.after(firstItem);
    carouselList.css({marginLeft: -480});
}

function reverseChangeSlide() {
    carouselList.animate({'marginLeft':0}, 480, reverseMoveFirstSlide);
    checkSlide(-1);
}

function reverseMoveFirstSlide() {
    var firstItem = carouselList.find('li').first();
    var lastItem = carouselList.find('li').last();
    firstItem.before(lastItem);
    carouselList.css({marginLeft: -480});
}

function checkSlide(move) {
    $('.c-' + currentSlide).css('background-color', 'transparent');
    currentSlide += move;
    if (currentSlide == 0) {
        currentSlide = 4;
    } else if (currentSlide == 5) {
        currentSlide = 1;
    }
    $('.c-' + currentSlide).css('background-color', 'white');
}

function goToSlide(slide) {
    var nextSteps = 0,
        backSteps = 0;
    for (var i = currentSlide; i != slide; i++) {
        if (i == 5) {
            i = 0;
            nextSteps--;
        }
        nextSteps++;
    }
    for (var j = currentSlide; j != slide; j--) {
        if (j == 0) {
            j = 5;
            backSteps++;
        }
        backSteps--;
    }
    backSteps = Math.abs(backSteps);
    if (nextSteps <= backSteps) {
        for (var k = 0; k < nextSteps; k++) {
            changeSlide();
        }
    } else {
        for (var l = 0; l < backSteps; l++) {
            reverseChangeSlide();
        }
    }
}