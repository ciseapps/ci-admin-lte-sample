<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ref_karyawan extends BaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('karyawan_model', 'karyawan');
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
        response($this->karyawan->create($data));
    }

    public function update()
    {
        $data = param_input();
        response($this->karyawan->update($data));
    }

    public function delete()
    {
        $data = param_input();
        response($this->karyawan->delete($data));
    }

    public function load()
    {
        $data = param_input();
        responseJSON($this->karyawan->load($data));
    }

}
