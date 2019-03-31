<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Riset_model extends CI_Model
{

    public function create($data)
    {
        $id = IDGenerator::getInstance()->nextID('ref_riset');
        if (!empty($id)) {
            $data['id_riset'] = $id;
        }
			$data_satker = array();
			$data_satker = $data['id_satker'];
			
			unset($data['id_satker']);
			$data['status'] = "1";
			$this->db->insert('ref_riset', $data);
			$idriset = $this->db->insert_id();

			for($i=0;$i<count($data_satker);$i++){
				$data_array = array(
					"id_satker" => (int) $data_satker[$i],
					"id_riset" => (int) $idriset
				);
				$this->db->insert("ref_riset_satker", $data_array);
			}

		if ($idriset) {
            return true;
        } else {
            return false;
        }
    }

    public function update($data)
    {
		$idriset = $data["id_riset"];
		if (isset($data["id_satker"])){

			$data_satker = array();
			$data_satker = $data['id_satker'];
			unset($data["id_satker"]);
			$this->db->where("id_riset", $idriset);
			$this->db->delete("ref_riset_satker");
			
			for($i=0;$i<count($data_satker);$i++){
				$data_array = array(
					"id_satker" => (int) $data_satker[$i],
					"id_riset" => (int) $idriset
				);
				$this->db->insert("ref_riset_satker", $data_array);
			}
		}
		
		$this->db->where("id_riset", $idriset);
        return $this->db->update("ref_riset", $data);
		
    }

    public function delete($data)
    {
        $this->db->where('id_riset', $data['id_riset']);
        return $this->db->delete('ref_riset');
    }

    public function load($data)
    {
        $field = "a.*";
        $table = "(select a.*,  concat(a.bobot,' %') bobot_percent, date_format(start_date, '%M %Y') start_date_month, date_format(finish_date, '%M %Y') finish_date_month, b.keyword,
				  (SELECT GROUP_CONCAT(y.kode_satker) AS kode_satker FROM ref_riset_satker x left join ref_satuan_kerja y on x.id_satker=y.id_satker 
				  where x.id_riset=a.id_riset GROUP BY id_riset) kode_satker, substr(a.tujuan,1,15) substr_tujuan ";
        $table .= " from ref_riset a left join ref_keyword b on a.id_keyword = b.id_keyword ) as a";
        return easy_pagging($data, $field, $table);
    }

}
