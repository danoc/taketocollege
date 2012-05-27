<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Settings extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('form');
	}
	
	public function index()
	{
		$this->load->model('Users');
		
		// set form validation for setting page
		$this->load->library('form_validation');
		// $this->form_validation->set_rules('first_name', '<strong>first name</strong>', 'trim|required|min_length[2]|max_length[30]');
		// $this->form_validation->set_rules('last_name', '<strong>last name</strong>', 'trim|required|min_length[2]|max_length[30]');
		// $this->form_validation->set_rules('email', '<strong>email</strong>', 'trim|required|valid_email|max_length[50]');
		$this->form_validation->set_rules('first_name', '<strong>first name</strong>', 'trim');
		$this->form_validation->set_rules('last_name', '<strong>last name</strong>', 'trim');
		$this->form_validation->set_rules('email', '<strong>email</strong>', 'trim');
		
		if($this->input->post() && $this->form_validation->run() && $this->session->userdata('user_id')) {
			// user is updating profile information
			if($this->input->post('first_name')) {
				$user['first_name'] = $this->input->post('first_name');
				$this->session->set_userdata('first_name', $user['first_name']);
			}
			if($this->input->post('last_name')) {
				$user['last_name'] = $this->input->post('last_name');
				$this->session->set_userdata('last_name', $user['last_name']);
			}
			if($this->input->post('email')) {
				$user['email'] = $this->input->post('email');
				$this->session->set_userdata('email', $user['email']);
			}
			$user['social_sharing'] = ($this->input->post('social_sharing') == '1' ? '1' : '0');
			if(isset($user['social_sharing'])) $this->session->set_userdata('social_sharing', $user['social_sharing']);
			
			$this->Users->update_user($user, $this->session->userdata('user_id'));
			$this->session->set_flashdata('success', 'Good news! Your account information was updated successfully.');
			$this->load->view('settings_view');
			
		} else if($this->session->userdata('user_id')) {
			$this->load->view('settings_view');		
		} else {
			redirect('');
		}	
	}	
}