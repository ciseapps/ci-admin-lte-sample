(function () {

    const common = new Common();
    common.setTitle("Riset Data");
    // declare dom
    let uiForm = $("#fm-riset-data");
    let uiFormTitle = $("#title-form");
    let uiFormKegiatanTitle = $("#title-form-kegiatan");
    let uiBtnCancel = $("#btn-cancel-form");
    let uiSelectKegiatan = $("#riset-kegiatan");
    let uiUpload = $("#upload-file");
    let uiTblFile = $("#table-kegiatan");
    let uiTitleFinish = $("#finish-date-riset");
    let uiTitleFinishKegiatan = $("#finish-date-kegiatan");
    // let uiSelectKeyword = $("#id-keyword");

    // define from *-content.js
    let param = common.getCookie("module.riset.data.form");
    let isUpdate = param !== undefined; // flag create update

    setupFormUI();
    initialize();
    initializeParam();

    function setupFormUI() {
        uiUpload.filer(common.pluginFilerOption());
        uiFormTitle.text(param.riset.riset);
        uiTitleFinish.html("Riset&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: " + param.riset.finish_date_month);
        uiTitleFinishKegiatan.html(" Kegiatan &nbsp;&nbsp;&nbsp;: " + param.kegiatan.finish_date_kegiatan +
            "<input name='start_date_kegiatan' type='hidden' value='" + param.kegiatan.start_date_kegiatan + "'> <input name='finish_date_kegiatan' type='hidden' value='" + param.kegiatan.finish_date_kegiatan + "'>");
        uiFormKegiatanTitle.text(param.kegiatan.kegiatan);
        uiSelectKegiatan.select2({placeholder: 'Select Rincian Kegiatan...'});
    }

    function initialize() {
        let url = (param === undefined ? common.baseURL("input_riset_data/create") : common.baseURL("input_riset_data/update"));
        console.log(param);
        uiForm.initForm({
            url: url,
            param: param.kegiatan,
            directUrl: "input_riset_data/view",
            beforeSubmit: function (form, options) {
                if (param !== undefined) {
                    form.push({name: 'id_trx', value: param.kegiatan.id_trx});
                    form.push({name: 'id_riset', value: param.kegiatan.id_riset});
                    form.push({name: 'id_riset_kegiatan', value: param.kegiatan.id_riset_kegiatan});
                }
                return true; // MANDATORY!
            },
            rules: {
                progress: {
                    required: true
                },
                // id_riset_kegiatan: {
                //     required: true
                // },
                // id_keyword: {
                //     required: true
                // }
            }
        });
        uiBtnCancel.click(function () {
            common.direct("input_riset_data/view");
        });
    }

    function initializeParam() {
        common.loading();
        let resolver = new HttpResolver();
        let paramRiset = new Filter();
        let paramFile = new Filter();
        paramFile.sortOrder("upload_date", "asc");
        paramFile.add("id_riset", "equal", param.kegiatan.id_riset);
        paramFile.add("id_riset_kegiatan", "equal", param.kegiatan.id_riset_kegiatan);
        $.when(
            $.post(common.baseURL("ref_riset_kegiatan/load"), paramRiset.build()),
            $.post(common.baseURL("input_riset_data/load_file"), paramFile.build()),
        ).done(function (data, textStatus, jqXHR) {
            console.log("done");
        }).then(function (r1, r2) {
            common.loadingClose();
            console.log(r1);
            console.log(r2);
            setupForm(r1[0], r2[0]);
        }).fail(resolver.fail);
    }

    function setupForm(r1, r2) {
        let rows = r1.rows;
        console.log(rows);
        if (isUpdate) { // update
            rows = rows.filter(function (val) {
                return val.id_riset_kegiatan !== param.id_riset_kegiatan;
            })
        }
        uiSelectKegiatan.select2({
            data: $.map(rows, function (o) {
                o.id = o.id_riset_kegiatan; // replace name with the property used for the text
                o.text = o.kegiatan; // replace name with the property used for the text
                return o;
            }),
        });
        console.log("update value");
        if (isUpdate) uiSelectKegiatan.val(param.id_riset_kegiatan).trigger('change');
        //
        uiTblFile.grid({
            columns: [
                {
                    field: "file_name", title: "File", format: function (row, val) {
                        console.log(val.length);
                        let fname = val;
                        if (val.length > 23) {
                            fname = val.slice(0, 23)+"...";
                        }
                        return "<div class='action-grid'><a href='" + common.baseURL("uploads/documents/" + val) + "' download>" + fname + "</a></div>";
                    }
                },
                {field: "upload_date", title: "Upload Date"}
            ],
            rows: r2.rows,
        })
    }

    function setupFormKegiatan(r1, r2) {
        let rows = [];
        rows.push({id_riset_kegiatan: "", kegiatan: "Pilih Riset Kegiatan..."});
        rows = rows.concat(r1.rows);
        /*if (isUpdate) { // update
            rows = rows.filter(function (val) {
                return val.id_satker !== param.id_satker;
            })
        }*/
        uiSelectKegiatan.select2({
            data: $.map(rows, function (o) {
                o.id = o.id_riset_kegiatan; // replace name with the property used for the text
                o.text = o.kegiatan; // replace name with the property used for the text
                return o;
            }),
        });
        if (isUpdate) uiSelectRisetKegiatan.val(param.id_riset_kegiatan).trigger('change');
    }


})();