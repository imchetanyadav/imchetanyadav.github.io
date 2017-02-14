var string;
$(function(){

    /* Adjust Styling based on screensize */
    function adjustStyle(width){
        if(width<701){
            $('#screen-stylesheet').attr("href","css/smallscreen.css");
        }
        else{
            $('#screen-stylesheet').attr("href","css/largescreen.css");
        }
    } 
    adjustStyle($(this).width());
    $(window).resize(function(){
        adjustStyle($(this).width());
        if(content === true){
            specifysize();
        }
    });
    
    /* Adjusting Size of components */
    var h = $(window).height();
    $('#resize').css("height",h);
    $('#main-menu').css("height",h);

    function specifysize(){
        var w = $(window).width();
        var rw = (w*18)/100;
        var s1 = "inset ";
        if(rw>225){
            $("#resize").css("width",rw);
            $("#resize").css("height",rw);
            var mw = w-rw -20;
            console.log(mw);
            $('#right').css("width",mw);
            $('#right').css("left",rw);
            var s2 = rw;
            var s3 = "px 0 0 0 rgba(126, 126, 126, 0.21)";
            string = s1.concat(s2,s3);
        }
        else{
            $("#resize").css("width","225");
            $("#resize").css("height","225");
            var mw = w-225;
            $('#right').css("width",mw);
            $('#right').css("left","225px");
            var s3 = "225px 0 0 0 rgba(126, 126, 126, 0.21)";
            string = s1.concat(s3);
        }
        $('#left-menu ul li.active').css("box-shadow",string);
    }

    /* Main Content Toggle */
    var content = false;
    function viewContent(){
        content = true;
        specifysize();
        $('#main-menu ul li').css("animation-play-state","running");
        $('.hero-text').css("animation-play-state","running");
        setTimeout(function(){
            $('#right').css("height","auto");
            $('#left-menu').css("display","block");
            $('#left-menu').css("animation-play-state","running");
            $('#main-menu').css("display","none");
        }, 500);
        setTimeout(function(){
            $('#content').css("display","block");
            $('#left').css("position","fixed");
        }, 1200);
    }
    $('#main-menu ul li').on('click', function(){
        viewContent();
    });

    /* Typing Animation */
    $(".type").typed({
        strings: ["i design websites.", "i develop app.", "i am CHETAN YADAV."],
        typeSpeed: 0,
        loop: true
    });
   
    
    /* Scroll based animation */
    //Cache reference to window and animation items
    var $animation_elements = $('.animation-element');
    var $window = $(window);
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');
    
    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position))
            {
                $element.addClass('in-view');

                // Highlighting li element based on section in viewport 
                var s = $($element).parent().attr('id');
                $('#left #left-menu ul li').css("box-shadow","none");
                $('#left #left-menu ul li').each(function(){
                    if($(this).text() === s){
                        $(this).css("box-shadow",string);
                    }
                });

            }
            else{
                //$element.removeClass('in-view');
            }
        });
    }
    
    /* Left Menu Selected Animation */
    $('#left-menu ul li').on('click',function(){
        $('#left-menu ul li').css("box-shadow","none");
        $('#left-menu ul li').removeClass('active');
        $(this).css("box-shadow",string);
        $(this).addClass('active');
    });
    
    /* Left Menu Scroll to Selected Section */
    function scrolltoSection(a, b){
        var s = "#" + a;
        $('html, body').animate({scrollTop: $(s).offset().top -b}, 1000);
    }
    $('#left #left-menu ul li').click(function () {
        scrolltoSection($(this).text(), 60);
    });
    
    /* Skills Section Logo Change */
    function switchlogo(){
        var a = ["web", "desktop", "mobile", "design"];
        var i = 0;
        setInterval(function(){
            showlogo(a[i]);
            i++;
            if(i===4)
                i = 0;
        }, 4000);
    }
    function showlogo(a){
        var s = "." + a + "-logo";
        $('.logo').css("display","none");
        $(s).css("display","block");
    }
    showlogo("desktop");
    
    /* Switch logo of skills section based on platform selected */ 
    $('#mobile-pic').on('click',function(){
        $(this).fadeTo(100,0.30, function(){
            $(this).attr("src","images/mobile.png");
            //$(this).css("top","83%");
        }).fadeTo(1500,1);
        showlogo("mobile");
    });
    $('#desktop-pic').on('click',function(){
        showlogo("desktop");
        switchlogo();
    });
    $('#web-pic').on('click',function(){
        showlogo("web");
    });
    $('#design-pic').on('click',function(){
        showlogo("design");
    });
    
    var jsonURL = "json/projects.json";
    $.getJSON(jsonURL, function (json)
    {
        var imgList= "";
        $.each(json.projects, function () {
            imgList += '<li><img src= "' + this.imgPath + '"></li>';
        });
        $('#project-images').append(imgList);
    });

    
    /* Mobile Menu Toggle */
    var mobilenav = false;
    $('.toggle-container').on('click',function(){
        if(mobilenav === false){
            mobilenav = true;
            $('.mobile-menu').css("height","280");
            $('body').css("margin-top","230px");
        }
        else if(mobilenav === true){
            mobilenav = false;
            $('.mobile-menu').css("height","54");
            $('body').css("margin-top","0px");
        }
    });
    $('.nav-item').on('click',function(){
        $('.toggle-container').trigger('click');
        scrolltoSection($(this).text(), 300);
    });
    
});