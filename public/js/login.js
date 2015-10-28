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

