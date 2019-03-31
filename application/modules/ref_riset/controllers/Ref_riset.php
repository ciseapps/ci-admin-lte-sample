<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ref_riset extends BaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('riset_model', 'riset');
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
        response($this->riset->create($data));
    }

    public function update()
    {
        $data = param_input();
        response($this->riset->update($data));
    }

    public function delete()
    {
        $data = param_input();
        response($this->riset->delete($data));
    }

    public function load()
    {
        $data = param_input();
        responseJSON($this->riset->load($data));
    }

}
