// funciones para uso de api de wunderlist

var WunderTasks = function(options){	

	/*
	* variables y dependencias
	*/

	var self = this;

	// obtener SDK
	var WunderlistSDK = window.wunderlist.sdk;

	// instancia de wunderlist api (proteger datos de acceso)
	self.WunderlistAPI = new WunderlistSDK({
	  'accessToken': options.accessToken,
	  'clientID': options.clientID
	});

	// id de la lista
	self.listID = options.listID;

	// callback para renderizar datos
	self.renderCallback = options.renderCallback;


	/*
	* Metodos privados
	*/

	var createGroupedArray = function(arr, chunkSize) {
	    var groups = [], i;
	    for (i = 0; i < arr.length; i += chunkSize) {
	        groups.push(arr.slice(i, i + chunkSize));
	    }
	    return groups;
	}

	// llamada de datos a Wunderlist
	var dataCallback = function(){

		// llamadas a la api de wunderlist
		var getTasks = WunderlistAPI.http.tasks.forList(self.listID);
		var getNotes = WunderlistAPI.http.notes.forList(self.listID);
		var getReminders = WunderlistAPI.http.reminders.forList(self.listID);

		// callback tareas
		var tasksCallback = function(){
			var d = Q.defer();	

			getTasks.done(function(tasks){
				d.resolve(tasks);
			});

			return d.promise;
		}

		// callback notas
		var notesCallback = function(){
			var d = Q.defer();	
			
			getNotes.done(function(notes){
				d.resolve(notes);
			});

			return d.promise;
		}

		// callback recordatorios
		var remindersCallback = function(){
			var d = Q.defer();	
			
			getReminders.done(function(reminders){
				d.resolve(reminders);
			});

			return d.promise;
		}


		// realizar todas las llamadas
		Q.all([ tasksCallback(), notesCallback(), remindersCallback() ])	
			// obtener tareas, notas y reminders. Relacionar y ordenar en un arreglo
			.spread(function(tasksData, notesData, remindersData){				

				var d = Q.defer();
				var tasksWithNote = [];

				// ordenar tareas por fecha (orden ascendente)
				var tasksData = _.sortBy(tasksData, 'due_date');

				// iterar sobre las tareas
				for (var i = 0; i < tasksData.length; i++) {				
					// buscar nota de la tarea
					var noteForTask = _.findWhere(notesData, { task_id : tasksData[i].id });			
					// buscar recordatorio de la tarea
					var reminderForTask = _.findWhere(remindersData, { task_id : tasksData[i].id })
					
					// genero objeto y agrego a arreglo
					if (typeof noteForTask !== "undefined" && typeof reminderForTask !== "undefined") {
						tasksWithNote.push({ task : tasksData[i], note : noteForTask, reminder : reminderForTask });					
					};				
				};

				d.resolve(tasksWithNote);
				
				return d.promise;		

			})
			.done(function(events){		
				// agrupar items por mes
				groupEvents = _.groupBy(events, function(obj){
					return obj.task.due_date.split("-", 2).join("-");
				});				

				groupEvents = _.mapObject(groupEvents, function(val, key){
					return createGroupedArray(val, 3);
				});				


				if (typeof self.renderCallback === "function") {
					self.renderCallback(groupEvents);	
				};				
			});
	}

	// llamar datos al inicializar Api de Wunderlist
	self.WunderlistAPI.initialized.done(dataCallback);
}