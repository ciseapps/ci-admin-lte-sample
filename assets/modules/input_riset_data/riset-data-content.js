(function () {

    // import commons
    const common = new Common();
    const commonGrid = new CommonGrid();
    // update title
    common.setTitle("Riset Data");
    // ui components
    let uiTbl = $("#tbl-riset-data");

    initializeGrid();
    initialize();

    /*
    * initialize content
    */
    function initialize() {
        $("#btn-create").click(function () {
            common.removeCookie("module.riset.data.update");
            common.direct("input_riset_data/form");
        });
    }

    function initializeGrid() {
        let option = {
            title: "Riset Data",
            toolbar: toolbar(),
            url: common.baseURL("input_riset_data/load"),
            pageNumber: 1,
            pageSize: commonGrid.getCurentSize(),
            pageList: commonGrid.getPageSize(),
            frozenColumns: [[
                {
                    field: 'options',
                    title: 'ACTION',
                    width: 100,
                    halign: 'center',
                    align: 'center',
                    formatter: formatterButton
                }
            ]],
            columns: [[
                //{field:'id_trx', title:'ID TRX', halign: 'center', align: 'left', sortable:"true", width:200},
                {field: 'riset', title: 'RISET', halign: 'center', align: 'left', sortable: "true", width: 500},
                //{field:'kegiatan', title:'RISET KEGIATAN', halign: 'center', align: 'left', sortable:"true", width:275},
                {
                    field: 'kode_satker',
                    title: 'SATKER',
                    halign: 'center',
                    align: 'center',
                    sortable: "true",
                    width: 150
                },
                {field: 'keyword', title: 'KEYWORD', halign: 'center', align: 'center', sortable: "true", width: 150},
                {
                    field: 'start_date_month',
                    title: 'START DATE',
                    halign: 'center',
                    align: 'center',
                    sortable: "true",
                    width: 110
                },
                {
                    field: 'finish_date_month',
                    title: 'FINISH DATE',
                    halign: 'center',
                    align: 'center',
                    sortable: "true",
                    width: 110
                },
                {
                    field: 'jml_trx',
                    title: 'KEGIATAN',
                    halign: 'center',
                    align: 'center',
                    sortable: "true",
                    width: 110
                },
                {
                    field: 'progress',
                    title: 'PROGRESS(%)',
                    halign: 'center',
                    align: 'center',
                    sortable: "true",
                    width: 110
                },
                //{field:'keterangan', title:'KETERANGAN', halign: 'center', align: 'left', sortable:"true", width:250},
                //{field:'upload_file', title:'UPLOAD FILE', halign: 'center', align: 'left', sortable:"true", width:200},
                //{field:'created_by', title:'CREATED BY', halign: 'center', align: 'left', sortable:"true", width:200},
                //{field:'created_date', title:'CREATED DATE', halign: 'center', align: 'left', sortable:"true", width:200},
                //{field:'modified_by', title:'MODIFIED BY', halign: 'center', align: 'left', sortable:"true", width:200},
                //{field:'modified_date', title:'MODIFIED DATE', halign: 'center', align: 'left', sortable:"true", width:200},
            ]],
            onBeforeLoad: function (param) {

            },
            onLoadSuccess: function (data) {
                $(this).datagrid('resize');
                optionButton(data);
            }
        };
        uiTbl.datagrid(commonGrid.optionValue(option));
    }

    function toolbar() {
        const btnExport = '<button id="btn-export" type="button" class="btn btn-success btn-sm fa fa-file-excel-o "> &nbsp;&nbsp;Save To Excel</button>';//commonGrid.btnBuilder('btn-export', 'success', 'fa fa-file-excel-o');
        return '<div class="action-grid-toolbar">' + btnExport + '</div>';
    }

    function optionButton(data) {
        //console.log(session);
		//console.log(data);
        let btnContent = $(".action-grid");
        let index = 0;
        for (const btns of btnContent) {
            const param = data.rows[index];
            const btnEdit = $(btns).find("a.btn-success");
            const btnNotify = $(btns).find("a.btn-info");
            const btnApprove = $(btns).find("a.btn-warning");
            btnEdit.click(function () {
                updateRow(param);
            });
			btnNotify.click(function () {
                notifyRow(param);
            });
			btnApprove.click(function () {
                approveRow(param);
            });
            index++;
        }
		
		$('#btn-export').click(function(){
		  exportXls();
		});
    }

    /*
    * action button generator
    */
    function formatterButton(val, row, index) {
        const btnUpdate = commonGrid.btnBuilder('btn-update', 'success', 'fa fa-file-text-o');
        const btnNotify = commonGrid.btnBuilder('btn-notify', 'info', 'fa fa-paper-plane','Send Email');
        const btnApprove = commonGrid.btnBuilder('btn-approve', 'warning', 'fa fa-check');
        const btnDelete = commonGrid.btnBuilder('btn-delete', 'danger', 'fa fa-times');
		console.log(row);
        if (2 == session.role_id || 1 == session.role_id) {
            if (2 == row.status){
				return '<div class="action-grid">' + btnUpdate + ' ' + btnNotify + ' ' + btnApprove + '</div>';
			}else{
				return '<div class="action-grid">' + btnUpdate + '</div>';
			}
        } else {
            if (2 == row.status){
				return '<div class="action-grid">' + btnUpdate + ' ' + btnNotify +'</div>';
			}else{
				return '<div class="action-grid">' + btnUpdate + '</div>';
			}
        }
    }

    function updateRow(val) {
        common.setCookie("module.riset.data.view", val);
        common.direct("input_riset_data/view");
    }
	
    function deleteRow(val) {
        common.dialogDelete(function () {
            $.post("input_riset_data/delete", val, function (data, status) {
                if (200 === data.code) {
                    $.alert("Delete success!");
                    uiTbl.datagrid("reload");
                } else {
                    $.alert(status);
                }
            })
        });
    }

    function exportXls(val) {
        common.direct("input_riset_data/exportxls");
    }

	function notifyRow(val) {
        common.dialogNotifyEmail(function () {
            $.post("input_riset_data/send_email", val, function (data, status) {
                if ('OK' === data) {
                    $.alert("Send Email success!");
                    uiTbl.datagrid("reload");
                } else {
                    $.alert(status);
                }
            })
        });
    }
	
	function approveRow(val) {
        common.dialogApprove(function () {
            $.post("input_riset_data/approve_riset", val, function (data, status) {
                 if (200 === data.code) {
                    $.alert("Approved riset success!");
                    uiTbl.datagrid("reload");
                } else {
                    $.alert(status);
                }
            })
        });
    }

})();