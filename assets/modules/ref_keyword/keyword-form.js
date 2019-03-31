(function () {

    const common = new Common();
    common.setTitle("Keyword");
    // declare dom
    let uiForm = $("#fm-keyword");
    let uiBtnCancel = $("#btn-cancel-form");
    // define from *-content.js
    let param = common.getCookie("module.keyword.update");

    initialize();

    function initialize() {
        let url = param === undefined ? common.baseURL("ref_keyword/create") : common.baseURL("ref_keyword/update");
        uiForm.initForm({
            url: url,
            param: param,
            directUrl: "ref_keyword",
            beforeSubmit: function (form, options) {
				if (param !== undefined) {
                    form.push({name: 'id_keyword', value: param.id_keyword});
                }
                return true; // MANDATORY!
            }
        });
        uiBtnCancel.click(function () {
            common.direct("ref_keyword");
        });
    }

})();