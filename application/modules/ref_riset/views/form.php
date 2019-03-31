<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Riset <small>Control panel</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Riset</a></li>
        <li class="active">Form</li>
    </ol>
</section>

<!-- Main content -->
<section id="content-main" class="content">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-8">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Form Riset</h3>
                </div>

                <form id="fm-riset" role="form" method="post">
                    <div class="box-body">
							<!--<div class="form-group">
								<label for="id_riset">Id Riset</label>
								<input name="id_riset" class="form-control" placeholder="Id Riset">
							</div>-->
							<div class="form-group col-xs-12">
								<label for="riset">Riset</label>
								<textarea name="riset" class="form-control" rows="4" placeholder="Riset ..."></textarea>
								<!--<input name="riset" class="form-control" placeholder="Riset">-->
							</div>
							<div class="form-group col-xs-12">
								<label for="riset">Tujuan</label>
								<textarea name="tujuan" class="form-control" rows="4" placeholder="Tujuan ..."></textarea>
								<!--<input name="riset" class="form-control" placeholder="Riset">-->
							</div>
							<div class="form-group col-xs-3">
								<label for="start_date">Start Date</label>
								<!--<input name="start_date" type="text" class="form-control pull-right" id="datepicker" placeholder="Start Date">
								<input name="start_date" class="form-control" placeholder="Start Date">-->
								<div class="input-group date">
									  <div class="input-group-addon">
										<i class="fa fa-calendar"></i>
									  </div>
									  <input name="start_date" type="text" class="form-control pull-right" id="id-start_date" placeholder="Start Date">
								</div>
							</div>
							<div class="form-group col-xs-3">
								<label for="finish_date">Finish Date</label>
								<div class="input-group date">
									  <div class="input-group-addon">
										<i class="fa fa-calendar"></i>
									  </div>
									  <input name="finish_date" type="text" class="form-control pull-right" id="id-finish_date" placeholder="Finish Date">
								</div>
							</div>
							<div class="form-group col-xs-3">
								<label for="bobot">Bobot</label>
								<input name="bobot" class="form-control" placeholder="Bobot">
							</div>
							<div class="form-group col-xs-3">
								<label for="bobot">PS#</label>
								<input name="ps" class="form-control" placeholder="PS#">
							</div>
							<div class="form-group col-xs-6">
								<label for="id_keyword">Keyword</label>
								 <select id="id-keyword" name="id_keyword" class="form-control"></select>
							</div>
							<div class="form-group col-xs-12">
								<label for="id_satker">Satuan Kerja</label>
								 <select id="id-satker" name="id_satker[]" class="form-control" multiple = "multiple" ></select>
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
<script src="<?php echo base_url() . 'assets/modules/ref_riset/riset-form.js' ?>"></script>
