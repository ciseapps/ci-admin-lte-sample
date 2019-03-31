(function () {

    const common = new Common();
    common.setTitle("OK");
    // declare dom
    let uiForm = $("#fm");
    let uiBtnCancel = $("#btn-cancel-form");
    // define from menu-content.js
    let param = common.getCookie("module.menu.update");

    initialize();

    function initialize() {
        let url = param === undefined ? common.baseURL("app_menu/create") : common.baseURL("app_menu/update");
        uiForm.initForm({
            url: url,
            param: param,
            directUrl: "app_menu",
            beforeSubmit: function (form, options) {
                if (param !== undefined) {
                    form.push({name: 'menu_id', value: param.menu_id});
                }
                return true; // MANDATORY!
            }
        });
        uiBtnCancel.click(function () {
            common.direct("app_menu");
        });
    }


})();