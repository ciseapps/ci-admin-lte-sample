(function () {

    const common = new Common();
    common.setTitle("Riset");
    // declare dom
    let uiForm = $("#fm-riset");
    let uiBtnCancel = $("#btn-cancel-form");
    let uiStartDatePicker = $("#id-start_date");
    let uiFinishDatePicker = $("#id-finish_date");
    let uiSelectSatker = $("#id-satker");
    let uiSelectKeyword = $("#id-keyword");

    // define from *-content.js
    let param = common.getCookie("module.riset.update");
    let isUpdate = param !== undefined; // flag create update

    setupFormUI();
    initialize();
    initializeParamSatker();
    initializeParamKeyword();

    function initialize() {
        let url = param === undefined ? common.baseURL("ref_riset/create") : common.baseURL("ref_riset/update");
        uiForm.initForm({
            url: url,
            param: param,
            directUrl: "ref_riset",
            beforeSubmit: function (form, options) {
                if (param !== undefined) {
                    form.push({name: 'id_riset', value: param.id_riset});
                }
                let start = moment(uiStartDatePicker.datepicker('getDate'));
                let end = moment(uiFinishDatePicker.datepicker('getDate'));
                form = common.replaceFormValue(form, [
                    {key:"start_date",value:start.startOf('month').format("YYYY-MM-DD")},
                    {key:"finish_date",value:end.endOf('month').format("YYYY-MM-DD")}
                ]);
                // console.log(form);
                return true; // MANDATORY!
            },
            rules: {
                riset: {
                    required: true
                },
                start_date: {
                    required: true
                },
                finish_date: {
                    required: true
                },
                bobot: {
                    required: true
                }
            }
        });
        if (isUpdate) {
            uiStartDatePicker.datepicker('update', new Date(moment(param.start_date, "YYYY-MM-DD")));
            uiFinishDatePicker.datepicker('update', new Date(moment(param.finish_date, "YYYY-MM-DD")));
        }
        uiBtnCancel.click(function () {
            common.direct("ref_riset");
        });
    }

    function setupFormUI() {
        uiSelectSatker.select2({multiple: true, placeholder: 'Select value...', tokenSeparators: [',']});
        uiStartDatePicker.datepicker({
            minViewMode: 'months',
            startView: 'months',
            format: 'MM yyyy'
        });
        uiFinishDatePicker.datepicker({
            minViewMode: 'months',
            startView: 'months',
            format: 'MM yyyy'
        });
    }

    function initializeParamSatker() {
        common.loading();
        let resolver = new HttpResolver();
        let param = new Filter();
        $.when(
            $.post(common.baseURL("ref_satker/load"), param.build()),
        ).done(function (data, textStatus, jqXHR) {
            console.log("done");
        }).then(function (r1, r2) {
            common.loadingClose();
            setupFormSatker(r1);
        }).fail(resolver.fail);
    }

    function initializeParamKeyword() {
        common.loading();
        let resolver = new HttpResolver();
        let param = new Filter();
        $.when(
            $.post(common.baseURL("ref_keyword/load"), param.build()),
        ).done(function (data, textStatus, jqXHR) {
            console.log("done");
        }).then(function (r1, r2) {
            common.loadingClose();
            setupFormKeyword(r1);
        }).fail(resolver.fail);
    }

    function setupFormSatker(r1, r2) {
        let rows = [];
        //rows.push({id_satker: "", kode_satker:"", satker: "Pilih Satuan Kerja"});
        rows = rows.concat(r1.rows);
        /*if (isUpdate) { // update
            rows = rows.filter(function (val) {
                return val.id_satker !== param.id_satker;
            })
        }*/
        uiSelectSatker.select2({
            data: $.map(rows, function (o) {
                o.id = o.id_satker; // replace name with the property used for the text
                o.text = o.kode_satker + "(" + o.satker + ")"; // replace name with the property used for the text
                return o;
            }),
        });
        if (isUpdate) uiSelectSatker.val(param.id_satker).trigger('change');

    }

    function setupFormKeyword(r1, r2) {
        let rows = [];
        //rows.push({id_satker: "", kode_satker:"", satker: "Pilih Satuan Kerja"});
        rows = rows.concat(r1.rows);
        /*if (isUpdate) { // update
            rows = rows.filter(function (val) {
                return val.id_satker !== param.id_satker;
            })
        }*/
        uiSelectKeyword.select2({
            data: $.map(rows, function (o) {
                o.id = o.id_keyword; // replace name with the property used for the text
                o.text = o.keyword; // replace name with the property used for the text
                return o;
            }),
        });
        if (isUpdate) uiSelectKeyword.val(param.id_keyword).trigger('change');

    }

})();