<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Riset Data
        <small>Control panel</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Data Riset</a></li>
        <li class="active">Detail</li>
    </ol>
</section>

<!-- Main content -->
<section id="content-main" class="content invoice">
    <!-- title row -->
    <div class="row">
        <div class="col-xs-12">
            <h2 id="title-riset" class="page-header">
                <i class="fa fa-globe"></i> AdminLTE, Inc.
                <small class="pull-right">Date: 2/10/2014</small>
            </h2>
        </div>
        <!-- /.col -->
    </div>
    <!-- info row -->
    <div class="row invoice-info">

        <div class="form-group col-xs-6">
        <div class="col-sm-12 invoice-col">
            <strong>Tujuan</strong>
            <p id="tujuan"></p>
        </div>
        <div id="info-satker" class="col-sm-12 invoice-col">
            <b>Satker: </b> <br>
            <b>Keyword: </b> <br>
            <br>
        </div>
        <div class="col-sm-3 invoice-col">
            <strong>Start</strong>
            <p id="start"></p>
        </div>
        <div class="col-sm-3 invoice-col">
            <strong>Finish</strong>
            <p id="finish"></p>
        </div>
        <div class="col-sm-3 invoice-col">
            <strong>Progress</strong>
            <p id="progress"></p>
        </div>
        <div class="col-sm-3 invoice-col">
            <strong>PS</strong>
            <p id="ps"></p>
        </div>
        </div>

        <div class="form-group col-xs-6">
            <div class="">
                <div class="box-header with-border">
                    <i class="fa fa-bar-chart-o"></i>

                    <h3 id="tahun"class="box-title"></h3>

                </div>
                <div class="box-body">
                    <canvas id="pie-chart" style="height:250px"></canvas>
                </div>
                <!-- /.box-body-->
            </div>
        </div>


        <!-- /.row -->

        <!-- Table row -->
        <div class="col-sm-12 invoice-col">
            <button id="add-kegiatan" type="button" class="btn btn-primary">Tambah Kegiatan</button>
            <br>
            <!-- /.col -->
        </div>
        <!-- /.row -->

        <div class="col-xs-12 table-responsive">
            <table id="table-kegiatan" class="table table-striped">
            </table>
        </div>

    </div>

</section>

<div id="modal-kegiatan" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Kegiatan</h4>
            </div>
            <form id="fm-riset-data" role="form" method="post">
                <div class="modal-body">

                    <div class="box-body">

                        <div class="form-group col-xs-12">
                            <label for="riset-kegiatan">Rincian Kegiatan</label>
                            <select id="riset-kegiatan" name="id_riset_kegiatan" class="form-control"></select>
                        </div>
                        <!--                        <div class="form-group col-xs-6">-->
                        <!--                            <label for="id_progress">Progress</label>-->
                        <!--                            <input name="id_progress" class="form-control" placeholder="Progress...">-->
                        <!--                        </div>-->
                        <!--                        <div class="form-group col-xs-12">-->
                        <!--                            <label for="upload_file">Upload File</label>-->
                        <!--                            <div class="file-upload-wrapper">-->
                        <!--                                <input id="upload_file_doc" name="upload_file_doc" type="file" id="input-file-now"-->
                        <!--                                       class="file-upload"/>-->
                        <!--                            </div>-->
                        <!--                        </div>-->
                    </div>


                </div>
                <div class="modal-footer">
                    <div class="box-footer">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </form>
        </div>

    </div>
</div>

<!-- JS content -->
<script src="<?php echo base_url() . 'assets/modules/input_riset_data/riset-data-view.js' ?>"></script>