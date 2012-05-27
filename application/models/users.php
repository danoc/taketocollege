<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Users extends CI_Model {

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    
	function create_user($data)
	{
		// check if user exists
		$query = $this->db->get_where('users', array('oauth_uid' => $data['oauth_uid']));
		if ($query->num_rows() > 0) {
			// user already exists
			return false;
		}

		// create account
		$result = $this->db->insert('users', $data);
		$id = $this->db->insert_id();
		return $id;
	}
	
	function authenticate_user($key, $value) {
		$this->db->select('user_id');
		$query = $this->db->get_where('users', array($key => $value));
		if ($query->num_rows() > 0) {
			$row = $query->row();
			return $row->user_id;
		}
		return false;
	}
	
	function get_user_information($field, $user_id) {
		$this->db->select($field);
		$query = $this->db->get_where('users', array('user_id' => $user_id));
		if ($query->num_rows() > 0) {
			$row = $query->row();
			return $row->$field;
		}
		return false;
	}
	
	function get_user_list($user_id) {
		$this->chromephp->log("user_id: ".$user_id); 
		$query = $this->db->get_where('lists', array('creator_id' => $user_id));
		$this->chromephp->log($query->result());		
		$this->chromephp->log($query->num_rows());		
		$row = $query->row();
		$this->chromephp->log($row);
		// $this->chromephp->log($row->list_id); 
		
		return $row->list_id;
	}
	
	function update_user($data, $user_id) {
		$this->db->where('user_id', $user_id);
		$this->db->update('users', $data); 
	}
}