(function () {

    // import commons
    const common = new Common();
    const commonGrid = new CommonGrid();
    // update title
    common.setTitle("OK");
    // ui components
    let uiTbl = $("#tbl-menu");

    initializeGrid();
    initialize();

    /*
    * initialize content
    */
    function initialize() {
        $("#btn-create").click(function () {
            common.removeCookie("module.menu.update");
            common.direct("app_menu/form");
        });
    }

    function initializeGrid() {
        let option = {
            title: "Menu",
            toolbar: toolbar(),
            url: common.baseURL("app_menu/load"),
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
                {field: 'menu_id', title: 'MENU ID', halign: 'center', sortable: "true", width: 80},
                {field: 'menu_name', title: 'MENU NAME', halign: 'center', sortable: "true", width: 250},
                {field: 'menu_icon', title: 'MENU ICON', halign: 'center', sortable: "true", width: 130},
                {field: 'module_name', title: 'MODULE NAME', halign: 'center', sortable: "true", width: 200},
                {field: 'seq_number', title: 'SEQUENCE', halign: 'center', sortable: "true", width: 100},
                {field: 'parent_id', title: 'PARENT ID', halign: 'center', sortable: "true", width: 100},
                {field: 'parent_name', title: 'PARENT MENU', halign: 'center', sortable: "true", width: 200},
                // {field: 'status', title: 'STATUS', halign: 'center', sortable: "true", width: 200},
                // {field: 'created_by', title: 'CREATED BY', halign: 'center', sortable: "true", width: 200},
                // {field: 'created_date', title: 'CREATED DATE', halign: 'center', sortable: "true", width: 200},
                // {field: 'modified_by', title: 'MODIFIED BY', halign: 'center', sortable: "true", width: 200},
                // {field: 'modified_date', title: 'MODIFIED DATE', halign: 'center', sortable: "true", width: 200},
            ]],
            onBeforeLoad: function (param) {
                if (param.filterRules) {
                    let filterRules = common.fromJson(param.filterRules);
                    for (const prop of filterRules) {
                        if ('parent_name' === prop.field) {
                            prop.field = 'b.menu_name';
                        } else {
                            prop.field = 'a.' + prop.field;
                        }
                    }
                    param.filterRules = common.toJson(filterRules);
                }
            },
            onLoadSuccess: function (data) {
                $(this).datagrid('resize');
                optionButton(data);
            }
        };
        uiTbl.datagrid(commonGrid.optionValue(option));
    }

    function toolbar() {
        const btnCreate = commonGrid.btnBuilder('btn-create', 'success', 'fa fa-pencil');
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
        common.setCookie("module.menu.update", val);
        common.direct("app_menu/form");
    }

    function deleteRow(val) {
        common.dialogDelete(function () {
            $.post("app_menu/delete", val, function (data, status) {
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