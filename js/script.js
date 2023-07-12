jQuery(function ($) {
    var pos;

    // ハンバーガーメニュー
    $('.js-hamburger').on('click', function() {
        // ファイル名取得
        var str = window.location.href.split('/').pop();
        
        if( $(this).hasClass('is-open') ){
            // ハンバーガーメニューOPEN中の処理
            $(this).removeClass('is-open');
            $('.js-drawer').removeClass('is-open');
            $('body').removeClass('fixed');
            // TOPページの場合はロゴを切り替える
            if( str == 'index.html') {
                setTimeout(function() {
                    $('.header__logo').children('a').children('img').attr('src', './img/common/logo_black.svg');
                }, 150);
            };
        } else{
            // ハンバーガーメニューCLOSE中の処理
            $(this).addClass('is-open');
            $('.js-drawer').addClass('is-open');
            pos = $(window).scrollTop();
            $('body').addClass('fixed');
            if( str == 'index.html') {
                setTimeout(function() {
                    $('.header__logo').children('a').children('img').attr('src', './img/common/logo_white.svg');
                }, 500);                
            };
        };
    });

    // ヘッダーの背景色切り替え
    var headHeight;
    var name = window.location.href.split('/').pop();
    if (window.matchMedia('(max-width: 767px)').matches) {
        headHeight = 80;
        if (name != 'index.html') {
            headHeight = headHeight - 150;
        }
    } else {
        headHeight = 150;
        if (name != 'index.html') {
            headHeight = headHeight - 270;
        }
    }
    $(window).on('scroll', function() {
        const mvHeight = $('.mv').height();
        if(mvHeight - headHeight < $(this).scrollTop()) {
            $('.js-header').addClass('headerColorScroll');
        } else{
            $('.js-header').removeClass('headerColorScroll');
        };
    });

    // TOPページ「お品書き」のスライダー
    const mq = window.matchMedia('(max-width: 767px');
    let topSwiper = null;

    function checkBreakPoint(mq) {
        if(mq.matches) {
            initSwiper();
        } else if(topSwiper) {
            topSwiper.destroy(false, true);
        };
    };

    function initSwiper() {
        topSwiper = new Swiper('.top__swiper', {
            allowTouchMove: false,
            slidesPerView: 'auto',
            spaceBetween: 6,
            loop: true,
            speed: 7200,
            autoplay: {
                delay: 0,
            },
        });
    };

    mq.addListener(checkBreakPoint);
    checkBreakPoint(mq);

    // お知らせのアコーディオンメニュー
    $('.js-accordion').on('click', function() {
        $('.js-accordion').not(this).removeClass('open');
        $('.js-accordion').not(this).next().slideUp(300);
        $(this).toggleClass('open');
        $(this).next().slideToggle(300);
    });

    // メニュー、お問い合わせページのスライダー
    const contentsSwiper = new Swiper('.contents-swiper', {
        allowTouchMove: false,
        slidesPerView: 'auto',
        loop: true,
        speed: 7200,
        autoplay: {
            delay: 0,
        },
    });

    // ページトップへ戻る
    var windowHeight = $(window).height();

    $(window).scroll(function() {
        if($(this).scrollTop() > windowHeight) {
            $('.js-scroll').addClass('is-fadein');
        } else {
            $('.js-scroll').removeClass('is-fadein');
        }
    })
    $('.js-scroll').on('click', function () {
        $('body, html').animate({
            scrollTop: 0
        }, 0);
    });

});