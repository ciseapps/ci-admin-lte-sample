<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Riset Data
        <small>Control panel</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Riset Data</a></li>
        <li class="active">Form</li>
    </ol>
</section>

<!-- Main content -->
<section id="content-main" class="content">
    <div class="row">


        <div class="col-xs-12 col-sm-12 col-md-8">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 id="title-form" class="box-title">Form Riset Data</h3>
                </div>

                <form id="fm-riset-data" role="form" method="post">
                    <div class="box-body">
                        <div class="col-xs-12">
                            <label id="title-form-kegiatan"></label>
                            <hr/>
                        </div>
                        <div class="form-group col-xs-3">
                            <label for="progress">Progress Kegiatan Riset (%)</label>
                            <select id="progress" name="progress" class="form-control" placeholder="Progress...">
                                <option value="0">0</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                                <option value="60">60</option>
                                <option value="70">70</option>
                                <option value="80">80</option>
                                <option value="90">90</option>
                                <option value="100">100</option>
                            </select>
                            <!--                            <input name="progress" class="form-control" placeholder="Progress...">-->
                        </div>
                        <div class="form-group col-xs-8">
                            <div class="box-tools pull-right">
                                <strong>Batas Waktu selesai : </strong>
                                <p></p>
                                <p id="finish-date-riset"></p>
                                <p id="finish-date-kegiatan"></p>
                            </div>
                        </div>
						<div class="form-group col-xs-6">
							<label for="riset">Keterangan</label>
							<textarea name="keterangan" class="form-control" rows="2"
									  placeholder="Keterangan ..."></textarea>
						</div>
                        <div class="form-group col-xs-12">
                            <label for="upload_file">Upload File</label>
                            <div class="file-upload-wrapper">
                                <input id="upload-file" name="upload_file[]" type="file" id="input-file-now"
                                       class="file-upload"/>
                            </div>
                        </div>
                    </div>

                    <div class="box-footer">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <a id="btn-cancel-form" href="javascript:void(0)" class="btn btn-warning">Cancel</a>
                    </div>
                </form>

            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-4">
            <!-- MAP & BOX PANE -->
            <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title">Files</h3>
                </div>
                <!-- /.box-header -->
                <div class="box-body no-padding">
                    <div class="row">
                        <div class="col-md-12 col-sm-12">
                            <table id="table-kegiatan" class="table table-striped"></table>
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->
                </div>
                <!-- /.box-body -->
            </div>

            <!-- /.box -->
        </div>

    </div>
</section>
<script src="<?php echo base_url() . 'assets/modules/input_riset_data/riset-data-form.js' ?>"></script>
