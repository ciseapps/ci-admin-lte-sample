<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Riset_data_model extends CI_Model
{

    public function create($data)
    {
        $id = IDGenerator::getInstance()->nextID('trx_input_riset');
        if (!empty($id)) {
            $data['id_trx'] = $id;
        }

        $this->db->insert('trx_input_riset', $data);
        $idtrx = $this->db->insert_id();
        //if ($this->upload_doc($idtrx)) {
        if ($idtrx) {
            return true;
        } else {
            return false;
        }

    }

    public function update($data)
    {
        $id = $data['id_trx'];
        $idr = $data['id_riset'];
        $idrk = $data['id_riset_kegiatan'];
        $param_upload['upload_file'] = $data['upload_file'];
        $param_upload['id_trx'] = $data['id_trx'];
        $param_upload['id_riset'] = $data['id_riset'];
        $param_upload['id_riset_kegiatan'] = $data['id_riset_kegiatan'];
        unset($data['id_riset']);
        unset($data['id_riset_kegiatan']);
        unset($data['id_trx']);
        unset($data['upload_file']);
        $this->db->where('id_trx', $id);
        $this->db->where('id_riset', $idr);
        $this->db->where('id_riset_kegiatan', $idrk);
        $this->db->update('trx_input_riset', $data);
        if ($this->upload($param_upload)) {
            return true;
        } else {
            return false;
        }
    }

    public function delete($data)
    {
        $this->db->where('id_trx', $data['id_trx']);
        $this->db->where('id_riset', $data['id_riset']);
        $this->db->where('id_riset_kegiatan', $data['id_riset_kegiatan']);
        return $this->db->delete('trx_input_riset');
    }

    public function load($data)
    {
		$role = $_SESSION['role_id'];
		if($role!='1'){
			$kodesatker = $_SESSION['kode_satker']; 
		}else{
			$kodesatker = '';
		}
		$q = $this->db->query("select ga.* from (select a.*, concat(a.bobot,' %') bobot_percent, count(b.id_trx) jml_trx, 
								ROUND(sum(ifnull((c.bobot/100*b.progress),0)),0) as progress
								from ref_riset a left join trx_input_riset b on a.id_riset=b.id_riset left join ref_riset_kegiatan c on b.id_riset_kegiatan=c.id_riset_kegiatan 
								where (SELECT GROUP_CONCAT(y.kode_satker) AS kode_satker FROM ref_riset_satker x left join ref_satuan_kerja y on x.id_satker=y.id_satker 
								where x.id_riset=a.id_riset GROUP BY id_riset) like '%$kodesatker%'
								group by a.riset ) as ga");
        $dataarr = $q->result_array();

		$username = $_SESSION['user_login'];
		foreach ($dataarr as $value) {
			if ($value['progress']=='100' and $value['status']!='3'){
				$dataupdate['status'] = '2';
				$dataupdate['modified_by'] = $username;
				$dataupdate['modified_date'] = date('Y-m-d h:i:s');
				$this->db->where('id_riset', $value['id_riset']);
				$this->db->update('ref_riset', $dataupdate);
			}
		}
		
        $field = "ga.*";

        $table = "(select  ";
        $table .= " a.*, d.keyword, count(b.id_trx) jml_trx, if(ROUND(sum(ifnull((c.bobot/100*b.progress),0)),2)='100,00' and a.status<>3,'95.00',ROUND(sum(ifnull((c.bobot/100*b.progress),0)),2)) as progress, ";
        $table .= "date_format(start_date, '%M %Y') start_date_month, date_format(finish_date, '%M %Y') finish_date_month, ";
        $table .= "(SELECT GROUP_CONCAT(y.kode_satker) AS kode_satker FROM ref_riset_satker x left join ref_satuan_kerja y on x.id_satker=y.id_satker ";
        $table .= "where x.id_riset=a.id_riset GROUP BY id_riset) kode_satker ";
        $table .= "from					";
        $table .= "ref_riset a left join trx_input_riset b on a.id_riset=b.id_riset left join ref_riset_kegiatan c on b.id_riset_kegiatan=c.id_riset_kegiatan ";
        $table .= "left join ref_keyword d on a.id_keyword=d.id_keyword ";
        $table .= "where (SELECT GROUP_CONCAT(y.kode_satker) AS kode_satker FROM ref_riset_satker x left join ref_satuan_kerja y on x.id_satker=y.id_satker ";
        $table .= "where x.id_riset=a.id_riset GROUP BY id_riset) like '%$kodesatker%' ";
        $table .= "group by a.riset ) as ga";
        return easy_pagging($data, $field, $table);
    }

    public function load_file($data)
    {
        $field = "*";
        $table = "trx_file_upload";
        return easy_pagging($data, $field, $table);
    }

    public function load_kegiatan($data)
    {
        $field = " a.*, concat(a.progress,',',a.jml_file,',',a.valid_period) as progress_bar, a.progress_kegiatan ";
        $table = " (select a.id_trx,a.id_riset,a.id_riset_kegiatan,a.start_date_kegiatan finish_riset,ifnull(a.progress,0) progress,a.keterangan,b.kegiatan,
						   b.start_date_kegiatan, b.finish_date_kegiatan, b.bobot,
						  (select count(1) from trx_file_upload where id_riset = a.id_riset and id_riset_kegiatan = a.id_riset_kegiatan) jml_file,
						  if(a.finish_date_kegiatan > sysdate(),1,0) valid_period,
						  round(ifnull((b.bobot/100*a.progress),0),2) progress_kegiatan,
						  ifnull((SELECT file_name from trx_file_upload where id_riset=a.id_riset and id_riset_kegiatan=a.id_riset_kegiatan order by id_file desc limit 1,1),'') last_document,
						  (SELECT GROUP_CONCAT(x.file_name) AS list_document FROM trx_file_upload x where x.id_trx=a.id_trx and x.id_riset=a.id_riset and x.id_riset_kegiatan=a.id_riset_kegiatan 
							GROUP BY id_trx,id_riset,id_riset_kegiatan) list_document
						  from trx_input_riset a left join ref_riset_kegiatan b on a.id_riset_kegiatan = b.id_riset_kegiatan) as a ";
        return easy_pagging($data, $field, $table);
    }

    function upload($param)
    {
        if (isset($_FILES['upload_file'])) {
            $data = $this->uploaderfiler->upload($_FILES['upload_file'], filer_properties());
            if ($data['isComplete']) {
                $files = $data['data'];
                foreach ($files['metas'] as $key => $value) {
                    $data_file = array(
                        'file_name' => $value['name'],
                        'id_trx' => $param['id_trx'],
                        'id_riset' => $param['id_riset'],
                        'id_riset_kegiatan' => $param['id_riset_kegiatan'],
                        'upload_date' => date("Y-m-d h:i:sa")
                    );
                    $this->db->insert('trx_file_upload', $data_file);
                }
                return true;
            }
            if ($data['hasErrors']) {
                $errors = $data['errors'];
                // echo $data['errors'];
                return $errors;
            }
        } else {
            return true;
        }
    }
	
	public function load_riset()
    {
		$kodesatker = $_SESSION['kode_satker'];
		
		$q = $this->db->query("select ga.* from (select a.*, concat(a.bobot,' %') bobot_percent, d.keyword, count(b.id_trx) jml_trx, 
								concat(ROUND(sum(ifnull((c.bobot/100*b.progress),0)),2),' %') as progress, 
								date_format(start_date, '%M %Y') start_date_month, date_format(finish_date, '%M %Y') finish_date_month,
								(SELECT GROUP_CONCAT(y.kode_satker) AS kode_satker FROM ref_riset_satker x left join ref_satuan_kerja y on x.id_satker=y.id_satker where x.id_riset=a.id_riset GROUP BY id_riset) kode_satker 
								from ref_riset a left join trx_input_riset b on a.id_riset=b.id_riset left join ref_riset_kegiatan c on b.id_riset_kegiatan=c.id_riset_kegiatan 
								left join ref_keyword d on a.id_keyword=d.id_keyword 
								where (SELECT GROUP_CONCAT(y.kode_satker) AS kode_satker FROM ref_riset_satker x left join ref_satuan_kerja y on x.id_satker=y.id_satker 
								where x.id_riset=a.id_riset GROUP BY id_riset) like '%$kodesatker%'
								group by a.riset ) as ga");
        $data = $q->result_array();
		return $data;
    }
	
	public function load_riset_kegiatan($idriset)
    {
		$q = $this->db->query("select a.id_riset_kegiatan,a.kegiatan, a.bobot, concat(a.bobot,' %') bobot_percent, 
								date_format(a.start_date_kegiatan, '%M %Y') start_date_month, 
								date_format(a.finish_date_kegiatan, '%M %Y') finish_date_month,
								(select concat(progress,' %') progress_percent from trx_input_riset where id_riset=$idriset and id_riset_kegiatan=a.id_riset_kegiatan) progress_percent,
								(select finish_riset_kegiatan from trx_input_riset where id_riset=$idriset and id_riset_kegiatan=a.id_riset_kegiatan) finish_riset_kegiatan,
								(select keterangan from trx_input_riset where id_riset=$idriset and id_riset_kegiatan=a.id_riset_kegiatan) keterangan,
								(SELECT file_name from trx_file_upload where id_riset=$idriset and id_riset_kegiatan=a.id_riset_kegiatan order by id_file desc limit 1,1) data_dukung
								from ref_riset_kegiatan a");
        $data = $q->result_array();
		return $data;
    }

	public function get_email_admin_satker()
    {
		$kodesatker = $_SESSION['kode_satker'];
		$q = $this->db->query("select a.nip,a.name,a.telepon,a.email from app_resource a left join ref_satuan_kerja b on a.id_satker=b.id_satker
								where b.kode_satker = '$kodesatker';");
        $data = $q->result_array();
		return $data;
    }

	public function ready_approve($data)
    {
		$username = $_SESSION['user_login'];
		$dataupdate['status'] = '2';
		$dataupdate['modified_by'] = $username;
		$dataupdate['modified_date'] = date('Y-m-d h:i:s');
        $this->db->where('id_riset', $data['id_riset']);
        return $this->db->update('ref_riset', $dataupdate);
	}
	
	public function approve($data)
    {
		date_default_timezone_set("Asia/Jakarta");
		$username = $_SESSION['user_login'];
		$dataupdate['status'] = '3';
		$dataupdate['approved_by'] = $username;
		$dataupdate['approved_date'] = date('Y-m-d h:i:s');
        $this->db->where('id_riset', $data['id_riset']);
        return $this->db->update('ref_riset', $dataupdate);
    }
	
	
}
