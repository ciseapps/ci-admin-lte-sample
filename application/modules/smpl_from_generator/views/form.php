<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        From Generator <small>Control panel</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> From Generator</a></li>
        <li class="active">Form</li>
    </ol>
</section>

<!-- Main content -->
<section id="content-main" class="content">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Form From Generator</h3>
                </div>

                <form id="fm-from-generator" role="form" method="post">
                    <div class="box-body">
							<div class="form-group">
								<label for="name">Name</label>
								<input name="name" class="form-control" placeholder="Name">
							</div>
							<div class="form-group">
								<label for="address">Address</label>
								<input name="address" class="form-control" placeholder="Address">
							</div>
							<div class="form-group">
								<label for="telp">Telp</label>
								<input name="telp" class="form-control" placeholder="Telp">
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
<script src="<?php echo base_url() . 'assets/modules/smpl_from_generator/from-generator-form.js' ?>"></script>
