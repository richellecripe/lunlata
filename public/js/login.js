    $(document).ready(function() {
        $('.loginbutton').click(function(e) {
            e.preventDefault();

            boxh = $('#popup').height();
            windowh = $(window).height();

            $('#popup').css('margin-top', windowh/2 - boxh/2);

            $('#popup').fadeIn();
        });
        $('.close').click(function() {
            $('#popup').fadeOut();
        });
    });


$(document).ready(function() {
        $('.leaderboard').click(function(e) {
            e.preventDefault();

            boxh = $('#leaderboard').height();
            windowh = $(window).height();

            $('#leaderboard').css('margin-top', windowh/2 - boxh/2);

            $('#leaderboard').fadeIn();
        });
        $('.close').click(function() {
            $('#leaderboard').fadeOut();
        });
    });
