(function(){
	var tbl; var config;
	httpGET('app_resource/config', initialize);

	function initialize(data) {
		config = data
		tbl = $('#dg').datagrid(datagridOption);
		tbl.datagrid({
			title: "User Access",
			url: config.load,
			toolbar: $('#tb'),
			pageNumber: 1,
			pageSize: getCurentSize(),
			pageList: getPageSize(),
			frozenColumns:[[
				{field: 'options', title: 'ACTION', width: 125, halign: 'center', align: 'center', formatter: actionGridButton}
			]],	
			columns:[[
				// {field:'resource_id', title:'RESOURCE ID', halign: 'center', align: 'left', sortable:"true", width:200},
				{field:'role_name', title:'ROLE', halign: 'center', align: 'left', sortable:"true", width:200},
				{field:'nip', title:'NIP', halign: 'center', align: 'left', sortable:"true", width:200},
				{field:'name', title:'NAME', halign: 'center', align: 'left', sortable:"true", width:200},
				{field:'username', title:'USERNAME', halign: 'center', align: 'left', sortable:"true", width:200},
				{field:'password', title:'PASSWORD', halign: 'center', align: 'left', sortable:"true", width:200},
				// {field:'type', title:'TYPE', halign: 'center', align: 'left', sortable:"true", width:200},
				// {field:'status', title:'STATUS', halign: 'center', align: 'left', sortable:"true", width:200},
				{field:'created_by', title:'CREATED BY', halign: 'center', align: 'left', sortable:"true", width:200},
				{field:'created_date', title:'CREATED DATE', halign: 'center', align: 'center', sortable:"true", width:200},
				{field:'modified_by', title:'MODIFIED BY', halign: 'center', align: 'left', sortable:"true", width:200},
				{field:'modified_date', title:'MODIFIED DATE', halign: 'center', align: 'center', sortable:"true", width:200},
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
                    var btnDetail = all[i].getElementsByClassName("btn-detail")[0];
                    var btnEdit = all[i].getElementsByClassName("btn-update")[0];
                    var btnDelete = all[i].getElementsByClassName("btn-delete")[0];
                    var btnApprove = all[i].getElementsByClassName("btn-approve")[0];
                    var btnDownload = all[i].getElementsByClassName("btn-download")[0];
                    var rowData = data.rows[i];
					(function (btnEdit, btnDelete, btnApprove, btnDownload, rowData) {
						if (btnDetail){ btnDetail.addEventListener("click", function(){actionGridDetail(rowData);});}
						if (btnEdit){ btnEdit.addEventListener("click", function(){actionGridUpdate(rowData)});}
						if (btnDelete){ btnDelete.addEventListener("click", function(){actionGridDelete(rowData)});}
						if (btnApprove){ btnApprove.addEventListener("click", function(){actionGridApprove(rowData);});}
						if (btnDownload){ btnDownload.addEventListener("click", function(){actionGridDownload(rowData);});}
					})(btnEdit, btnDelete, btnApprove, btnDownload, rowData)
				}
			}
		});
		tbl.datagrid('enableFilter', []);
		$("input[name='options']").remove();
        var resizeElement = document.getElementById("tbl-content"), resizeCallback = function() {tbl.datagrid('resize');};
		addResizeListener(resizeElement, resizeCallback);
		actionGridCreate("content-create");
		hideLoading();
	}
	
	/*
	* action button generator
	*/
	function actionGridButton(val, row, index) {
        var	detailButtom = "";//btnGenerator('success btn-detail', 'fa fa-list-ul fa-lg');
        var	updateButtom = btnGenerator('success btn-update', 'fa fa-pencil fa-lg');
		var	deleteButtom = btnGenerator('danger btn-delete', 'fa fa-times fa-lg');
        var	approveButtom = btnGenerator('success btn-approve', 'fa fa-key fa-lg');
        var	downloadButtom = "";
		if ("admin" === row.username) {
			deleteButtom = "";
		}
		return '<div class="action-grid">' + detailButtom + ' ' + updateButtom + ' ' + deleteButtom + ' ' + approveButtom + ' '+ downloadButtom + '</div>';
	}
	
	/*
	* create action
	*/
	function actionGridDetail(val) {
		$('#content-main').load(config.form_view, val);
	}
	
	/*
	* create action
	*/
	function actionGridCreate(id) {
		document.getElementById(id).onclick = function(){
            var paramCreate = '1'; // {xdata: getCSRToken()};
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
						console.log(paramDelete);
						$.post(config.delete, paramDelete, function(data, status){
                            var response = data;
							setCSRToken(response);
							if ('success' === status && 1 === response.status) {
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
	
	/*
	* approval action
	*/
	function actionGridApprove(val) {
		console.log(JSON.stringify(val));
		$.confirm({
			title: 'Confirm!',
			content: 'Are you sure reset password this row?',
			buttons: {
				confirm: {
					btnClass: 'btn-red',
					action: function () {
						$.post(config.approve, val, function(data, status) {
                            var response = data;
							setCSRToken(response);
							if ('success' === status && 1 === response.status) {
								tbl.datagrid('reload');
								$.alert('Reset password success!');
							} else {
								$.alert('Approve failed!'+data+'|'+status);
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
	
	/*
	* download action
	*/
	function actionGridDownload(val) {
        var param = {
			url: config.download_report,
			fileNameClient: config.download_report_file_name, 
			data: val
		};
		downloadReportData(param);
	}
	
})();