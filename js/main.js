var string;
var sectionTitleColor;

$(function(){

    //Hide loader when page loading completes
    setTimeout(function(){
        $('#loader-wrapper').css("display","none");
    }, 500);
    $('.noJSmsg').css("display","none");
    
    /* Adjust Styling based on screensize */
    function adjustStyle(width){
        if(width<701){
            $('#screen-stylesheet').attr("href","css/smallscreen.css");
            $('#resize').addClass("animation-element");
        }
        else{
            $('#screen-stylesheet').attr("href","css/largescreen.css");
            $('#resize').removeClass("animation-element");
        }
    } 
    
    if($(window).width()>701)
        $('#content').css("display","none");
        
    adjustStyle($(this).width());
    $(window).resize(function(){
        adjustStyle($(this).width());
        if(content === true){
            specifysize();
        }
    });
    
    /* Adjusting Size of components */
    var windowHeight = $(window).height();
    $('#resize').css("height",windowHeight);
    $('#main-menu').css("height",windowHeight);

    function specifysize(){
        var windowWidth = $(window).width();
        var resizeIdWidth = (windowWidth * 18) / 100;
        var s1 = "inset ";
        if(resizeIdWidth > 225){
            $("#resize").css("width",resizeIdWidth);
            $("#resize").css("height",resizeIdWidth);
            var contentWidth = windowWidth - resizeIdWidth -20;
            $('#right').css("width",contentWidth);
            $('#right').css("left",resizeIdWidth);
            var s2 = resizeIdWidth;
            var s3 = "px 0 0 0 rgba(126, 126, 126, 0.21)";
            string = s1.concat(s2,s3);
        }
        else{
            $("#resize").css("width","225");
            $("#resize").css("height","225");
            var contentWidth = windowWidth - 225;
            $('#right').css("width",contentWidth);
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
            $('.hero-text').css("top","33%");
        }, 500);
        setTimeout(function(){
            $('#content').css("display","block");
            $('#left').css("position","fixed");
        }, 1500);
    }
    $('#main-menu ul li').on('click', function(){
        viewContent();
    });

    /* Typing Animation */
    $(".type").typed({
        strings: ["i design websites.", "i develop apps."],
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
            if ((element_bottom_position >= (window_top_position - 80)) && (element_top_position <= (window_bottom_position + 80)))
            {
                $element.addClass('in-view');

                // Highlighting li element based on section in viewport 
                var s = $($element).closest(".section").attr('id'); //getting id of element in view
                if(s === undefined)
                    sectionTitleColor = "#ff642f"; //getting section title color in view
                else
                    sectionTitleColor = $('#'+s+' .section-title').css("background-color"); //getting section title color in view
                $('#left #left-menu ul li').css("box-shadow","none");
                $('#left #left-menu ul li').each(function(){
                    if($(this).text() === s){
                        $(this).css("box-shadow",string);
                    }
                });

            }
            else{
                $element.removeClass('in-view');
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
    
    /* Desktop Main Menu Scroll to Selected Section */
    $('#right #main-menu ul li').click(function () {
        var selected = $(this).text().toLowerCase();
        setTimeout(function(){
            scrolltoSection(selected, 60);
        }, 1600);
    });
    
    /* Skills Section Logo Change */
    var allplatforms = ["mobile", "desktop", "design", "web"];
    var i = 0;
    //automatically change platform after 4000ms
    function switchPlatform(){
        setInterval(function(){
            i++;
            if(i===4)
                i = 0;
            showPlatform(allplatforms[i]);
        }, 4000);
    }
    switchPlatform();
    
    function showPlatform(platformSelected){
        //set all plaform images to default
        for(var j = 0; j<4; j++){
            var id = "#" + allplatforms[j];
            var img = "images/skills/" + allplatforms[j] + ".png";
            $(id).attr("src", img);
            $(id).removeClass("platform-active");
            if(allplatforms[j] === platformSelected)
                i = j;
        }
        //changing platform image based on selection
        var platformid = "#" + platformSelected;
        var platformgif = "images/skills/" + platformSelected + "_animated.gif";
        $(platformid).attr("src", platformgif);
        $(platformid).addClass("platform-active");
        //changing platform logo based on selection
        var platformLogo = "." + platformSelected + "-logo";
        $('.logo').css("display","none");
        $(platformLogo).css("display","block");
    }
    showPlatform("desktop");
    
    /* Loading SVG Icons skills */
    var jsonSkillsURL = "json/skills.json";
    $.getJSON(jsonSkillsURL, function (json)
    {
        var webLogoList= "";
        $.each(json.webLogo, function () {
            webLogoList += '<img src= "' + this.imgPath + '" title="' + this.name + '" alt="' + this.name + '">';
        });
        var mobileLogoList= "";
        $.each(json.mobileLogo, function () {
            mobileLogoList += '<img src= "' + this.imgPath + '" title="' + this.name + '" alt="' + this.name + '">';
        });
        var desktopLogoList= "";
        $.each(json.desktopLogo, function () {
            desktopLogoList += '<img src= "' + this.imgPath + '" title="' + this.name + '" alt="' + this.name + '">';
        });
        var designLogoList= "";
        $.each(json.designLogo, function () {
            designLogoList += '<img src= "' + this.imgPath + '" title="' + this.name + '" alt="' + this.name + '">';
        });
        $('.web-logo').append(webLogoList);
        $('.mobile-logo').append(mobileLogoList);
        $('.desktop-logo').append(desktopLogoList);
        $('.design-logo').append(designLogoList);
    });
    
    /* Loading Project Section Images */
    var jsonProjectsURL = "json/projects.json";
    $.getJSON(jsonProjectsURL, function (json)
    {
        var imgList= "";
        $.each(json.projects, function () {
            imgList += '<li><img src= "' + this.imgPath + '" data-darkbox="' + this.imgPathHR + '" data-darkbox-description="' + this.name + '"></li>';
        });
        $('#project-images').append(imgList);
    });

    
    /* Mobile Menu Toggle */
    var mobilenav = false;
    var menu = $('.mobile-menu');
    $('.toggle-container').on('click',function(){
        if(mobilenav === false){
            mobilenav = true;
            $(menu).css("height","280");
            $(menu).css("background-color", sectionTitleColor);
            $(menu).css("transition", "0.5s all ease-out, 0.1s background-color linear");
            $(menu).css("-webkit-transition", "0.5s all ease-out, 0.1s background-color linear");
        }
        else if(mobilenav === true){
            mobilenav = false;
            $(menu).css("height","55");
            $(menu).css("background-color", "rgba(0, 0, 0, 0)");
            $(menu).css("transition", "0.5s all ease-out, 1s background-color linear");
            $(menu).css("-webkit-transition", "0.5s all ease-out, 1s background-color linear");
        }
    });
    $('.nav-item').on('click',function(){
        $('.toggle-container').trigger('click');
        scrolltoSection($(this).text(), 0);
    });
    
});