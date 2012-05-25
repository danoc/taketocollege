<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Item extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Lists');
	}
	
	public function index()
	{
	}
	
	/**
	* Add an item to a user's list and create it
	* if the item does not exist.
	*/
	public function create() {
		$this->load->library('form_validation');
		$this->form_validation->set_rules('title', 'title', 'trim|required|min_length[2]|max_length[50]');

		if($this->input->post() && $this->form_validation->run()) {
			// get item information
			$list_id = $this->input->post('list_id');
			$creator_id = $this->session->userdata('user_id');
			$item['title'] = $this->input->post('title');
			$item['category'] = $this->input->post('category');

			// create a random code
			$this->load->helper('string');
			$item['code'] = random_string('numeric', 8);

			// create the item and get the id. function
			// returns an existing id if the item already
			// exists.
			$item['id'] = $this->Lists->create_item($item['title'], $item['category'], $creator_id, $item['code']);

			// add the item to a user's list. returns the
			// new item_id or false when the user already 
			// has the item in their list
			$result = $this->Lists->insert_item_to_list($item['id'], $list_id, '0');
			if($result) {
				echo $item['id'];
			} else {
				echo json_encode($result);
			}
		}
	}
	
	/**
	* Delete an item from a list or an entire
	* list if no item_id is passed.
	*/
	public function remove() {
		if($this->input->post()) {
			$item_id = $this->input->post('item_id');
			$list_id = $this->input->post('list_id');

			if($item_id) {
				// delete item from a list
				$this->Lists->delete_from_list($item_id, $list_id);
			} else {
				// delete list
				$this->Lists->delete_list($list_id);
			}
			
		}
	}
	
	/**
	* Check or uncheck an item in a list.
	*/
	public function check() {
		if($this->input->post()) {
			$item_id = $this->input->post('item_id');
			$list_id = $this->input->post('list_id');
			$checked = $this->input->post('checked');
			$this->Lists->check_item($list_id, $item_id, $checked);
		}
	}
	
}