var string;
var sectionTitleColor;

function hideloader(){
    $('#loader-wrapper').css("display","none");
    $('.noJSmsg').css("display","none");
}

var callback = function(){
    //Hide loader when page loading completes
    setTimeout(function(){
        hideloader();
    }, 800);
};
if ( document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    callback();
} else {
    document.addEventListener("DOMContentLoaded", callback);
}

$(function(){
    
    /* Adjusting Size of components */
    var windowHeight = $(window).height();
    var resize = document.getElementById('resize');
    var resizecollapsed, resizeexpanded;
    var right = document.getElementById('right');
    var rightcollapsed, rightexpanded;
    
    var windowWidth = $(window).width();
    var halfWindowWidth = windowWidth/2;
    var resizeIdWidth = (windowWidth * 18) / 100;
    if(resizeIdWidth < 225){
        resizeIdWidth = 225;
    }
    var contentWidth = windowWidth - resizeIdWidth -10;
    var s1 = "inset ";
    var s2 = resizeIdWidth;
    var s3 = "px 0 0 0 rgba(126, 126, 126, 0.21)";
    string = s1.concat(s2,s3);
    $('#left-menu ul li.active').css("box-shadow",string);
    
    /* Adjust Stylesheet based on screensize */
    function adjustStyle(width){
        if(width<701){
            $('#screen-stylesheet').attr("href","css/smallscreen.css");
            $('#resize').addClass("animation-element");
        }
        else{
            $('#screen-stylesheet').attr("href","css/largescreen.css");
            $('#resize').removeClass("animation-element");
            if(content)
                $(right).css("width",contentWidth);
        }
    } 

    adjustStyle($(this).width());
    $(window).resize(function(){
        windowWidth = $(window).width();
        halfWindowWidth = windowWidth/2;
        contentWidth = windowWidth - resizeIdWidth -10;
        adjustStyle($(this).width());
    });
    
    function transform(elem, elemcollapsed, elemexpanded){
        var invertedTop = elemcollapsed.top - elemexpanded.top;
        var invertedLeft = elemcollapsed.left - elemexpanded.left;
        var invertedWidth = elemcollapsed.width / elemexpanded.width;
        var invertedHeight = elemcollapsed.height / elemexpanded.height;

        elem.style.transformOrigin = 'top left';

        elem.style.transform = 'translate(' + invertedLeft + 'px, ' + invertedTop + 'px) scaleX(' + invertedWidth + ') scaleY(' + invertedHeight + ')';

        elem.addEventListener('transitionend', function handler(event) {
            elem.style.transform = '';
            elem.style.transformOrigin = '';
            elem.classList.remove('transition');
            elem.classList.remove('initial');
            elem.removeEventListener('transitionend', handler);  
        });
    }

    /* Main Content Toggle */
    var content = false;
    function viewContent(){
        content = true;
        resizeexpanded = resize.getBoundingClientRect();
        $(resize).css("width",resizeIdWidth);
        $(resize).css("height",resizeIdWidth);
        resizecollapsed = resize.getBoundingClientRect();
        $(resize).addClass('transition');
        transform(resize, resizecollapsed, resizeexpanded);

        $(right).css("width",halfWindowWidth);
        rightcollapsed = right.getBoundingClientRect();
        $(right).css("width",contentWidth);
        $(right).css("left",resizeIdWidth);
        rightexpanded = right.getBoundingClientRect();
        $(right).addClass('transition');
        transform(right, rightcollapsed, rightexpanded);
        
        $('#main-menu ul li').css("animation-play-state","running");
        $('.hero-text').css("animation-play-state","running");
        setTimeout(function(){
            $('#left-menu').css("display","block");
            $('#main-menu').css("display","none");
        }, 500);
        setTimeout(function(){
            $('.section').css("display","block");
            $('#left').css("position","fixed");
        }, 1500);
    }
    $('#main-menu ul li').on('click', function(){
        viewContent();
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
                    sectionTitleColor = "#3C385E"; //getting section title color in view
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