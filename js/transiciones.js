(function($){
	jQuery.fn.extend({
		transicion:function(opciones)
		{
			iniciales = {
				velocidad:1000
			}

			var opciones = $.extend({},iniciales,opciones);

			function inicializar()
			{

				function aDondeVoy(event)
				{
					event.preventDefault();
					
					var idEnlace = $(this).attr("href");
					var destinoPagina = $(idEnlace).offset().top;

					$("body,html").animate({
						scrollTop:destinoPagina
					},opciones.velocidad);
				}
				
				// EVENTOS Y ESTDOS iniciales
				$(this).on("click",aDondeVoy)
			}
			return $(this).each(inicializar);
		}
	})
})(jQuery);