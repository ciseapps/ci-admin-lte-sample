const Controller = function (moduleName, contentMain, idTbl) {

    this.moduleName = moduleName;
    this.contentMain = $(contentMain);
    this.idTbl = $(idTbl);

    this.basePath = function () {
        var base_url = window.location.origin;
        var pathArray = window.location.pathname.split('/');
        return base_url + "/" + pathArray[1] + "/";
    };

    this.baseModulePath = function () {
        return this.basePath() + this.moduleName;
    };

    this.baseModuleSource = function () {
        return this.basePath() + this.moduleName + "/load";
    };

    this.initTable = function (options) {
        this.idTbl.datagrid(options);
    };

    this.initTable = function (options1, options2) {
        this.idTbl.datagrid(options1);
        this.idTbl.datagrid(options2);
    };

    this.loadContent = function (url, val) {
        console.log(url);
        this.contentMain.load(this.baseModulePath() + "/" + url, val);
    }


};

Controller.prototype.onEdit = function () {
    console.log("onEdit");
    //return this.basePath() + this.moduleName;
};

Controller.prototype.endpoin = function () {
    console.log("endpint");
    return this.basePath() + this.moduleName;
};


const ctrl = new Controller("app_resource", "#content-main", "#tbl-resource");

(function () {

    ctrl.initTable(datagridOption, initTableOptions());
    ctrl.onEdit = function (target) {
        var row = getRowValue(ctrl.idTbl, target);
        console.log("override");
        console.log(row);
        ctrl.loadContent("form", row);
    };
    hideLoading();

    function initTableOptions() {
        return {
            title: "User Access",
            url: ctrl.baseModuleSource(),
            pageNumber: 1,
            pageSize: getCurentSize(),
            pageList: getPageSize(),
            frozenColumns: [[
                {
                    field: 'options',
                    title: 'ACTION',
                    width: 125,
                    halign: 'center',
                    align: 'center',
                    formatter: optionGridBtn
                }
            ]],
            columns: [[
                {field: 'role_name', title: 'ROLE', halign: 'center', align: 'left', sortable: "true", width: 200},
                {field: 'nip', title: 'NIP', halign: 'center', align: 'left', sortable: "true", width: 200},
                {field: 'name', title: 'NAME', halign: 'center', align: 'left', sortable: "true", width: 200},
                {field: 'username', title: 'USERNAME', halign: 'center', align: 'left', sortable: "true", width: 200},
                {field: 'password', title: 'PASSWORD', halign: 'center', align: 'left', sortable: "true", width: 200},
                {
                    field: 'created_by',
                    title: 'CREATED BY',
                    halign: 'center',
                    align: 'left',
                    sortable: "true",
                    width: 200
                },
                {
                    field: 'created_date',
                    title: 'CREATED DATE',
                    halign: 'center',
                    align: 'center',
                    sortable: "true",
                    width: 200
                },
                {
                    field: 'modified_by',
                    title: 'MODIFIED BY',
                    halign: 'center',
                    align: 'left',
                    sortable: "true",
                    width: 200
                },
                {
                    field: 'modified_date',
                    title: 'MODIFIED DATE',
                    halign: 'center',
                    align: 'center',
                    sortable: "true",
                    width: 200
                }
            ]],
            onBeforeLoad: function (param) {
                param.action = "LOAD_DATA_TABLE";
            },
            onLoadSuccess: function (data) {

            }
        };
    }

    function optionGridBtn(val, row, index) {
        var updateBtn = btnGenerator('success btn-update', 'fa fa-pencil fa-lg', "ctrl.onEdit(this)");
        var approveBtn = btnGenerator('success btn-approve', 'fa fa-key fa-lg', "editRow(this)");
        var deleteBtn = btnGenerator('danger btn-delete', 'fa fa-times fa-lg', "editRow(this)");
        if ("1" === row.role_id) {
            deleteBtn = "";
        }
        return '<div class="action-grid">' + updateBtn + ' ' + deleteBtn + ' ' + approveBtn + '</div>';
    }

})
();

function editRow(target) {
    var row = getRowValue($("#tbl-resource"), target);
    console.log(row);
    //$.redirect(getBaseUrl + "/update?token=" + getToken, row, "POST");
}