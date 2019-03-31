<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Input_riset_data extends BaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('riset_data_model', 'riset_data');
    }

    public function index()
    {
        $this->template->show($this, 'content');
    }

    public function view()
    {
        $this->template->show($this, 'view');
    }

    public function form()
    {
        $this->template->show($this, 'form');
    }

    public function create()
    {
        $data = param_input();
        response($this->riset_data->create($data));
    }

    public function update()
    {
        $data = param_input();
        response($this->riset_data->update($data));
    }

    public function delete()
    {
        $data = param_input();
        response($this->riset_data->delete($data));
    }

    public function load()
    {
        $data = param_input();
        responseJSON($this->riset_data->load($data));
    }

    public function load_file()
    {
        $data = param_input();
        responseJSON($this->riset_data->load_file($data));
    }

    public function load_kegiatan()
    {
        $data = param_input();
        responseJSON($this->riset_data->load_kegiatan($data));
    }

    public function exportxls()
    {
		//$start 	= $this->uri->segment(3);
		$newDate = date("d-m-Y");
		$filename = "Report_hasil_riset.xls";
		$html = '
			<style>
				table,th,td
				{
				border:1px solid black;
				border-collapse:collapse;
				}
				.str{ mso-number-format:\@; }
			</style>
		<table>
			<thead>
				<tr style="background-color:#deebf6">
					<th>No</th>
					<th>Riset</th>
					<th>Rincian Kegiatan</th>
					<th>Start Date</th>
					<th>Finish Date</th>
					<th>Bobot</th>
					<th>Satker</th>
					<th>Jenis Riset</th>
					<th style="background-color:#8eaadc">Progres  (%)</th>
					<th style="background-color:#ffff00">Ketepatan Waktu</th>
					<th style="background-color:#8eaadc">Keterangan</th>
					<th style="background-color:#8eaadc">Data Dukung</th>
				</tr>
				<tr style="background-color:#deebf6">
					<th class=’str’>(1)</th>
					<th class=’str’>(2)</th>
					<th class=’str’>(3)</th>
					<th class=’str’>(4)</th>
					<th class=’str’>(5)</th>
					<th class=’str’>(6)</th>
					<th class=’str’>(7)</th>
					<th class=’str’>(8)</th>
					<th class=’str’ style="background-color:#8eaadc">(9)</th>
					<th class=’str’ style="background-color:#ffff00">(10)</th>
					<th class=’str’ style="background-color:#8eaadc">(11)</th>
					<th class=’str’ style="background-color:#8eaadc">(12)</th>
				</tr>
			</thead>
			<tbody>';	
			
		$dataarr = $this->riset_data->load_riset();//$this->model->get_data_export($start);
		$i = 1;
		if ($dataarr !="") {
			foreach ($dataarr as $value) {
				$html .='<tr>';
				$html .='<td>'.$i.'</td>';
				$html .='<td>'.$value['riset'].'</td>';		
				$html .='<td style="background-color:#a5a5a5"></td>';		
				$html .='<td style="background-color:#f8cbac">'.$value['start_date_month'].'</td>';
				$html .='<td style="background-color:#f8cbac">'.$value['finish_date_month'].'</td>';
				$html .='<td>'.$value['bobot_percent'].'</td>';
				$html .='<td>'.$value['kode_satker'].'</td>';
				$html .='<td>'.$value['keyword'].'</td>';
				$html .='<td>'.$value['progress'].'</td>';
				$html .='<td></td>';		
				$html .='<td></td>';		
				$html .='<td></td>';
				$html .='</tr>';
				$i++;	
				$dataarrkeg = $this->riset_data->load_riset_kegiatan($value['id_riset']);
				if ($dataarrkeg !="") {
					foreach ($dataarrkeg as $lov) {
						$html .='<tr>';
						$html .='<td style="background-color:#a5a5a5"></td>';		
						$html .='<td style="background-color:#a5a5a5"></td>';		
						$html .='<td>'.$lov['kegiatan'].'</td>';		
						$html .='<td style="background-color:#f8cbac">'.$lov['start_date_month'].'</td>';		
						$html .='<td style="background-color:#f8cbac">'.$lov['finish_date_month'].'</td>';		
						$html .='<td>'.$lov['bobot_percent'].'</td>';		
						$html .='<td>'.$value['kode_satker'].'</td>';		
						$html .='<td>'.$value['keyword'].'</td>';		
						$html .='<td>'.$lov['progress_percent'].'</td>';		
						$html .='<td></td>';		
						$html .='<td>'.$lov['keterangan'].'</td>';		
						$html .='<td>'.$lov['data_dukung'].'</td>';
						$html .='</tr>';
					}
				}
			}
		
		}
		
		
		$html .= '	</tbody>
					</table>';
		
		header("Content-Type:   application/vnd.ms-excel; charset=utf-8");
		header("Content-Disposition: attachment; filename=" . $filename);  //File name extension was wrong
		header("Expires: 0");
		header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		header("Cache-Control: private", false);
		 
		echo $html;		
    }

	function send_email() {
		$data = param_input();
		$msg = "<table border='1'>";
		$msg .=	"<tr style='background-color:#deebf6'>
					<td>Riset</td>
					<td>Satker</td>
					<td>Keyword</td>
					<td>Start Date</td>
					<td>Finish Date</td>
					<td style='background-color:#8eaadc'>Progres  (%)</td>
				</tr>
				<tr>
					<td>".$data['riset']."</td>
					<td>".$data['kode_satker']."</td>
					<td>".$data['keyword']."</td>
					<td>".$data['start_date_month']."</td>
					<td>".$data['finish_date_month']."</td>
					<td style='background-color:#8eaadc'>".$data['progress']."  (%)</td>
				</tr>
				</table>";
		
		$dataarr = $this->riset_data->get_email_admin_satker();
		$mess = '<br>
			Notification Riset <br>
			<br>
			'.$msg.'<br>
			Direct Link : http://publication-bi.org/bisprint
			<br>
			Regards,<br>
			<br>
			ADMIN SPRINT<br>
			Situs Pengelolaan Riset Internal
			
			';
			
		//send email
		$config['protocol']  = 'smtp';
		//$config['smtp_host'] = 'ssl://smtp.bi.go.id';
		$config['smtp_host'] = 'sphere154.com';
		$config['smtp_port'] = '25';
		//$config['smtp_user'] = 'lmsadmin@bi.go.id';
		//$config['smtp_user'] = 'admin@lmsadminbins.com';
		$config['smtp_user'] = 'admspher@sphere154.com';
		$config['smtp_pass'] = 'Sphere154.com!2019';
		$config['mailtype']  = 'html';
		$config['charset'] 	 = 'utf-8';
		$config['newline']   = "\r\n";
	
		// Loads the email library
		$this->load->library('email',$config);
		// FCPATH refers to the CodeIgniter install directory
		// Specifying a file to be attached with the email
		//$file = FCPATH . 'license.txt';
		// Defines the email details
		$this->email->from('admspher@sphere154.com', 'Admin Sphere');
		if ($dataarr !="") {
			foreach ($dataarr as $lov) {
				$this->email->to($lov['email']);
			}
		}else{
			$this->email->to('yudi.wahyudi154@gmail.com');
		}
		//$this->email->cc('another@example.com');
		//$this->email->bcc('one-another@example.com');
		$this->email->subject('Notification');
		$this->email->message($mess);
		//$this->email->attach($file);
		// The email->send() statement will return a true or false
		// If true, the email will be sent
		if ($this->email->send()) {
		  return "OK";
		} else { 
		   echo $this->email->print_debugger();	
		  return "NOK";
		}
	}
	
	function approve_riset() {
		$data = param_input();
        response($this->riset_data->approve($data));
	}	
	
	function update_ready_approve() {
		$data = param_input();
		foreach ($data as $key => $value) 
		{
			if($value['progress']=='95.00'){
			response($this->riset_data->ready_approve($data));
			}
		}
	}

}
