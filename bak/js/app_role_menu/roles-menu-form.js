(function(){
	var process = false; 	// flag submit
	var param = formData; 	// form data from file form.php, assign to local variable
    var menuSelect = document.getElementById("menuSelect");
    var roleSelect = document.getElementById("roleSelect");
	httpGET('app_role_menu/load_form_params', initialize);

    $("#roleSelect").change(function(){
    	var item = $("#roleSelect option:selected").val();
		console.log("OK change! "+item);
		httpPOST('app_role_menu/find_not_in_role', {role_id: item}, function(response){
            var values = {
                app_menu : response
            };
            formSelectOptionGenerator(menuSelect, param, values, 'app_menu', 'menu_id', 'menu_name');
            $(".chosen-select").chosen({}).trigger("chosen:updated");
		});
    });
	
	function initialize(formParam) {
		console.log(JSON.stringify(param.data));
        if(!isEmpty(param)){

		} else {

		}
		//formSelectOptionGenerator(menuSelect, param, formParam, 'app_menu', 'menu_id', 'menu_name');
		formSelectOptionGenerator(roleSelect, param, formParam, 'app_role', 'role_id', 'role_name');
		// menuSelect.value = param.data.menu_id;
		roleSelect.value = param.data.role_id;
		$(".chosen-select").chosen({}).trigger("chosen:updated");
		initializeForm();
	}

	/*
	initialize form
	*/
	function initializeForm() {
		console.log('initialize');
        var formUI = $('#fm');
		formUI.form('load', param.data);
		formUI.validate({
			focusCleanup: true,
			rules: {},
			messages: {},
			submitHandler: function (form) {
				if (process) {return};	// checking submit press before, if not set to true
				process = true; 		// start form submit, use if need logic
				$(form).ajaxSubmit({
					url: param.form_url,
					dataType: 'json',
					beforeSubmit: function(form, options) { 
						form.push({name: 'role_menu_id', value: param.data.role_menu_id});              
					},
					error: function showInfo(responseText, statusText, xhr, $form) {
						process = false;
						if (200 != responseText.status) {
							alert('Error : ' + responseText);
						}
					},
					success: function showResponse(responseText, statusText, xhr, $form) {
						process = false;
                        var response = xhr.responseJSON;
						if (statusText && (1 == response.status)) {
							cancel();
						} else {
							alert(statusText + " : " + responseText);
						}
					},
				});
			}
		});
		document.getElementById('cancel-form').onclick = function(){cancel();}
	}
	
	/*
	cancel action
	*/
	function cancel() {
		$('.content-wrapper').load(formData.content);
	}
	
})()