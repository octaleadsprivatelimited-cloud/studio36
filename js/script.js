$(function () {
    $('.nav-btn').on('click', function () {
        $(this).toggleClass('open');
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