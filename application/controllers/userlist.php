<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class UserList extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Lists');
	}
	
	public function index()
	{
	}

	/**
	* Create a new list and add new and existing 
	* items. Used by a jQuery AJAX request.
	*/
	public function create() {
		if($this->input->post()) {
			$this->load->helper('string');

			$list['title'] = $this->input->post('title');
			$list['code'] = random_string('numeric', 6);
			$list['creator_id'] = $this->input->post('creator_id');
			$list['last_updated'] = date('Y-m-d H:i:s');			
			
			// create the user's list and store list_id
			$list_id = $this->Lists->create_list($list);
			
			if($list_id) { // list was created successfully
				$items = $this->input->post('items');
				// create new items and add existing
				// items to user's list
				foreach($items as $item) {
					$checked = ($item['checked'] === 'false' ? '0' : '1');
					
					$title = false; // must validate each new item
					if(isset($item['title'])) $title = trim($item['title']);
					
					if(!isset($item['id']) && strlen($title) > 1 && strlen($title) <= 50) { // create new item
						$item['code'] = random_string('numeric', 8);
						$item['id'] = $this->Lists->create_item($item['title'], $item['category'], '1', $item['code']);
					}
					$this->Lists->insert_item_to_list($item['id'], $list_id, $checked);
				}
			}
			return $list_id;
		}
	}


	/**
	* Grab recommended items that are not in the user's
	* list. This is used to power the autocomplete feature.
	*/
	public function autocomplete() {
		if($this->input->post()) {
			$list_id = $this->input->post('list_id');
			// $where = "name='Joe' AND status='boss' OR status='active'";
			$items = $this->Lists->get_items(null, null, "type = 'main' OR type = 'optional'");
			$user_items = $this->Lists->get_list_items($list_id);
			$this->chromephp->log($items);
			$this->chromephp->log($user_items);
			$unique_items = array();
			foreach($items as $item) {
				$unique = true;
				foreach($user_items as $user_item) {
					if($item['title'] === $user_item['title']) {
						$unique = false;
					}
				}
				
				if($unique) {
					$unique_items[count($unique_items)] = $item['title'];
				}
			}
			// $this->chromephp->log($unique_items);
			echo json_encode($unique_items);
		}
	}
	
}