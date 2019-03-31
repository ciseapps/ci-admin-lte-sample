<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Keyword_model extends CI_Model
{

    public function create($data)
    {
        $id = IDGenerator::getInstance()->nextID('ref_keyword');
        if (!empty($id)) {
            $data['id_keyword'] = $id;
        }
        return $this->db->insert('ref_keyword', $data);
    }

    public function update($data)
    {
        $this->db->where('id_keyword', $data['id_keyword']);
        return $this->db->update('ref_keyword', $data);
    }

    public function delete($data)
    {
        $this->db->where('id_keyword', $data['id_keyword']);
        return $this->db->delete('ref_keyword');
    }

    public function load($data)
    {
        $field = "a.* ";
        $table = 'ref_keyword a';
        return easy_pagging($data, $field, $table);
    }

}
