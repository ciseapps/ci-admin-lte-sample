(function(){
	let process = false; 	// flag submit
	var param = formData; 	// form data from file form.php, assign to local variable
	initialize();
	
	/*
	initialize form
	*/
	function initialize() {
		console.log('initialize');
		let formUI = $('#fm');
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
					data : param.configuration_id,
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
		document.getElementById('cancel-form').onclick = function(){cancel();}
	}
	
	/*
	cancel action
	*/
	function cancel() {
		$('.content-wrapper').load(formData.content);
	}
	
})()