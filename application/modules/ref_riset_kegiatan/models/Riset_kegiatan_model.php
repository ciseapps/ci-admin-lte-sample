<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Riset_kegiatan_model extends CI_Model
{

    public function create($data)
    {
        $id = IDGenerator::getInstance()->nextID('ref_riset_kegiatan');
        if (!empty($id)) {
            $data['id_riset_kegiatan'] = $id;
        }
        return $this->db->insert('ref_riset_kegiatan', $data);
    }

    public function update($data)
    {
        $this->db->where('id_riset_kegiatan', $data['id_riset_kegiatan']);
        return $this->db->update('ref_riset_kegiatan', $data);
    }

    public function delete($data)
    {
        $this->db->where('id_riset_kegiatan', $data['id_riset_kegiatan']);
        return $this->db->delete('ref_riset_kegiatan');
    }

    public function load($data)
    {
        $field = " a.*, concat(a.bobot,' %') bobot_percent, date_format(a.start_date_kegiatan, '%M %Y') start_date_month, date_format(a.finish_date_kegiatan, '%M %Y') finish_date_month ";
        $table = " ref_riset_kegiatan a ";
        return easy_pagging($data, $field, $table);
    }

    public function load_kegiatan_by_riset($data)
    {
        $sql = "select a.* from trx_input_riset a where a.id_riset=?";
        $result = $this->db->query($sql, array($data["id_riset"]))->result();
        //var_dump($result);
        $tmp = array();
        $param = "";
        foreach ($result as $key => $value) {
            array_push($tmp, $value->id_riset_kegiatan);
            $param .= "?,";
        }
        $param = substr_replace($param, "", -1);
		if(!$param) $param='0';
        $sql = "select * from ref_riset_kegiatan where id_riset_kegiatan not in($param)";
        return $this->db->query($sql, $tmp)->result_array();
    }

}
