$(document).ready(function(){
    var animationSpeed = 1000;
    var pause = 6000;
    var currentSlide = 1;
    var width = $('.slider-container').width();

    var $slider = $('#slider');

    var $slideContainer = $('.slides', $slider);
    var $slides = $('.slide', $slider);
    var $pagination = $('.pagination-link');

    var $pag_one = $('#pag-1');
    var $pag_two = $('#pag-2');
    var $pag_three = $('#pag-3');

    var excurrent = 0;
    var interval;
    var resizeId;

    const changePagination = () => {
      $pagination.removeClass('active-pagination');
      switch(currentSlide){
        case 1:
          $pag_one.addClass('active-pagination');
          break;
        case 2:
          $pag_two.addClass('active-pagination');
          break;
        case 3:
          $pag_three.addClass('active-pagination');
          break;
        case 4:
          $pag_one.addClass('active-pagination');
          break;
      }
    }

    $( window ).on("resize", function(){
      pauseSlider();
      width = $('.slider-container').width();
      $slideContainer.css('margin-left', 0);
      currentSlide=1;
      
      changePagination();
      clearTimeout(resizeId);
      resizeId = setTimeout(resizeEnd, 500);
    });

    const resizeEnd = () => {

      width = $('.slider-container').width();
      startSlider();
    }



    $pag_one.on("click", function(){
      pauseSlider()
      $pagination.removeClass('active-pagination');
      $(this).addClass('active-pagination');

      if(currentSlide === 2){
        $slideContainer.animate({'margin-left':0}, animationSpeed);

      }
      else if(currentSlide === 3){
        $slideContainer.animate({'margin-left':0}, animationSpeed);

      }
      currentSlide = 1;
      excurrent = 1;


    })
    $pag_two.on("click", function(){
      pauseSlider()
      $pagination.removeClass('active-pagination');
      $(this).addClass('active-pagination');

      if(currentSlide === 1 ||currentSlide === 4){
        $slideContainer.css('margin-left', 0);
        $slideContainer.animate({'margin-left': '-=' +width}, animationSpeed);

      }
      else if(currentSlide === 3){
        $slideContainer.animate({'margin-left': -width}, animationSpeed);

      }
      currentSlide = 2;
      excurrent = 2;

    })

    $pag_three.on("click", function(){

      pauseSlider()
      $pagination.removeClass('active-pagination');
      $(this).addClass('active-pagination');

      if(currentSlide === 1 ||currentSlide === 4){
        $slideContainer.css('margin-left', 0);
        $slideContainer.animate({'margin-left': '-=' +2* width}, animationSpeed);

      }
      else if(currentSlide === 2){
        $slideContainer.animate({'margin-left': '-=' + width}, animationSpeed);

      }
      currentSlide = 3;
      excurrent = 3;


    })

    const startSlider = () => {
        //console.log("start");
        interval = setInterval(function() {
            $slideContainer.animate({'margin-left': '-=' +width}, animationSpeed, function() {
              //console.log(width); 
              if(currentSlide === 1){
                excurrent = 1;
              }
              currentSlide++;
              excurrent++; 
              changePagination();

              if (currentSlide === ($slides.length)) {
                  currentSlide = 1;
                  excurrent++;
                  $slideContainer.css('margin-left', 0);
              }
              //console.log(currentSlide);
            });
        }, pause);
    }
    const pauseSlider = ()=> {
        //console.log("pause");
        clearInterval(interval);
    }



    $('.next').click(function(){
      pauseSlider()

      if (excurrent === ($slides.length)){
        $slideContainer.css('margin-left', 0);
        $slideContainer.animate({'margin-left': '-=' +width}, animationSpeed);
        currentSlide=2;
        excurrent=2;
      }
      else{
        if (currentSlide === ($slides.length -1)){
          $slideContainer.animate({'margin-left':0}, animationSpeed);
          currentSlide=1;
          excurrent=1;
        }
        else{
          $slideContainer.animate({'margin-left': '-=' +width}, animationSpeed);
          currentSlide++;
          excurrent++;
        }
        
      }

      changePagination();
      //console.log(currentSlide);
      
    })

    $('.prev').click(function(){
      pauseSlider()
      if (currentSlide === 1){
        $slideContainer.animate({'margin-left': '-=' +(2*width)}, animationSpeed);
        currentSlide=3;
        excurrent=3;
      }
      else if(excurrent === ($slides.length)){
        $slideContainer.animate({'margin-left': -width}, animationSpeed);
        currentSlide=3;
        excurrent=3;
      }
      else{
        if (currentSlide === 2){
          $slideContainer.animate({'margin-left':0}, animationSpeed);
          currentSlide=1;
          excurrent=1;
        }
        else{
          $slideContainer.animate({'margin-left': -width}, animationSpeed);
          currentSlide--;
          excurrent--;
        }
      }
      changePagination();

      //console.log(currentSlide);
      
    })
    
    $(".button-container").hover(function(){
      pauseSlider();
    }, function(){
      
      var hover_flag=$('.pagination-container').is(":hover");
      if(!hover_flag){
        startSlider();
      }

  });

    startSlider();

});
