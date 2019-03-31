(function(){
	var tbl; var config;
	httpGET('app_config/config', initialize);
	
	/*
	* initialize content
	*/
	function initialize(data) {
		config = data
		tbl = $('#dg').datagrid(datagridOption);
		tbl.datagrid({
			title: config.controller,
			url: config.load,
			toolbar: $('#tb'),
			onLoadSuccess: function(){
				$(this).datagrid('resize');
			},
			pageNumber: 1,
			pageSize: getCurentSize(),
			pageList: getPageSize(),
			frozenColumns:[[
				{field: 'options', title: 'ACTION', width: 70, halign: 'center', align: 'center', formatter: actionGridButton}
			]],	
			columns:[[
				// {field:'configuration_id', title:'CONFIGURATION ID', halign: 'center', sortable:"true", width:200},
				{field:'app_config', title:'CONFIGURATION', halign: 'center', sortable:"true", width:320},
				{field:'value', title:'VALUE', halign: 'center', sortable:"true", width:200},
				{field:'description', title:'DESCRIPTION', halign: 'center', sortable:"true", width:500},
				{field:'created_by', title:'CREATED BY', halign: 'center', sortable:"true", width:200},
				{field:'created_date', title:'CREATED DATE', halign: 'center', sortable:"true", width:200},
				{field:'modified_by', title:'MODIFIED BY', halign: 'center', sortable:"true", width:200},
				{field:'modified_date', title:'MODIFIED DATE', halign: 'center', sortable:"true", width:200},
			]],
			onBeforeLoad:function (param){
				// param.xdata = getCSRToken();        // add the parameter code and addr
			},
			onLoadSuccess: function(data) {
				setCSRToken(data);
				tbl.datagrid('resize');
				// bind action
				var all = document.getElementsByClassName("action-grid");
				for (var i = 0, max=all.length; i < max; i++) {
					var btnEdit = all[i].getElementsByClassName("btn-success")[0];
                    var btnDelete = all[i].getElementsByClassName("btn-danger")[0];
                    var rowData = data.rows[i];
					(function (btnEdit, btnDelete, rowData) {
						btnEdit.addEventListener("click", function(){actionGridUpdate(rowData)});
						// btnDelete.addEventListener("click", function(){actionGridDelete(rowData)});
					})(btnEdit, btnDelete, rowData)
				}
			}
		});
		tbl.datagrid('enableFilter', []);
		$("input[name='options']").remove(); // remove filter action column
		// add resize event listener table
        var resizeElement = document.getElementById("tbl-content"), resizeCallback = function() {tbl.datagrid('resize');};
		addResizeListener(resizeElement, resizeCallback);
		actionGridCreate("content-create");
		hideLoading();
	}
	
	/*
	* action button generator
	*/
	function actionGridButton(val, row, index) {
        var	updateButtom = btnGenerator('success', 'fa fa-pencil');
        var	deleteButtom = '';//btnGenerator('danger', 'fa fa-times');
		return '<div class="action-grid">' + updateButtom + ' ' + deleteButtom + '</div>';
	}
	
	/*
	* create action
	*/
	function actionGridCreate(id) {
		document.getElementById(id).onclick = function(){
            var paramCreate = '1' // {xdata: getCSRToken()};
			$('#content-main').load(config.form);
		}
	}
	
	/*
	* update action
	*/
	function actionGridUpdate(val) {
		$('#content-main').load(config.form, val);
	}
	
	/*
	* delete action
	*/
	function actionGridDelete(val) {
		$.confirm({
			title: 'Confirm!',
			content: 'Are you sure delete this row?',
			buttons: {
				confirm: {
					btnClass: 'btn-red',
					action: function () {
                        var paramDelete = val;
						$.post(config.delete, paramDelete, function(data, status){
                            var response = JSON.parse(data);
							setCSRToken(response);
							if ('success' == status && 1 == response.status) {
								tbl.datagrid('reload');
								$.alert('Confirmed!');
							} else {
								$.alert('Delete failed!'+data+'|'+status);
							}
						});
					}
				},
				cancel: function () {
					$.alert('Canceled!');
				}
			}
		});
	}
	
})();