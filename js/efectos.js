$(document).ready(function($) {

	$(window).load(function() {
	// setTimeout(function(){
		$(".load").fadeOut(800);
	// },2000);
	}); 

	$("a.transicion").transicion();

    new WOW().init();



// ---Funciones Menu Movil---

	$(".fxd_btn_menu").on('click',function(event) {
		event.preventDefault();

		$("body").css({
			"overflow": 'hidden'
		});
		$(".menu_movil").fadeIn(150,function() {
			$(".menu_circulo").animate({
				"margin-left": 0},
				350, function() {
					$(this).animate({
					 "background-position-x":"-20px"
					});
					$(".menu_conten").fadeIn();
			});
		});		
	});
	$(".menu_btn_close").on('click', function(event) {
		event.preventDefault();
		$("body").css({
			"overflow": 'auto'
		});
		$(".menu_conten").fadeOut(150,function() {
			$(".menu_circulo").animate({
				"margin-left": "-100%",
				"background-position-x":"0px"},
				200, function() {
				$(".menu_movil").fadeOut();
			});
		});
	});
	$(".btns_menu").on('click', function() {

		$("body").css({
			"overflow": 'auto'
		});

		$(".menu_conten").fadeOut(150,function() {
			$(".menu_circulo").animate({
				"margin-left": "-100%",
				"background-position-x":"0px"},
				300, function() {
				$(".menu_movil").fadeOut();
			});
		});
	});

	
// ---Funciones Cambio Scroll ---
	
	$(window).scroll(function(){

		var cambio=($(window).scrollTop()>0)?true:false;

		if (cambio){
			$(".menu_movil_fxd, header").addClass('fxd_cambio');
			$(".fxd_logo").show();
		}else{
			$(".menu_movil_fxd, header").removeClass('fxd_cambio');
			$(".fxd_logo").hide();
		};

	});


	var alto = $(window).height();

	$(".section").css({
		"height": alto
	});



	var ancho_min=($(window).width()>=600)?true:false;
	var ancho_max=($(window).width()<1023)?true:false;

	if (ancho_min && ancho_max) {

	bx_2 = $('.bxslider').bxSlider({
			pause: 3000,		
			slideWidth: 400,
	  		minSlides: 2,
			maxSlides: 2,
			auto: true,
			pager: false,
			infiniteLoop: false,
			hideControlOnEnd: true,
			adaptiveHeight: true,
			adaptiveHeightSpeed: 300,
			oneToOneTouch: false,
			preventDefaultSwipeX: false
	  	});

	}else{
		bx_1 = $('.bxslider').bxSlider({
			pause: 3000,
			auto: true,
			infiniteLoop: false,
			hideControlOnEnd: true,
			pager: false,
			adaptiveHeight: true,
			adaptiveHeightSpeed: 300,
			oneToOneTouch: false,
			preventDefaultSwipeX: false
	  	});

	}

	$(window).on('resize', function(){

		var ancho_min=($(window).width()>=600)?true:false;
		var ancho_max=($(window).width()<1023)?true:false;

		if (ancho_min && ancho_max) {
			bx_1.destroySlider();
			bx_2 = $('.bxslider').bxSlider({
			pause: 3000,		
			slideWidth: 400,
	  		minSlides: 2,
			maxSlides: 2,
			auto: true,
			pager: false,
			infiniteLoop: false,
			hideControlOnEnd: true,
			adaptiveHeight: true,
			adaptiveHeightSpeed: 300,
			oneToOneTouch: false,
			preventDefaultSwipeX: false
	  	});
		
			
		}else{
			bx_2.destroySlider();
			bx_1 = $('.bxslider').bxSlider({
				pause: 3000,
				auto: true,
				infiniteLoop: false,
				hideControlOnEnd: true,
				pager: false,
				adaptiveHeight: true,
				adaptiveHeightSpeed: 300,
				oneToOneTouch: false,
				preventDefaultSwipeX: false
		  	});
		}

	});	

	
	$("#info_la_1").show();
	$("#la_1").css('background-image','url(imgs/la_educacion_click.png)');

	$(".sec_circulos").on('click', '.btn_la', function(event) {
		event.preventDefault();

		$(".btn_la").removeAttr("style");

		var fondo = $(this).data("fondo");
		
		$(this).css('background-image', 'url('+fondo+')');

		var id = $(this).attr("id");

		$(".txt_info").hide();
		$("#info_"+id).fadeIn();

	});

	// configuracion toastr
	toastr.options = {	 
	  "positionClass": "toast-bottom-right",
	  "preventDuplicates": true  
	}

	$("#contacto_mondo").validate({
		submitHandler: function () {

			var $this = $('#contacto_mondo');
			
			toastr.info("Enviando...");

	        // obtener datos del formulario
	        var inputs = $this.serializeArray();
	        var objData = {};

	        for (var i = 0; i < inputs.length; i++) {
	            objData[inputs[i].name] = inputs[i].value;
	        };

	        $.ajax({
	            type : "POST",
	            url : "sendmail.php",
	            data : objData
	        })
	        .done(function(data){
			    toastr.success("Enviado");


	            $this.find('input[type="text"]').val('');
	            $this.find('input[type="email"]').val('');
	            $this.find('textarea').val('');
	        })
	        .fail(function(data){
	            $this.find('.text-warncing').text(data);  
			    
			    toastr.warning("Error de envío");       

	        });
		
			return false;
		},
		rules: {
			nombre: "required",
			asunto: "required",
			mensaje: "required",
			correo: {
				required: true,
				email: true
			},	
		},
		messages: {
			nombre:	"Este campo es requerido",
			asunto: "Este campo es requerido",
			mensaje: "Este campo es requerido",
			correo: {
			  required: "Este campo es requerido",
			  email: "Introduzca una dirección de correo electrónica válida"
			}
		},
	  	onkeyup: false,
	  	onclick: false,
	  	onfocusout : false
	});	


	/*
	* agenda
	*/

	/*
	* swig filters
	*/

	moment.locale('es');

	swig.setFilter("locale", function(input){
		var datetime = moment(input);	
		return datetime.format("LLL")
	});

	swig.setFilter("calendar", function(input){
		// 11/20/2015 11:00 AM
		var datetime = moment(input);		
		return datetime.format("MM/DD/YYYY hh:mm A")
	});

	swig.setFilter("monthyear", function(input, confString){
		var datetime = moment(input, "YYYY-MM");
		
		return datetime.format(confString)
	});

	var renderEvents = function(data){			
		var obj = { eventsByMonth : data };
		var tpl = swig.render($("#tasks_template").html(), { locals: obj});
		var tpl_pager = swig.render($("#tasks_pager_template").html(), { locals: obj});
		
		
		$(".agenda-viewport").html(tpl);
		$(".agenda-pager .pager").html(tpl_pager);

		// agregar a calendario
		addeventatc.settings({
		    license    : "00000000000000000000",		
			css        : false,
		    outlook    : {show:true, text:"Outlook"},
		    google     : {show:true, text:"Google <em>(en linea)</em>"},
		    yahoo      : {show:true, text:"Yahoo <em>(en linea)</em>"},
		    outlookcom : {show:true, text:"Outlook.com <em>(en linea)</em>"},
		    appleical  : {show:true, text:"Apple Calendar"},		    
		    dropdown   : {order:"outlook,google,yahoo,outlookcom,appleical"}
		});	


		// paginacion de la agenda
		$('.pager-month').on('click', function(event){	
			event.preventDefault();

			var parent = $(event.target).parents(".pager-month");
			var tag = parent.data("month");

			$('.agenda-container').stop().animate({
		        scrollTop: $(tag).offset().top
		    }, 500);
		});	
	};


	$.ajax({
		type : "POST",
		url : "config/token.json",
		dataType : "json"
	})
	.done(function(data){
		WunderTasks({ 
			listID : 224137322,
			renderCallback : renderEvents,
			accessToken : data.accessToken,
			clientID : data.clientID
		});	
	});
		
});