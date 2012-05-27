<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('form');
	}
	
	public function index()
	{
		$this->load->model('Lists');
		$data['list_id'] = false;
		if($this->session->userdata('user_id')) {
			$this->load->model('Users');
			$data['list_id'] = $this->Users->get_user_list($this->session->userdata('user_id'));
		}
		$data['items'] = $this->Lists->get_list($data['list_id']);
		$this->load->view('main_view', $data);		
	}	
}