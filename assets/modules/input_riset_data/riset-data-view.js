(function () {

    const common = new Common();
    common.setTitle("Riset Data");
    // declare dom
    let uiForm = $("#fm-riset-data");
    let title = $("#title-riset");
    let titleTahun = $("#tahun");
    let infoSatker = $("#info-satker");
    let tujuan = $("#tujuan");
    let start = $("#start");
    let finish = $("#finish");
    let progressInfo = $("#progress");
    let ps = $("#ps");
    let uiTblKegiatan = $("#table-kegiatan");
    let uiBtnAddKegiatan = $("#add-kegiatan");
    let uiModalKegiatan = $("#modal-kegiatan");
    let uiSelectKegiatan = $("#riset-kegiatan");
    let uiPieChart = $("#pie-chart");

    // define from *-content.js
    let param = common.getCookie("module.riset.data.view");
    let isUpdate = param !== undefined; // flag create update

    setupViewUI();
    initializeParam();

    function setupViewUI() {
        console.log(param);
        title.text(param.riset);
        tujuan.text(param.tujuan);
        start.text(param.start_date_month);
        finish.text(param.finish_date_month);
        progressInfo.text(param.progress + " %");
        ps.text(param.ps);
        var temp = "<b>Satker &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;:</b> " + param.kode_satker + "<br>\n" +
            "            <b>Keyword  &nbsp; &nbsp;:</b> " + param.keyword + "<br>\n" +
            "            <br>";
        infoSatker.html(temp);
        uiBtnAddKegiatan.click(function () {
            //console.log("show kegiatan");
            showKegiatan();
        });
        uiTblKegiatan.grid({
            // header: ["Kegiatan", "Bobot"],
            columns: [
                {field: "kegiatan", title: "Kegiatan"},
                {field: "progress", title: "progress"},
                {field: "progress", title: "progress"},
            ],
            rows: [],
            // key: ["kegiatan", "bobot"]
        });
        var tahunArr = param.start_date.split("-");
        titleTahun.text(tahunArr[0]);

    }

    function initializeParam() {
        common.loading();
        let resolver = new HttpResolver();
        let filter = new Filter();
        filter.add("a.id_riset", "equal", param.id_riset);
        filter.sortOrder("a.id_riset_kegiatan", "asc");
        $.when(
            $.post(common.baseURL("input_riset_data/load_kegiatan"), filter.build()),
        ).done(function (data, textStatus, jqXHR) {
            //console.log("done");
        }).then(function (r1, r2) {
            common.loadingClose();
            setupForm(r1);
        }).fail(resolver.fail);
    }

    function setupForm(r1, r2) {
        uiTblKegiatan.grid({
            columns: [
                {
                    field: "options", title: "Options",
                    format: function (row, val) {
                        if (1 == session.role_id) {
                            return "<div class='action-grid'><a type='button' class='btn btn-success'>View</a>&nbsp;&nbsp;<a type='button' class='btn btn-danger'>Delete</a></div>";
                        } else {
                            return "<div class='action-grid'><a type='button' class='btn btn-success'>View</a></div>";
                        }
                    }
                },
                {field: "kegiatan", title: "Kegiatan"},
                {
                    field: "progress_bar", title: "Progress dan Rincian Kegiatan",
                    format: function (row, val) {
                        var res = val.split(",");
                        if (res[1] >= 1 && res[2] >= 1) {
                            var bar_color = "green";
                        } else if (res[1] == 0 && res[2] == 0) {
                            var bar_color = "red";
                        } else {
                            var bar_color = "yellow";
                        }
                        return "<div class='progress md'>\n" +
                            "\t<div class='progress-bar progress-bar-" + bar_color + "' style='width: " + res[0] + "%'>" + res[0] + "%</div> \n" +
                            "</div>";
                    }
                },
                {
                    field: "last_document", title: "Document Upload",
                    /*format: function (row, val) {
                        var res = val.split(",");
                        if (res[1] >= 1 && res[2] >= 1) {
                            var bar_color = "green";
                        } else if (res[1] == 0 && res[2] == 0) {
                            var bar_color = "red";
                        } else {
                            var bar_color = "yellow";
                        }
                        return "<div class='progress md'>\n" +
                            "\t<div class='progress-bar progress-bar-" + bar_color + "' style='width: 20%'></div> \n" +
                            "</div>";
                    }*/
                },
            ],
            rows: r1.rows,
        });
        let btnContent = $(".action-grid");
        let index = 0;
        for (const btns of btnContent) {
            const row = uiTblKegiatan.rowAt(index);
            const btnEdit = $(btns).find("a.btn-success");
            const btnDelete = $(btns).find("a.btn-danger");
            btnEdit.click(function () {
                let pForm = {
                    riset: param,
                    kegiatan: row
                };
                common.setCookie("module.riset.data.form", pForm);
                common.direct("input_riset_data/form");
            });
            btnDelete.click(function () {
                deleteRow(row);
            });
            index++;
        }
        initChart(r1.rows);
        common.loadingClose();
    }

    function showKegiatan() {
        common.loading();
        let resolver = new HttpResolver();
        let filter = {
            id_riset: param.id_riset
        };
        $.when(
            $.post(common.baseURL("ref_riset_kegiatan/load_kegiatan_by_riset"), filter),
        ).done(function (data, textStatus, jqXHR) {
            //console.log("done");
        }).then(function (r1, r2) {
            common.loadingClose();
            if (r1.result.length > 0) {
                setupFormDialog(r1);
                initFormKegiatan();
                uiModalKegiatan.modal("show");
            } else {
                setTimeout(function () {
                    $.alert("Seluruh kegiatan telah di tambahkan. tidak ada kegiatan yang tersedia");
                }, 300);

            }
        }).fail(resolver.fail);
    }

    function initFormKegiatan() {
        let url = common.baseURL("input_riset_data/create");
        uiForm.initForm({
            url: url,
            param: {},
            directUrl: "input_riset_data/view",
            beforeSubmit: function (form, options) {
                if (param !== undefined) {
                    form.push({name: 'id_riset', value: param.id_riset});
                }
                return true; // MANDATORY!
            },
            afterSuccess: function () {
                // initializeParam();
                uiModalKegiatan.modal("hide");
            },
            rules: {
                id_riset: {
                    required: true
                },
                id_riset_kegiatan: {
                    required: true
                }
            }
        });
    }

    function setupFormDialog(r1, r2) {
        let rows = r1.result;
        uiSelectKegiatan.html("").trigger('change');
        uiSelectKegiatan.select2({
            data: $.map(rows, function (o) {
                o.id = o.id_riset_kegiatan; // replace name with the property used for the text
                o.text = o.kegiatan; // replace name with the property used for the text
                return o;
            }),
        });
    }

    function deleteRow(val) {
        // console.log(val);
        common.dialogDelete(function () {
            $.post("input_riset_data/delete", val, function (data, status) {
                if (200 === data.code) {
                    $.alert("Delete success!");
                    // uiTbl.datagrid("reload");
                    common.direct("input_riset_data/view");
                } else {
                    $.alert(status);
                }
            })
        });
    }

    function initChart(rows) {
        uiSelectKegiatan.select2({placeholder: 'Select Rincian Kegiatan...'});
        let context = uiPieChart.get(0).getContext("2d");
        var color = ["#f56954",
            "#00a65a",
            "#f39c12",
            "#00c0ef",
            "#3c8dbc",
            "#d2d6de",
            "#f56954", "#00a65a", "#f39c12", "#00c0ef", "#3c8dbc", "#d2d6de",
            "#f56954", "#00a65a", "#f39c12", "#00c0ef", "#3c8dbc", "#d2d6de"];
        var colorValue = "#00a65a";
        if(param.progress < 60) {
            colorValue = "#f39c12";
        }
        var data = [{
            value: param.progress,
            color: colorValue,
            highlight: colorValue,
            label: param.riset + " (" + param.progress + "%)"
        }];
        if (param.progress < 100) {
            data.push({
                value: (100-parseFloat(param.progress)),
                color: "#f56954",
                highlight: "#d2d6de",
                label: "Unprogress "+(100-parseFloat(param.progress))+" %"
            });
        }
        let len = rows.length;
        var progressAll = 0;
        // for (i = 0; i < len; i++) {
        //     var row = rows[i];
        //     data.push({
        //         value: row.progress_kegiatan,
        //         color: color[i],
        //         highlight: color[i],
        //         label: row.kegiatan + " (" + row.progress_kegiatan + "%)"
        //     });
        //     progressAll += parseFloat(row.progress_kegiatan);
        // }

        Chart.types.Doughnut.extend({
            name: "DoughnutTextInside",
            showTooltip: function () {
                this.chart.ctx.save();
                Chart.types.Doughnut.prototype.showTooltip.apply(this, arguments);
                this.chart.ctx.restore();
            },
            draw: function () {
                Chart.types.Doughnut.prototype.draw.apply(this, arguments);
                var width = this.chart.width,
                    height = this.chart.height;
                var fontSize = (1.1).toFixed(2);//(height / 140).toFixed(2);
                this.chart.ctx.font = fontSize + "em Verdana";
                this.chart.ctx.textBaseline = "center";
                this.chart.ctx.textColor = colorValue;
                var text = param.progress + "%",
                    //textX = Math.round((width - this.chart.ctx.measureText(text).width) / 2),
                    textX = Math.round((width - this.chart.ctx.measureText(text).width) / 2),
                    textY = height / 2;

                this.chart.ctx.fillText(text, textX, textY);
            }
        });

        var pieOptions = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke: true,
            //String - The colour of each segment stroke
            segmentStrokeColor: "#fff",
            //Number - The width of each segment stroke
            segmentStrokeWidth: 1,
            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout: 50, // This is 0 for Pie charts
            //Number - Amount of animation steps
            animationSteps: 100,
            //String - Animation easing effect
            animationEasing: "easeOutBounce",
            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate: true,
            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale: false,
            //Boolean - whether to make the chart responsive to window resizing
            responsive: true,
            // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
            maintainAspectRatio: false,
            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
            //String - A tooltip template
            tooltipTemplate: "<%=label%>",
        };
        //Create pie or douhnut chart
        // You can switch between pie and douhnut using the method below.

        let pieChart = new Chart(context);
        //pieChart.Doughnut(data, pieOptions);
        pieChart.DoughnutTextInside(data, pieOptions);//{
    }

})();