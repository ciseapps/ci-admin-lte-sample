(function(){
	let process = false; 	// flag submit
	var param = formData.data; 	// form data from file form.php, assign to local variable
	let table = document.getElementById("tbl-detail");
	let config;
	console.log(param)

	httpGET('app_resource/config', initialize);
	
	/*
	* initialize content
	*/
	function initialize(data) {
		config = data
		delete param.nip_penanggung_jawab
		generateRow(table, param);
    	let footer = document.getElementById('form-footer-controll');
    	let buttonDownload = document.createElement("button");
    	buttonDownload.setAttribute("class", "btn btn-primary");
    	buttonDownload.innerText = "Download";
    	let buttonCancel = document.createElement("button");
    	buttonCancel.setAttribute("class", "btn btn-warning");
    	buttonCancel.innerText = "Close";
    	footer.appendChild(buttonDownload);
    	footer.appendChild (document.createTextNode (" "));
    	footer.appendChild(buttonCancel);
    	buttonDownload.onclick = function(){download(param);}
    	buttonCancel.onclick = function(){cancel();}	
	}

	function generateRow(table, param) {
		var rowNum = 0;
		for (var k in param) {
			let key = getRowIndex(k, rowNum);
			console.log(rowNum+':'+k);
			if ('undefined' != key) {
				var row = table.insertRow(rowNum);
    	    	if (param.hasOwnProperty(k)) {
    				var cell1 = row.insertCell(0);
    				var cell2 = row.insertCell(1);
    				var cell3 = row.insertCell(2);
    				// style
					cell1.setAttribute("width", "200px");
    				cell2.setAttribute("width", "10px");
    				// value
    				cell1.innerHTML = stringTitle(key);
    				cell2.innerHTML = ":";
    				// isObject
    				if (isObject(param[key])) {
    					generateRowDetailValue(cell3, param[key]);
    				} else {
    					cell3.innerHTML = param[key];
    				}
    	    	}
    	    }
    	    rowNum++;
    	}
	}

	function generateRowDetailValue(cell, param) {
		var ol = document.createElement('ol');
		ol.setAttribute("type", "1");
		for (var k in param) {
			var li = document.createElement('li');
			li.appendChild(document.createTextNode(param[k].nama));
			ol.appendChild(li);
		}
		cell.appendChild(ol);
	}

	function getRowIndex(key, rowNum) {
		let number = 0;
		// if ( (number++) === rowNum ) { return 'id';}
		// if ( (number++) === rowNum ) { return 'tanggal_pemeriksaan';}
	}
	

	function download(val) {
		delete val.inventor
		let param = {
			url: config.download_report,
			fileNameClient: config.download_file_name, 
			data: val
		}
		downloadReportData(param);
	}

    function cancel() {
		$('.content-wrapper').load(formData.content);
	}

})()