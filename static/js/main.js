(function($) {
    "use strict";
    $(function() {
        // Highlight menu 
        $(".nav a").each(function(index, a) {
            if ($(a).prop("href") === window.location.href) {
                $(a).parent("li").addClass("active");
            } else {
                $(a).parent("li").removeClass("active");
            }
        });

    });
})(jQuery);