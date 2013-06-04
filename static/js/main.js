(function($) {
    "use strict";
    $(function() {
        // Highlight menu 
        $(".nav a").each(function(index, a) {
            if ($(a).attr("href") === "/") {
                if (window.location.href === $(a).prop("href")) {
                    $(a).parent("li").addClass("active");
                } else {
                    $(a).parent("li").removeClass("active");
                }
            } else {
                if (window.location.href.indexOf($(a).prop("href")) >= 0) {
                    $(a).parent("li").addClass("active");
                } else {
                    $(a).parent("li").removeClass("active");
                }
            }
        });

    });
})(jQuery);