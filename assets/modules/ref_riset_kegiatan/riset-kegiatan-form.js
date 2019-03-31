(function () {

    const common = new Common();
    common.setTitle("Riset Kegiatan");
    // declare dom
    let uiForm = $("#fm-riset-kegiatan");
    let uiBtnCancel = $("#btn-cancel-form");
	let uiStartDatePicker = $("#id-start_date");
	let uiFinishDatePicker = $("#id-finish_date");
	let uiSelectRiset = $("#id-riset");

    // define from *-content.js
    let param = common.getCookie("module.riset.kegiatan.update");
	let isUpdate = param !== undefined; // flag create update

	setupFormUI();
    initialize();
	initializeParam();
	initializeParamSatker();

    function setupFormUI() {
        uiSelectRiset.select2({placeholder: 'Select value...'});
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

    function initialize() {
        let url = param === undefined ? common.baseURL("ref_riset_kegiatan/create") : common.baseURL("ref_riset_kegiatan/update");
        uiForm.initForm({
            url: url,
            param: param,
            directUrl: "ref_riset_kegiatan",
            beforeSubmit: function (form, options) {
				if (param !== undefined) {
                    form.push({name: 'id_riset_kegiatan', value: param.id_riset_kegiatan});
                }
                let start = moment(uiStartDatePicker.datepicker('getDate'));
                let end = moment(uiFinishDatePicker.datepicker('getDate'));
                form = common.replaceFormValue(form, [
                    {key:"start_date_kegiatan",value:start.startOf('month').format("YYYY-MM-DD")},
                    {key:"finish_date_kegiatan",value:end.endOf('month').format("YYYY-MM-DD")}
                ]);
                return true; // MANDATORY!
            },
			rules: {
				id_riset: {
					required: true
				},
				kegiatan: {
					required: true
				},
				bobot: {
					required: true
				},
				id_satker: {
					required: true
				}
			}
        });
        console.log(param);
        if (isUpdate) {
            uiStartDatePicker.datepicker('update', new Date(moment(param.start_date_kegiatan, "YYYY-MM-DD")));
            uiFinishDatePicker.datepicker('update', new Date(moment(param.finish_date_kegiatan, "YYYY-MM-DD")));
        }
        uiBtnCancel.click(function () {
            common.direct("ref_riset_kegiatan");
        });
    }

    function initializeParam() {
        common.loading();
        let resolver = new HttpResolver();
        let param = new Filter();
        $.when(
            $.post(common.baseURL("ref_riset/load"), param.build()),
        ).done(function (data, textStatus, jqXHR) {
            console.log("done");
        }).then(function (r1, r2) {
            common.loadingClose();
            setupForm(r1);
        }).fail(resolver.fail);
    }

    function setupForm(r1, r2) {
        let rows = [];
        rows.push({id_riset: "", riset: "Pilih Riset"});
        rows = rows.concat(r1.rows);
        /*if (isUpdate) { // update
            rows = rows.filter(function (val) {
                return val.id_satker !== param.id_satker;
            })
        }*/
        uiSelectRiset.select2({
            data: $.map(rows, function (o) {
                o.id = o.id_riset; // replace name with the property used for the text
                o.text = o.riset; // replace name with the property used for the text
                return o;
            }),
        });
        if (isUpdate) uiSelectRiset.val(param.id_riset).trigger('change');

    }
	
})();