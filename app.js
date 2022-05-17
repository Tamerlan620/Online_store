let page = false;
$(".pages").click(function(){
    if(page === false){
        $(".dropdawn-left").css("position","static");
        $(".dropdawn-left").css("opacity","1");
        $(".dropdawn-left").css("transition",".2s");
        $(".fa-caret-down").css("transform","rotate(0deg)","transition","0.5s");
      
        page = true
    }

    else if(page === true){
        $(".dropdawn-left").css("position","absolute");
        $(".dropdawn-left").css("opacity","0");
        $(".dropdawn-left").css("transition",".2s");
        $(".fa-caret-down").css("transform","rotate(-90deg)","transition","0.5s");
        $(".fa-caret-down").css("transition","0.5s");
        page = false;
    }

})

let dubleclick = true
$(".navbar-toggler").click(function(){
    if(dubleclick===true){
        $(".left-nav").css("left","0");
        $(".left-nav").css("transition",".5s");
        dubleclick = false;
        
    }

    else if(dubleclick===false){
        $(".left-nav").css("left","-330px");
        $(".left-nav").css("transition",".5s");
        dubleclick = true;
        
    }
})

$(".fa-times-circle").click(function(){
    $(".left-nav").css("left","-330px");
    $(".left-nav").css("transition",".5s");
})



let up_down = false

$(".departments").click(function(){
    if(up_down === true){
        $(".alldepartments").css("margin-top","-410px");
        $(".alldepartments").css("transition","0.5s");
        up_down = false;
        
    }
    else if(up_down === false){
        $(".alldepartments").css("margin-top","0");
        $(".alldepartments").css("transition","0.5s");
        up_down = true;
       
    }
})




                                                        // Section2 start


                                                        
$(function(){
    $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows:true,
        autoplay:true,
        autoplaySpeed:5000,
        centerMode: true,
        centerPadding: 0,
        prevArrow:".left_button",
        nextArrow:".right_button",
        
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
               
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
            
          ]
    });
})






$(function(){
    $('.slider_content').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        autoplay:true,
        autoplaySpeed:5000,
        centerMode: true,
        centerPadding: 0,
        prevArrow:".to_left",
        nextArrow:".to_right",
    })
})

$(function(){
    $('.slider_content1').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        autoplay:true,
        autoplaySpeed:5000,
        centerMode: true,
        centerPadding: 0,
        prevArrow:".to_left2",
        nextArrow:".to_right2",
    })
})


$(function(){
    $('.slider_content3').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        autoplay:true,
        autoplaySpeed:5000,
        centerMode: true,
        centerPadding: 0,
        prevArrow:".to_left3",
        nextArrow:".to_right3",
    })
})




$(".close-cart").click(function(){
    $('.cart-overlay').css("visibility", "hidden")
    $('.cart').css("transform", " translateX(100%)")
})
$(".nav-icon").click(function(){
    $('.cart-overlay').css("visibility", "visible")
    $('.cart').css("transform", " translateX(0%)")
})