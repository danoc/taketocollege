<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Users');
		$this->load->helper('form');
	}
	
	public function index()
	{
	}
	
	public function create() {
		if($this->input->post()) {
			$user['name'] = $this->input->post('name');
			$user['email'] = $this->input->post('email');
			$user['oauth_provider'] = $this->input->post('oauth_provider');
			$user['oauth_uid'] = $this->input->post('oauth_uid');
			$user['last_activity'] = date('Y-m-d H:i:s');

			$user_id = $this->Users->create_user($user);
			$this->session->set_userdata('user_id', $user_id);
			echo $user_id;
		}
	}
	
	public function login() {
		$user_id = $this->Users->authenticate_user('oauth_uid', $this->input->post('oauth_uid'));
		if($user_id) {
			$this->session->set_userdata('user_id', $user_id);	
			$this->session->set_userdata('name', $this->input->post('name'));
			$this->session->set_userdata('first_name', $this->input->post('first_name'));
			$this->session->set_userdata('email', $this->input->post('email'));
		}
		$this->chromephp->log("user_id is: ".$user_id);
		echo $user_id;
	}
	
	public function logout() {
		$this->session->sess_destroy();
		redirect('');
	}
}