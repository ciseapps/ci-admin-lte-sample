(function () {

    // import commons
    const common = new Common();
    const commonGrid = new CommonGrid();
    // update title
    common.setTitle("Riset");
    // ui components
    let uiTbl = $("#tbl-riset");

    initializeGrid();
    initialize();

    /*
    * initialize content
    */
    function initialize() {
        $("#btn-create").click(function () {
            common.removeCookie("module.riset.update");
            common.direct("ref_riset/form");
        });
    }

    function initializeGrid() {
        let option = {
            title: "Riset",
            toolbar: toolbar(),
            url: common.baseURL("ref_riset/load"),
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
				//{field:'id_riset', title:'ID RISET', halign: 'center', align: 'left', sortable:"true", width:200},
				{field:'riset', title:'RISET', halign: 'center', align: 'left', sortable:"true", width:500},
				{field:'ps', title:'#PS', halign: 'center', align: 'center', sortable:"true", width:100},
				{field:'substr_tujuan', title:'Tujuan Riset', halign: 'center', align: 'center', sortable:"true", width:120},
				{field:'keyword', title:'Keyword', halign: 'center', align: 'center', sortable:"true", width:120},
				{field:'kode_satker', title:'Satker', halign: 'center', align: 'center', sortable:"true", width:120},
				{field:'start_date_month', title:'START DATE', halign: 'center', align: 'center', sortable:"true", width:110},
				{field:'finish_date_month', title:'FINISH DATE', halign: 'center', align: 'center', sortable:"true", width:110},
				{field:'bobot_percent', title:'BOBOT', halign: 'center', align: 'center', sortable:"true", width:100},
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
        const btnCreate = commonGrid.btnBuilder('btn-create', 'primary', 'fa fa-plus');
        return '<div class="action-grid-toolbar">' + btnCreate + '</div>';
    }

    function optionButton(data) {
        let btnContent = $(".action-grid");
        let index = 0;
        for (const btns of btnContent) {
            const param = data.rows[index];
            const btnEdit = $(btns).find("a.btn-success");
            const btnDelete = $(btns).find("a.btn-danger");
            btnEdit.click(function () {
                updateRow(param);
            });
            btnDelete.click(function () {
                deleteRow(param);
            });
            index++;
        }
    }

    /*
    * action button generator
    */
    function formatterButton(val, row, index) {
        const btnUpdate = commonGrid.btnBuilder('btn-update', 'success', 'fa fa-pencil');
        const btnDelete = commonGrid.btnBuilder('btn-delete', 'danger', 'fa fa-times');
        return '<div class="action-grid">' + btnUpdate + ' ' + btnDelete + '</div>';
    }

    function updateRow(val) {
        common.setCookie("module.riset.update", val);
        common.direct("ref_riset/form");
    }

    function deleteRow(val) {
        common.dialogDelete(function () {
            $.post("ref_riset/delete", val, function (data, status) {
                if (200 === data.code) {
                    $.alert("Delete success!");
                    uiTbl.datagrid("reload");
                } else {
                    $.alert(status);
                }
            })
        });
    }

})();