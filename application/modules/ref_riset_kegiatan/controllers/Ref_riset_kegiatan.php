<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ref_riset_kegiatan extends BaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('riset_kegiatan_model', 'riset_kegiatan');
    }

    public function index()
    {
        $this->template->show($this, 'content');
    }

    public function form()
    {
        $this->template->show($this, 'form');
    }

    public function create()
    {
        $data = param_input();
        response($this->riset_kegiatan->create($data));
    }

    public function update()
    {
        $data = param_input();
        response($this->riset_kegiatan->update($data));
    }

    public function delete()
    {
        $data = param_input();
        response($this->riset_kegiatan->delete($data));
    }

    public function load()
    {
        $data = param_input();
        responseJSON($this->riset_kegiatan->load($data));
    }

    public function load_kegiatan_by_riset()
    {
        $data = param_input();
        response($this->riset_kegiatan->load_kegiatan_by_riset($data));
    }

}
