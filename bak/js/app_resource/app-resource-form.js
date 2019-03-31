(function(){
	let process = false; 	// flag submit
	var param = formData.data; 	// form data from file form.php, assign to local variable
	// ui component declare bellow here
	let roleSelect = document.getElementById("role-id");
	// first initial
	$(".chosen-select").chosen({});
	
	httpGET('app_role_menu/load_form_params', function(response){
		formSelectOptionGenerator(roleSelect, param, response, 'app_role', 'role_id', 'role_name');
		$(".chosen-select").chosen({}).trigger("chosen:updated");
	});
	initialize();
	
	function initForUpdate(param){
		if(!isEmpty(param)){
			// $("#role-id").prop('disabled', true);
			$("#nip").prop('disabled', true);
			$("#username").prop('disabled', true);
			$("#password").prop('disabled', true);
		}
		return param;
	}
	
	/*
	initialize form
	*/
	function initialize() {
		initForUpdate(param);
		console.log('initialize');
		var createFormValidate = {
            role_id: { required: true},
            nip: { required: true, minlength: 5,
                remote: {
                    url: "app_resource/form_validate",
                    type: "post",
                }
            },
            name: { required: true, minlength: 3},
            username: { required: true, minlength: 5,
                remote: {
                    url: "app_resource/form_validate",
                    type: "post",
                }
            },
            password: { required: true, minlength: 6}
        };
        var updateFormValidate = {
            role_id: { required: true},
            name: { required: true, minlength: 3},
            username: { required: true, minlength: 5,
                remote: {
                    url: "app_resource/form_validate",
                    type: "post",
                }
            },
            password: { required: true, minlength: 6}
        };

        var currentValidate = (!isEmpty(param) ? updateFormValidate : createFormValidate);
		let formUI = $('#fm');
		formUI.form('load', param);
		formUI.validate({
			ignore: ":hidden:not(select)",
			errorPlacement: errorMessageForm,
			focusCleanup: false,
			onkeyup: false,
			rules: currentValidate,
			messages: {
				role_id: { required:  "Pilih role"},
				name: { required: "isi name", minlength: "minimal 3 karakter"},
				nip: { required: "isi nip", minlength: "minimal 5 karakter",
					remote : "nip sudah tersedia!"
				},
				username: { required: "isi username", minlength: "minimal 5 karakter",
					remote : "username sudah tersedia!"
				},
				password: { required: "isi password", minlength: "minimal 6 karakter"},
			},
			submitHandler: function (form) {
				if (process) {return};	// checking submit press before, if not set to true
				process = true; 		// start form submit, use if need logic 
				$(form).ajaxSubmit({
					url: formData.form_url,
					dataType: 'json',
					beforeSubmit: function(form, options) {
						if(!isEmpty(param)){
							form.push({name: 'resource_id', value: param.resource_id});
						}
					},
					error: function showInfo(responseText, statusText, xhr, $form) {
						process = false;
						if (200 != responseText.status) {
							alert('Error : ' + responseText);
						}
					},
					success: function showResponse(responseText, statusText, xhr, $form) {
						process = false;
						let response = xhr.responseJSON;
						if (statusText && (1 == response.status)) {
							cancel();
						} else {
							alert(statusText + " : " + responseText);
						}
					},
				});
			}
		});
		component('cancel-form').onclick = function(){cancel();}
		$(".chosen-select").chosen({}).trigger("chosen:updated");
	}
	
	/*
	cancel action
	*/
	function cancel() {
		$('.content-wrapper').load(formData.content);
	}
	
})()