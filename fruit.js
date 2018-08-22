var playing = false; 
var score;
var heartsLeft;
var step;
var action;
$('#gameOver').hide();
var fruits = ['apple', 'mango', 'banana', 'cherries', 'grapes', 'orange', 'peach', 'pear', 'watermelon'];
$(function() {
    $('#start').click(function() {
        if(playing == true){
            location.reload();
        }

        else{
            $('#gameOver').hide();
            playing = true;
            score = 0;
            $('#scorevalue').html(score);
            $('#hearts').show();
           
            heartsLeft = 3;
            addHeart();
            $('.btn').html("RESTART");
            startAction();
            // $('#start').off('click');
        }
        
    });
    
});

//  mouse hover 

$('#fruit1').click(function() {
    score++;
    $('#scorevalue').html(score);

    $('#sliceSound')[0].play();
    $('#sliceSound')[0].play();
    clearInterval(action);

    $('#fruit1').hide("explode", 500);
    
    setTimeout(startAction, 500);

});





function addHeart(){
    $('#hearts').empty();
    for(i=0; i<heartsLeft; i++)
    {
        $('#hearts').append('<img src="heart.png" class="img">');
    }    
}

function startAction() {
    $('#fruit1').show();
    chooseFruit();
    $('#fruit1').css({'left' : Math.round(200*Math.random(0)) , 'top' : -60});
    step = 1 + Math.round(2*Math.random());
    action = setInterval(function(){
        $('#fruit1').css('top' , $('#fruit1').position().top + step);

        if($('#fruit1').position().top > $('.fruitContainer').height()){

            if(heartsLeft > 1){
                $('#fruit1').show();
                chooseFruit();
                $('#fruit1').css({'left' : Math.round(200*Math.random(0)) , 'top' : -60});
                step = 1 + Math.round(5*Math.random());
                heartsLeft--;
                addHeart();
            }

            else{
                //game over
                playing = false;
                $('.btn').html("START");
                $('#gameOver').show();
                $('#gameOver').html('<p>GAME OVER</p><p>Your Score is '+score+'</p>');
                stopAction();
                $('#hearts').hide();
            }
        }
    }, 10);
}

function chooseFruit() {
    $('#fruit1').attr('src', ''+fruits[Math.round(8*Math.random())]+'.png');
}

function stopAction() {
    clearInterval(action);
    $('fruit1').hide();
}
