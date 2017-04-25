// Freelancer Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Floating label headings for the contact form
    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });


    // BEGIN LESSON ONE

    // Play all button icon switch
    $('#vowelsPlayAll').click(function() {
        $('#display_advance').toggle('1000');
        $("i", this).toggleClass("fa-play fa-stop");
    });
    $('#semivowelsPlayAll').click(function() {
        $('#display_advance').toggle('1000');
        $("i", this).toggleClass("fa-play fa-stop");
    });
    $('#consonantsPlayAll').click(function() {
        $('#display_advance').toggle('1000');
        $("i", this).toggleClass("fa-play fa-stop");
    });
    $('#closedPlayAll').click(function() {
        $('#display_advance').toggle('1000');
        $("i", this).toggleClass("fa-play fa-stop");
    });
    $('#halfclosedPlayAll').click(function() {
        $('#display_advance').toggle('1000');
        $("i", this).toggleClass("fa-play fa-stop");
    });
    $('#halfopenPlayAll').click(function() {
        $('#display_advance').toggle('1000');
        $("i", this).toggleClass("fa-play fa-stop");
    });
    $('#openPlayAll').click(function() {
        $('#display_advance').toggle('1000');
        $("i", this).toggleClass("fa-play fa-stop");
    });

    // BEGIN QUIZ 1
    
    // Play buttons for each question:
    $('#front-backPlayAll').click(function() {
        $('#display_advance').toggle('1000');
        $("i", this).toggleClass("fa-play fa-stop");
    });

    $('#half-open-closedPlayAll').click(function() {
    $('#display_advance').toggle('1000');
    $("i", this).toggleClass("fa-play fa-stop");
    });

    $("#button").click(function() {
        $('#display_advance').toggle('1000');
        $('.radial-out').toggleClass('radial-out-active');
    });

})(jQuery); // End of use strict

function playSingle(id, div) {
    var audioid = "audio/" + id + ".mp3";
    var audio = new Audio(audioid);
    var originalClass = div.className;

    if (originalClass == "btn btn-primary play-single") {
        div.className = "btn btn-success play-single";
    } else {
        div.className = "btn btn-success";
    }

    audio.play();

    audio.addEventListener("ended", function() {
        div.className = originalClass;
    });
}

function playAll(group, i = 0) {
    var iconId = group + "PlayAllButton";
    var icon = document.getElementById(iconId).className;

    // if i == 0, play
    // else if i > 0, stop

    if ((icon == "fa fa-play" && i > 0) || (icon == "fa fa-stop" && i == 0)) {
        return;
    }
    // phoneme arrays
    var vowels = ['i', 'y', 'u', 'e', 'ø', 'o', 'ɛ', 'œ', 'ɔ', 'a', 'ɑ', 'ɛ̃', 'œ̃', 'ã', 'ɔ̃'];
    var semivowels = ['j', 'ɥ', 'w'];
    var consonants = ['m', 'n', 'ɲ', 'p', 't', 'k', 'b', 'd', 'g', 'f', 's', 'ʃ', 'v', 'z', 'ʒ', 'l', 'ʁ'];
    var closed = ['i', 'y', 'u'];
    var halfclosed = ['e', 'ø', 'o'];
    var halfopen = ['ɛ', 'œ', 'ɔ'];
    var open = ['a', 'ɑ'];
    var back = ['a', 'ɑ', 'u', 'o', 'ɔ'];
    if (group == 'vowels') {
        var phonemes = vowels;
    } else if (group == 'semivowels') {
        var phonemes = semivowels;
    } else if (group == 'consonants') {
        var phonemes = consonants;
    } else if (group == 'closed') {
        var phonemes = closed;
    } else if (group == 'halfclosed') {
        var phonemes = halfclosed;
    } else if (group == 'halfopen') {
        var phonemes = halfopen;
    } else if (group == 'open') {
        var phonemes = open;
    } else if (group == 'back') {
        var phonemes = back;
    }

    var id = phonemes[i];
    var symbolid = id + group;
    var audioid = "audio/" + id + ".mp3";
    var audio = new Audio(audioid);
    document.getElementById(symbolid).className = "btn btn-success";
    audio.play();

    audio.addEventListener("ended", function() {
        document.getElementById(symbolid).className = "btn btn-default";
        if (i < phonemes.length-1)
            playAll(group, i+1);
        else {
            document.getElementById(iconId).className = "fa fa-play";
            return;
        }
    });

    // array of chars
    // for loop with each char
        // if click
            // break
        // call play(id)
        // highlight
        // listen for audio ended
            // turn off highlight
            // loop
}

var setupQuiz = (function() {
    var backVowels = ['1', '2', '3'];
    var frontVowels = ['4', '5', '6'];
    var halfClosed = ['7', '8', '9'];
    var halfOpen = ['10', 'e', 'i'];

    var returnGroup = {}; // group object
    var groups = {}; // key: group, value: random questions
    var answers = {}; // answer to each question (group)

    returnGroup.setGroups = function(newGroup) {
        var randomBinary = Math.round(Math.random());
        if (newGroup == 'front-back') {
            if (randomBinary == 0) {
                groups[newGroup] = randomize(backVowels);
                answers[newGroup] = 'back';
            } else {
                groups[newGroup] = randomize(frontVowels);
                answers[newGroup] = 'front';
            }
        } else if (newGroup == 'half-open-closed') {
            if (randomBinary == 0) {
                groups[newGroup] = randomize(halfClosed);
                answers[newGroup] = 'half-closed';
            } else {
                groups[newGroup] = randomize(halfOpen);
                answers[newGroup] = 'half-open';
            }
        }
    };

    returnGroup.getGroups = function() {
        return groups;
    };

    returnGroup.getAnswers = function() {
        return answers;
    }

    return returnGroup;
}());

function playQuestion(group, i = 0, question) {
    var iconId = group + "PlayAllButton";
    var icon = document.getElementById(iconId).className;

    if ((icon == "fa fa-play" && i > 0) || (icon == "fa fa-stop" && i == 0)) {
        return;
    }

    var groups = setupQuiz.getGroups();

    if (!(group in groups)) {
        if (group == 'front-back') {
            setupQuiz.setGroups(group);
        } else if (group == 'half-open-closed') {
            setupQuiz.setGroups(group);
        }
    }

    var question = groups[group];
    var id = question[i];
    var audioid = "audio/" + id + ".mp3";
    var audio = new Audio(audioid);
    audio.play();

    audio.addEventListener("ended", function() {
        if (i < question.length-1)
            playQuestion(group, i+1, question);
        else {
            document.getElementById(iconId).className = "fa fa-play";
            return;
        }
    });
}

function randomize(soundArray) {
    const OPTIONS = 3; // the number of random selections for each question
    var size = soundArray.length;
    var randomNums = [];
    var randomized = [];

    // create OPTIONS number of unique random numbers in randomNums:
    while (randomNums.length < OPTIONS) {
        var randNum = Math.floor(Math.random() * size)

        if (randomNums.indexOf(randNum) > -1) {
            continue;
        }

        randomNums.push(randNum);
    }

    // use the unique random numbers in randNums for selections in soundArray
    for (var i = 0; i < OPTIONS; i++) {

        randomized.push(soundArray[randomNums[i]]);
    }

    return randomized;
}

function checkAnswer(group, selection) {
	var answers = setupQuiz.getAnswers();

    if (group in answers) {
        if (selection == answers[group]) {
            alert("CORRECT");
        } else {
        	alert("INCORRECT");
        }
    }
}