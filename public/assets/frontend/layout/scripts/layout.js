var Layout = function () {

    // IE mode
    var isRTL = false;
    var isIE8 = false;
    var isIE9 = false;
    var isIE10 = false;
    var isIE11 = false;

    var responsive = true;

    var responsiveHandlers = [];

    var handleInit = function() {

        if ($('body').css('direction') === 'rtl') {
            isRTL = true;
        }

        isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
        isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
        isIE10 = !! navigator.userAgent.match(/MSIE 10.0/);
        isIE11 = !! navigator.userAgent.match(/MSIE 11.0/);

        if (isIE10) {
            jQuery('html').addClass('ie10'); // detect IE10 version
        }
        if (isIE11) {
            jQuery('html').addClass('ie11'); // detect IE11 version
        }
    }

// Handles portlet tools & actions 
    var handlePortletTools = function () {
        jQuery('body').on('click', '.portlet > .portlet-title > .tools > a.remove', function (e) {
            e.preventDefault();
            jQuery(this).closest(".portlet").remove();
        });

        jQuery('body').on('click', '.portlet > .portlet-title > .tools > a.reload', function (e) {
            e.preventDefault();
            var el = jQuery(this).closest(".portlet").children(".portlet-body");
            var url = jQuery(this).attr("data-url");
            var error = $(this).attr("data-error-display");
            if (url) {
                Metronic.blockUI({target: el, iconOnly: true});
                $.ajax({
                    type: "GET",
                    cache: false,
                    url: url,
                    dataType: "html",
                    success: function(res)
                    {
                        Metronic.unblockUI(el);
                        el.html(res);
                    },
                    error: function(xhr, ajaxOptions, thrownError)
                    {
                        Metronic.unblockUI(el);
                        var msg = 'Error on reloading the content. Please check your connection and try again.';
                        if (error == "toastr" && toastr) {
                            toastr.error(msg);
                        } else if (error == "notific8" && $.notific8) {
                            $.notific8('zindex', 11500);
                            $.notific8(msg, {theme: 'ruby', life: 3000});
                        } else {
                            alert(msg);
                        }
                    }
                });
            } else {
                // for demo purpose
                Metronic.blockUI({target: el, iconOnly: true});
                window.setTimeout(function () {
                    Metronic.unblockUI(el);
                }, 1000);
            }
        });

        // load ajax data on page init
        $('.portlet .portlet-title a.reload[data-load="true"]').click();

        jQuery('body').on('click', '.portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand', function (e) {
            e.preventDefault();
            var el = jQuery(this).closest(".portlet").children(".portlet-body");
            if (jQuery(this).hasClass("collapse")) {
                jQuery(this).removeClass("collapse").addClass("expand");
                el.slideUp(200);
            } else {
                jQuery(this).removeClass("expand").addClass("collapse");
                el.slideDown(200);
            }
        });
    }


    var loadDialogMapVinh= function(){

        var html ='<div class="input-group loacation-search-wrapper">';
        html +='<span class="input-group-btn bg-grey"><i class="icon-search"></i></span>';
        html +='<input id="location-search" type="text" placeholder=" Tìm địa điểm..." class="form-control">';
        html +='</div>';
        html +='<div id="location-gmap"></div>';

        var content_browser=$("#content-browser").html();
        var ss= $(content_browser).prop('outerHTML');


        console.log(ss);

        bootbox.dialog({
            message: ss,
            title: "Vị trí địa điểm2",
            buttons: {
                default: {
                    label: "Đóng",
                    className: "btn-default"
                },
                main: {
                    label: "Hoàn tất",
                    className: "btn-primary",
                    callback: function() {
                        //   createLocation_frm.find('#location-position').val(markerLocation.getPosition());
                    }
                }
            }
        });


    }













    // runs callback functions set by App.addResponsiveHandler().
    var runResponsiveHandlers = function () {
        // reinitialize other subscribed elements
        for (var i in responsiveHandlers) {
            var each = responsiveHandlers[i];
            each.call();
        }
    }

    // handle the layout reinitialization on window resize
    var handleResponsiveOnResize = function () {
        var resize;
        if (isIE8) {
            var currheight;
            $(window).resize(function () {
                if (currheight == document.documentElement.clientHeight) {
                    return; //quite event since only body resized not window.
                }
                if (resize) {
                    clearTimeout(resize);
                }
                resize = setTimeout(function () {
                    runResponsiveHandlers();
                }, 50); // wait 50ms until window resize finishes.                
                currheight = document.documentElement.clientHeight; // store last body client height
            });
        } else {
            $(window).resize(function () {
                if (resize) {
                    clearTimeout(resize);
                }
                resize = setTimeout(function () {
                    runResponsiveHandlers();
                }, 50); // wait 50ms until window resize finishes.
            });
        }
    }

    var handleIEFixes = function() {
        //fix html5 placeholder attribute for ie7 & ie8
        if (isIE8 || isIE9) { // ie8 & ie9
            // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
            jQuery('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {

                var input = jQuery(this);

                if (input.val() == '' && input.attr("placeholder") != '') {
                    input.addClass("placeholder").val(input.attr('placeholder'));
                }

                input.focus(function () {
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });

                input.blur(function () {
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.val(input.attr('placeholder'));
                    }
                });
            });
        }
    }

    // Handles scrollable contents using jQuery SlimScroll plugin.
    var handleScrollers = function () {
        $('.scroller').each(function () {
            var height;
            if ($(this).attr("data-height")) {
                height = $(this).attr("data-height");
            } else {
                height = $(this).css('height');
            }
            $(this).slimScroll({
                allowPageScroll: true, // allow page scroll when the element scroll is ended
                size: '7px',
                color: ($(this).attr("data-handle-color")  ? $(this).attr("data-handle-color") : '#bbb'),
                railColor: ($(this).attr("data-rail-color")  ? $(this).attr("data-rail-color") : '#eaeaea'),
                position: isRTL ? 'left' : 'right',
                height: height,
                alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
                railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
                disableFadeOut: true
            });
        });
    }

    var handleSearch = function() {
        $('.search-btn').click(function () {
            if($('.search-btn').hasClass('show-search-icon')){
                if ($(window).width()>767) {
                    $('.search-box').fadeOut(300);
                } else {
                    $('.search-box').fadeOut(0);
                }
                $('.search-btn').removeClass('show-search-icon');
            } else {
                if ($(window).width()>767) {
                    $('.search-box').fadeIn(300);
                } else {
                    $('.search-box').fadeIn(0);
                }
                $('.search-btn').addClass('show-search-icon');
            }
        });

        // close search box on body click
        if($('.search-btn').size() != 0) {
            $('.search-box, .search-btn').on('click', function(e){
                e.stopPropagation();
            });

            $('body').on('click', function() {
                if ($('.search-btn').hasClass('show-search-icon')) {
                    $('.search-btn').removeClass("show-search-icon");
                    $('.search-box').fadeOut(300);
                }
            });
        }
    }

    var handleMenu = function() {
        $(".header .navbar-toggle").click(function () {
            if ($(".header .navbar-collapse").hasClass("open")) {
                $(".header .navbar-collapse").slideDown(300)
                    .removeClass("open");
            } else {
                $(".header .navbar-collapse").slideDown(300)
                    .addClass("open");
            }
        });
    }

    var handleSubMenuExt = function() {
        $(".header-navigation .dropdown").on("hover", function() {
            if ($(this).children(".header-navigation-content-ext").show()) {
                if ($(".header-navigation-content-ext").height()>=$(".header-navigation-description").height()) {
                    $(".header-navigation-description").css("height", $(".header-navigation-content-ext").height()+22);
                }
            }
        });
    }

    var handleSidebarMenu = function () {
        $(".sidebar .dropdown a i").click(function (event) {
            event.preventDefault();
            if ($(this).parent("a").hasClass("collapsed") == false) {
                $(this).parent("a").addClass("collapsed");
                $(this).parent("a").siblings(".dropdown-menu").slideDown(300);
            } else {
                $(this).parent("a").removeClass("collapsed");
                $(this).parent("a").siblings(".dropdown-menu").slideUp(300);
            }
        });
    }

    function handleDifInits() {
        $(".header .navbar-toggle span:nth-child(2)").addClass("short-icon-bar");
        $(".header .navbar-toggle span:nth-child(4)").addClass("short-icon-bar");
    }

    function handleUniform() {
        if (!jQuery().uniform) {
            return;
        }
        var test = $("input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle, .star)");
        if (test.size() > 0) {
            test.each(function () {
                if ($(this).parents(".checker").size() == 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        }
    }

    var handleFancyboxA = function () {
        /*  if (!jQuery.fancybox) {
         return;
         }


         if (jQuery(".fancybox-button").size() > 0) {
         jQuery(".fancybox-button").fancybox({
         groupAttr: 'data-rel',
         prevEffect: 'none',
         nextEffect: 'none',
         closeBtn: true,
         helpers: {
         title: {
         type: 'inside'
         }
         }
         });

         $('.fancybox-video').fancybox({
         type: 'iframe'
         });
         }
         */

    }

    // Handles Bootstrap Accordions.
    var handleAccordions = function () {

        jQuery('body').on('shown.bs.collapse', '.accordion.scrollable', function (e) {
            Layout.scrollTo($(e.target), -100);
        });

    }

    // Handles Bootstrap Tabs.
    var handleTabs = function () {
        // fix content height on tab click
        $('body').on('shown.bs.tab', '.nav.nav-tabs', function () {
            handleSidebarAndContentHeight();
        });

        //activate tab if tab id provided in the URL
        if (location.hash) {
            var tabid = location.hash.substr(1);
            $('a[href="#' + tabid + '"]').click();
        }
    }

    var handleMobiToggler = function () {
        $(".mobi-toggler").on("click", function(event) {
            event.preventDefault();//the default action of the event will not be triggered

            $(".header").toggleClass("menuOpened");
            $(".header").find(".header-navigation").toggle(300);
        });
    }

    var handleMobiMenu=function () {
        $(".mobi_menubar").on("click", function(event) {
            event.preventDefault();//the default action of the event will not be triggered

            $('.header-navigation').toggle(300);
        });
    }
    var handleMobiSearch=function () {
        $(".mobi_search").on("click", function(event) {
            event.preventDefault();//the default action of the event will not be triggered

            $('.box-search').toggle(300);
        });
    }

    var handleTheme = function () {

        var panel = $('.color-panel');

        // handle theme colors
        var setColor = function (color) {
            $('#style-color').attr("href", "../../assets/frontend/layout/css/themes/" + color + ".css");
            $('.corporate .site-logo img').attr("src", "../../assets/frontend/layout/img/logos/logo-corp-" + color + ".png");
            $('.ecommerce .site-logo img').attr("src", "../../assets/frontend/layout/img/logos/logo-shop-" + color + ".png");
        }

        $('.icon-color', panel).click(function (){
            $('.color-mode').show();
            $('.icon-color-close').show();
        });

        $('.icon-color-close', panel).click(function (){
            $('.color-mode').hide();
            $('.icon-color-close').hide();
        });

        $('li', panel).click(function () {
            var color = $(this).attr("data-style");
            setColor(color);
            $('.inline li', panel).removeClass("current");
            $(this).addClass("current");
        });
    }
    var handleMediaBrowser = function () {
        var type_insert="";

        $(".insertMedia").click(function(){
            $(".insertMedia").removeClass('abc');
            $(this).addClass("abc");
            //   $(this).addClass("abc");

            type_insert=$(this).attr('type_insert');
        });

        $("#insert-media-browser").click(function(){
            var url=$('#url-edit-media').attr('data-img-url');
            var result = true;
            if(url!=''){
                //var img='<img src="'+URL+url+'" />';

                switch (type_insert){
                    case "location_load_avatar": //luuhoabk (location/location.js)
                        Location.loadAvatar();
                        break;
                    case "location_load_album": //luuhoabk (location/location.js)
                        result = Location.loadAlbum();
                        break;

                    case "insert_one_img":
                        $(".abc").html(img);
                        break;

                    case "insert_multi_img":
                        $(".abc").append(img);
                        break;

                    case "insert_one_url":
                        break;
                    case "insert_one_url_location":

                        //   Location::abc(url);
                        //  $(".abc").html(url);
                        break;

                    case "insert_one_img_anh_bia":
                        $(".person-header-bg").attr('style','background-image: url('+url+')');
                        $(".person-header-bg").attr('url_img',url);
                        $(".btn-save-anh-bia").show();
                        break;

                    case "insert_one_img_avatar":
                        $(".avatar-pad2").attr('src',url);
                        //   $(".person-header-bg").attr('url_img',url);
                        $(".btn-save-avatar").show();
                        break;

                    default: break;
                }

            }else{
                bootbox.alert('bạn chưa chọn hình ảnh !');
                result = false;
            }

            return result;
        });

        $.fn.exists = function(callback) {
            var args = [].slice.call(arguments, 1);
            if (this.length) {
                callback.call(this, args);
            }
            return this;
        };

        $(".btn-save-anh-bia").click(function(){
            var url_img=   $(".person-header-bg").attr('url_img');
            //  alert(url);

            $.ajax({
                type: "POST",
                url: URL+"/trang-ca-nhan/chinh-sua-thong-tin.html",
                data: {
                    'background':url_img,
                    'type_edit':'change_anh_bia'
                },
                cache: false,
                success: function(data){
                    $(".btn-save-anh-bia").hide();
                }
            });
        });


        $(".btn-save-avatar").click(function(){
            var url_img=    $(".avatar-pad2").attr('src');
            //  alert(url);

            $.ajax({
                type: "POST",
                url: URL+"/trang-ca-nhan/chinh-sua-thong-tin.html",
                data: {
                    'avatar':url_img,
                    'type_edit':'change_avatar'
                },
                cache: false,
                success: function(data){
                    $(".btn-save-avatar").hide();
                }
            });
        });


    }
    var handleComponentLayout=function(){

        /**btb select*/
        $("section.person-content .person-content-item .person-type-scopy ul li").click(function(){
            // alert('ád');
            var value=$(this).html();
            var id=$(this).attr('value_id');
            var item_parend=$(this).parents("section.person-content .person-content-item .person-type-scopy");
            var item=   item_parend.find("button").first();
            item.html(value);
            item.attr('value_id',id);
            //   alert(item.html());
        });
        /***/
    }

    var handleBlog=function(){
        $(".btn-add-status").click(function(){


            var content_status=$("#content-status").val();
            var  privacy_status=$("#privacy-status").attr("value_id");

            //   alert(privacy_status);

            $.ajax({
                type: "POST",
                url: URL+"/trang-ca-nhan/trang-thai.html",
                data: {
                    'content':content_status,
                    'privacy':privacy_status

                },
                cache: false,
                success: function(data){
                    var html_box_status="<div class='vinhleeel'></div>";
                    $( html_box_status ).insertAfter( ".form-add-status" );
                }
            });




        });

    }

    return {
        init: function () {
            // init core variables
            /*   handleTheme();
             handleInit();
             handleResponsiveOnResize();
             handleIEFixes();
             handleSearch();
             handleFancybox();
             handleDifInits();
             handleSidebarMenu();
             handleAccordions();
             handleMenu();
             handleScrollers();
             handleSubMenuExt();
             handleMobiToggler();
             handlePortletTools();
             */

            handleMobiMenu();
            handleMobiSearch();
            handleMediaBrowser();
            handleComponentLayout();
            handleBlog();
        },
        btnSelection:function(){
            $(".select-button ul.dropdown-menu li ").click(function(){
                var item=$(this).parents("div.select-button");
                var item_this=$(this).find("a");
                var item_button=item.find('.item-btn');
                item_button.html(item_this.html());
            });
        },

        initUniform: function (els) {
            if (els) {
                jQuery(els).each(function () {
                    if ($(this).parents(".checker").size() == 0) {
                        $(this).show();
                        $(this).uniform();
                    }
                });
            } else {
                handleUniform();
            }
        },

        initTwitter: function () {
            !function(d,s,id){
                var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}
            }(document,"script","twitter-wjs");
        },

        initTouchspin: function () {
            $(".product-quantity .form-control").TouchSpin({
                buttondown_class: "btn quantity-down",
                buttonup_class: "btn quantity-up"
            });
            $(".quantity-down").html("<i class='fa fa-angle-down'></i>");
            $(".quantity-up").html("<i class='fa fa-angle-up'></i>");
        },

        initFixHeaderWithPreHeader: function () {
            jQuery(window).scroll(function() {
                if (jQuery(window).scrollTop()>37){
                    jQuery("body").addClass("page-header-fixed");
                }
                else {
                    jQuery("body").removeClass("page-header-fixed");
                }
            });
        },

        initNavScrolling: function () {
            function NavScrolling () {
                if (jQuery(window).scrollTop()>60){
                    jQuery(".header").addClass("reduce-header");
                }
                else {
                    jQuery(".header").removeClass("reduce-header");
                }
            }

            NavScrolling();

            jQuery(window).scroll(function() {
                NavScrolling ();
            });
        },

        initOWL: function () {
            $(".owl-carousel6-brands").owlCarousel({
                pagination: false,
                navigation: true,
                items: 6,
                addClassActive: true,
                itemsCustom : [
                    [0, 1],
                    [320, 1],
                    [480, 2],
                    [700, 3],
                    [975, 5],
                    [1200, 6],
                    [1400, 6],
                    [1600, 6]
                ]
            });

            $(".owl-carousel5").owlCarousel({
                pagination: false,
                navigation: true,
                items: 5,
                addClassActive: true,
                itemsCustom : [
                    [0, 1],
                    [320, 1],
                    [480, 2],
                    [660, 2],
                    [700, 3],
                    [768, 3],
                    [992, 4],
                    [1024, 4],
                    [1200, 5],
                    [1400, 5],
                    [1600, 5]
                ]
            });

            $(".owl-carousel4").owlCarousel({
                pagination: false,
                navigation: true,
                items: 4,
                addClassActive: true,
            });

            $(".owl-carousel3").owlCarousel({
                pagination: false,
                navigation: true,
                items: 3,
                addClassActive: true,
                itemsCustom : [
                    [0, 1],
                    [320, 1],
                    [480, 2],
                    [700, 3],
                    [768, 2],
                    [1024, 3],
                    [1200, 3],
                    [1400, 3],
                    [1600, 3]
                ]
            });

            $(".owl-carousel2").owlCarousel({
                pagination: false,
                navigation: true,
                items: 2,
                addClassActive: true,
                itemsCustom : [
                    [0, 1],
                    [320, 1],
                    [480, 2],
                    [700, 3],
                    [975, 2],
                    [1200, 2],
                    [1400, 2],
                    [1600, 2]
                ]
            });
        },

        initImageZoom: function () {
            $('.product-main-image').zoom({url: $('.product-main-image img').attr('data-BigImgSrc')});
        },

        initSliderRange: function () {
            $( "#slider-range" ).slider({
                range: true,
                min: 0,
                max: 500,
                values: [ 50, 250 ],
                slide: function( event, ui ) {
                    $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                }
            });
            $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
            " - $" + $( "#slider-range" ).slider( "values", 1 ) );
        },

        // wrapper function to scroll(focus) to an element
        scrollTo: function (el, offeset) {
            var pos = (el && el.size() > 0) ? el.offset().top : 0;
            if (el) {
                if ($('body').hasClass('page-header-fixed')) {
                    pos = pos - $('.header').height();
                }
                pos = pos + (offeset ? offeset : -1 * el.height());
            }

            jQuery('html,body').animate({
                scrollTop: pos
            }, 'slow');
        },

        //public function to add callback a function which will be called on window resize
        addResponsiveHandler: function (func) {
            responsiveHandlers.push(func);
        },

        scrollTop: function () {
            App.scrollTo();
        },


        gridOption1: function () {
            $(function(){
                $('.grid-v1').mixitup();
            });
        }

    };
}();