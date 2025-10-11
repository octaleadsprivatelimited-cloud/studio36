$(function () {
    $('.nav-btn').on('click', function () {
        $(this).toggleClass('open');
    });

    // Handle mobile menu toggle to prevent body scroll and movement
    const navbarToggler = $('.navbar-toggler');
    const navbarCollapse = $('.navbar-collapse');
    
    navbarToggler.on('click', function() {
        // Toggle menu-open class on body when menu opens/closes
        setTimeout(function() {
            if (navbarCollapse.hasClass('show') || navbarCollapse.hasClass('collapsing')) {
                $('body').addClass('menu-open');
            } else {
                $('body').removeClass('menu-open');
            }
        }, 50);
    });

    // Remove menu-open class when clicking on nav links
    $('.navbar-nav a').on('click', function() {
        $('body').removeClass('menu-open');
    });

    // Remove menu-open class when clicking outside the menu
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length && navbarCollapse.hasClass('show')) {
            $('body').removeClass('menu-open');
        }
    });
});

(function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    const scrollTop = function () {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        scrollTop();
    } else {
        document.addEventListener('DOMContentLoaded', scrollTop);
    }

    window.addEventListener('pageshow', function () {
        scrollTop();
    });

    window.addEventListener('beforeunload', function () {
        scrollTop();
    });
})();