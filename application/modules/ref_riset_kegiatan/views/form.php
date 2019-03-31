<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Riset Kegiatan <small>Control panel</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Riset Kegiatan</a></li>
        <li class="active">Form</li>
    </ol>
</section>

<!-- Main content -->
<section id="content-main" class="content">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Form Riset Kegiatan</h3>
                </div>

                <form id="fm-riset-kegiatan" role="form" method="post">
                    <div class="box-body">
							<!--<div class="form-group">
								<label for="id_riset_kegiatan">Id Riset Kegiatan</label>
								<input name="id_riset_kegiatan" class="form-control" placeholder="Id Riset Kegiatan">
							</div>-->
							<!--<div class="form-group col-xs-12">
								<label for="id_satker">Riset</label>
								 <select id="id-riset" name="id_riset" class="form-control"></select>
							</div>-->
							<div class="form-group col-xs-12">
								<label for="riset">Kegiatan</label>
								<textarea name="kegiatan" class="form-control" rows="4" placeholder="Kegiatan ..."></textarea>
							</div>
							<div class="form-group col-xs-4">
								<label for="start_date">Start Date</label>
								<div class="input-group date">
									  <div class="input-group-addon">
										<i class="fa fa-calendar"></i>
									  </div>
									  <input name="start_date_kegiatan" type="text" class="form-control pull-right" id="id-start_date" placeholder="Start Date">
								</div>
							</div>
							<div class="form-group col-xs-4">
								<label for="finish_date">Finish Date</label>
								<div class="input-group date">
									  <div class="input-group-addon">
										<i class="fa fa-calendar"></i>
									  </div>
									  <input name="finish_date_kegiatan" type="text" class="form-control pull-right" id="id-finish_date" placeholder="Finish Date">
								</div>
							</div>
							<div class="form-group col-xs-4">
								<label for="bobot">Bobot</label>
								<input name="bobot" class="form-control" placeholder="Bobot">
							</div>
                    </div>

                    <div class="box-footer">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <a id="btn-cancel-form" href="javascript:void(0)" class="btn btn-warning">Cancel</a>
                    </div>
                </form>

            </div>
        </div>
    </div>
</section>
<script src="<?php echo base_url() . 'assets/modules/ref_riset_kegiatan/riset-kegiatan-form.js' ?>"></script>
