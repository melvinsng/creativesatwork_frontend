$( document ).ready(function() {
  
  $(".signup-area-search").click(function(){
  		//$(".search").hide(); 
  		event.preventDefault(); 		
  		$(".header-search-area").fadeToggle(300);
  		$(".header-search-area-input").focus();

});
  
  // function to switch the modal window of Pick a trip deck - create a new trip
  	  $(".btn-filter-mood").click(function() {
  	  	event.preventDefault();
  	  	
  	  	if($(this).hasClass("active") == true){
  	  		$(this).removeClass("active");				  		
  	  	}
  	  	else {
  	  		$(this).addClass("active");
  	  	}
  	  					  	
  	  	$(".mood-filter-div").slideToggle(300);
  	  });
  	  
  	  
  	  $(".trip-deck-select").change(function () {
  	  
  	  	if($(".trip-deck-select").val()=="create-new-trip"){
  	  		$(".create-new-trip-input-form").show();
  	  	}
  	  	else{
  	  		$(".create-new-trip-input-form").hide();
  	  	}
  	  
  	  });
  	  
  												
   // Navigation Menu Slider
   
    $('#nav-expander').on('click',function(e){
  		e.preventDefault();
  		$('body').toggleClass('nav-expanded');
  	});
  	
  	$('#nav-close').on('click',function(e){
  		e.preventDefault();
  		$('body').removeClass('nav-expanded');
  	});

  	// Initialize navgoco with default options
    $(".main-menu").navgoco({
        caret: '<span class="caret"></span>',
        accordion: false,
        openClass: 'open',
        save: true,
        cookie: {
            name: 'navgoco',
            expires: false,
            path: '/'
        },
        slide: {
            duration: 300,
            easing: 'swing'
        }
    });


      
});  
  
  
  // for quiz
  
  $(document).ready(function(){

  	var $element_array = $(".quiz_box");
  	$(window).scroll(function(){
  
      	$element_array.each (function(){
      	     
              if (($(this).position().top+ $(this).height()) < $(window).scrollTop() + 300){
              	
                  $(this).css("opacity","1");
                  $(this).css("-moz-opacity","1");
                  $(this).css("-khtml-opacity","1");
                  
                  
                }
              if (($(this).position().top) > $(window).scrollTop()) {
              	$(this).css("opacity","0.5");
              	$(this).css("-moz-opacity","0.5");
              	$(this).css("-khtml-opacity","0.5");              	
              }	
              
              
      	});
      
  	}); // end
  	
  	
  	$(".quiz_box .form-group .radio").click(function () {
  		var target = "#" + $(this).parents().attr("role");
  		console.log(target);
  		
  	   if($(this).parents().attr("role")){
  		
  		
  		$('html,body').animate({
  		     scrollTop: $(target).offset().top - 50
  		 }, 500);
  		 
  		} 
  		 
  		 		  	
  	});
  	
  	
  });
  


  
  
  
  
  // ----- end of quiz script ------------------------------------------------------------------------------- 
  
  
  
  // FOR CREATE - date picker for trip deck, this code disabling dates in the past and dependent disabling. 
  
  var nowTemp = new Date();
  var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
   
  var checkin = $('.dpd1').datepicker({
  	format: 'dd/mm/yyyy',
    onRender: function(date) {
      return date.valueOf() < now.valueOf() ? 'disabled' : '';
    }
  }).on('changeDate', function(ev) {
    if (ev.date.valueOf() > checkout.date.valueOf()) {
      var newDate = new Date(ev.date)
      newDate.setDate(newDate.getDate() + 1);
      checkout.setValue(newDate);
    }
    checkin.hide();
    $('.dpd2')[0].focus();
  }).data('datepicker');
  var checkout = $('.dpd2').datepicker({
  	format: 'dd/mm/yyyy',
    onRender: function(date) {
      return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
    }
  }).on('changeDate', function(ev) {
    checkout.hide();
  }).data('datepicker');
  
 // ----- end ------------------------------------------------------------------------------- 
 
 // FOR EDIT - date picker for trip deck, this code disabling dates in the past and dependent disabling. 
  
  var nowTemp2 = new Date();
  var now = new Date(nowTemp2.getFullYear(), nowTemp2.getMonth(), nowTemp2.getDate(), 0, 0, 0, 0);
   
  var checkin2 = $('.dpd-edit-1').datepicker({
  	format: 'dd/mm/yyyy',
    onRender: function(date) {
      return date.valueOf() < now.valueOf() ? 'disabled' : '';
    }
  }).on('changeDate', function(ev) {
    if (ev.date.valueOf() > checkout.date.valueOf()) {
      var newDate = new Date(ev.date)
      newDate.setDate(newDate.getDate() + 1);
      checkout.setValue(newDate);
    }
    checkin2.hide();
    $('.dpd-edit-2')[0].focus();
  }).data('datepicker');
  var checkout2 = $('.dpd-edit-2').datepicker({
  format: 'dd/mm/yyyy',
    onRender: function(date) {
      return date.valueOf() <= checkin2.date.valueOf() ? 'disabled' : '';
    }
  }).on('changeDate', function(ev) {
    checkout2.hide();
  }).data('datepicker');
  
 // ----- end ------------------------------------------------------------------------------- 
 
 