(function(){
	let tbl; let config;
	var option = {
        title: "System Sequence",
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
            {field:'id', title:'ID', halign: 'center', sortable:"true", width:200},
            {field:'name', title:'NAME', halign: 'center', sortable:"true", width:200},
            {field:'prefix', title:'PREFIX', halign: 'center', sortable:"true", width:200},
            {field:'increment', title:'INCREMENT', halign: 'center', sortable:"true", width:200},
            {field:'pad', title:'PAD', halign: 'center', sortable:"true", width:200},
            {field:'row', title:'ROW', halign: 'center', sortable:"true", width:200},
            {field:'used', title:'USED', halign: 'center', sortable:"true", width:200},
            {field:'last_insert_id', title:'LAST INSERT ID', halign: 'center', sortable:"true", width:200},
        ]],
        onBeforeLoad:function (param){
            // param.xdata = getCSRToken();        // add the parameter code and addr
        },
        onLoadSuccess: function(data) {
            setCSRToken(data);
            tbl.datagrid('resize');
            // bind action
            let all = document.getElementsByClassName("action-grid");
            for (var i = 0, max=all.length; i < max; i++) {
                let btnEdit = all[i].getElementsByClassName("btn-success")[0];
                let btnDelete = all[i].getElementsByClassName("btn-danger")[0];
                let rowData = data.rows[i];
                (function (btnEdit, btnDelete, rowData) {
                    btnEdit.addEventListener("click", function(){actionGridUpdate(rowData)});
                    btnDelete.addEventListener("click", function(){actionGridDelete(rowData)});
                })(btnEdit, btnDelete, rowData)
            }
        }
    };
    var dgOption = {};
    mergeObject(datagridOption, dgOption);
    mergeObject(option, dgOption);
    tbl = $('#dg').datagrid(dgOption);
	httpGET('app_table_sequence/config', initialize);
	
	/*
	* initialize content
	*/
	function initialize(data) {
		config = data
        $('#dg').datagrid({
            url: config.load,
        });
        $('#dg').datagrid('enableFilter', []);
		$("input[name='options']").remove(); // remove filter action column
		// add resize event listener table
		let resizeElement = document.getElementById("tbl-content"), resizeCallback = function() {tbl.datagrid('resize');};
		addResizeListener(resizeElement, resizeCallback);
		actionGridCreate("content-create")
	}
	
	/*
	* action button generator
	*/
	function actionGridButton(val, row, index) {
		let	updateButtom = btnGenerator('success', 'fa fa-pencil');
		let	deleteButtom = btnGenerator('danger', 'fa fa-times');
		return '<div class="action-grid">' + updateButtom + ' ' + deleteButtom + '</div>';
	}
	
	/*
	* create action
	*/
	function actionGridCreate(id) {
		document.getElementById(id).onclick = function(){
			let paramCreate = '1' // {xdata: getCSRToken()};
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
						let paramDelete = val;
						$.post(config.delete, paramDelete, function(data, status){
							let response = JSON.parse(data);
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
	
})()