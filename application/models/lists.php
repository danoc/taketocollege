<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Lists extends CI_Model {

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }

	#####################
	#	List Functions	#
	#####################

	/**
	* Returns an organized array of items in a list. 
	* The array is separated by column and ordered
	* to keep the rows as level as possible.
	*/
	
    function get_list($list_id)
	{
		# Get the requested items
		$items = false;
		
		if($list_id) $items = $this->get_list_items($list_id);
		else $items = $this->get_items('type', 'main');

		// echo "<pre>";
		// print_r($items);
		// echo "</pre>";

		# Create an variable to assist with building the array.
		$helper = array('item_count' => 0, 'categories' => array(), 'columns' => array('', '', '', ''));
				
		# Create the beginning structure of the list array.
		$list = array(array(), array(), array(), array());

		function sortByOrder($a, $b) {
		    return strtoupper($a['title']) > strtoupper($b['title']);
		}

		usort($items, 'sortByOrder');
		
		# Puts the helper array together.
		foreach($items as $item)
		{
			# Store the number of tems in each level of importance.
			$helper['item_count'] += 1;

			# Make life easier.
			$category = $item['category'];

			// Goes through all of the items, checks if the
			// item's category is one of the keys of the helper array,
			// and makes it a key if it is not. It takes into account
			// whether an item is recommended or optional.			
			if(!array_key_exists($category, $helper['categories']))
				$helper['categories'][$category] = array('item_count' => 0, 'moved' => 0);
			
			# Store the number of items in each category.
			$helper['categories'][$category]['item_count'] += 1;
		}

		function move_category(&$list, $category, $column, &$helper)
		{
			# Return false if the category has been moved before.
			if($helper['categories'][$category]['moved'] == 1)
				return false;

			# Add the category to the list array.
			$list[$column][$category] = array();

			# Indicate that the category has been moved.
			$helper['categories'][$category]['moved'] = 1;
			
			# Add to the number of items in each column.
			$size = $helper['categories'][$category]['item_count'];
			$helper['columns'][$column] += $size;
			
			return true;
		}
		
		$helper['column_average'] = round($helper['item_count']/4);
		$column_average = $helper['column_average'];
				
		if(array_key_exists('School Supplies', $helper['categories']))
			move_category($list, 'School Supplies', '0', $helper);
		if(array_key_exists('Room Items', $helper['categories']))
			move_category($list, 'Room Items', '1', $helper);
		if(array_key_exists('Electronics & Fun', $helper['categories']))
			move_category($list, 'Electronics & Fun', '2', $helper);
		if(array_key_exists('Miscellaneous', $helper['categories']))
			move_category($list, 'Miscellaneous', '3', $helper);
			
		$num_of_categories = count($helper['categories']);
		$num_moved = 0;
			
		// Goes through all of the categories and sees how many were moved.
		foreach($helper['categories'] as $category => $values)
		{
			$moved = $helper['categories'][$category]['moved'];
			if($moved == 1)
				$num_moved += 1;
		}

		while($num_of_categories != $num_moved)
		{
			$max_category_size = -1; 
			$max_category_name;

			foreach($helper['categories'] as $category => $values)
			{
				$moved = $helper['categories'][$category]['moved'];
				$size = $helper['categories'][$category]['item_count'];
				
				if($moved != 1 && $size > $max_category_size)
				{
					$max_category_size = $size;
					$max_category_name = $category;
				}
			}
				
			$min_column_size = 10000;
			$min_column_num;
			
			for($i = 0; $i < 4; $i++)
			{
				$size = $helper['columns'][$i];
				if($size < $min_column_size)
				{
					$min_column_size = $size;
					$min_column_num = $i;
				}
			}
			
			move_category($list, $max_category_name, $min_column_num, $helper);
			$num_moved++;
		}

		foreach($items as $item)
		{
			# Make life easier.
			$category = $item['category'];
			
			foreach($list as $column => $arr_categories)
			{
				if(array_key_exists($category, $arr_categories))
				{
					array_push($list[$column][$category], $item);
				}
			}
			
			// Goes through all of the items, checks if the
			// item's category is one of the keys of the helper array,
			// and makes it a key if it is not. It takes into account
			// whether an item is recommended or optional.			

			$helper['categories'][$category] = array('item_count' => 0, 'moved' => 0);
			
			# Store the number of items in each category.
			$helper['categories'][$category]['item_count'] += 1;
		}

		return $list;
	}


	/**
	* Grabs the items in a user's list by going through
	* the lists_items table and then grabbing each one
	* from the items table.
	*/
	
	function get_list_items($list_id) 
	{
		$this->db->select('item_id, checked');
		$query = $this->db->get_where('lists_items', array('list_id' => $list_id));
		$items = $query->result_array();
		foreach($items as $index => $item) {
			$info = $this->get_items('item_id', $item['item_id']);

			$items[$index]['title'] = $info[0]['title'];
			$items[$index]['category'] = $info[0]['category'];
			$items[$index]['code'] = $info[0]['code'];
			$items[$index]['type'] = $info[0]['type'];
			$items[$index]['amazon_url'] = $info[0]['amazon_url'];
		}
		return $items;
	}


	/**
	* Create a new list and return the ID. Each
	* list has a title, code, creator_id, and
	* last_updated timestamp.
	* @return: list_id
	*/

	function create_list($data) 
	{
		$this->db->insert('lists', $data);
		$id = $this->db->insert_id();
		return $id;
	}


	/**
	* Add an existing item to a user's list. Checks
	* to make sure that the item is not already in
	* the list.
	* @return: lists_item id
	*/
	
	function insert_item_to_list($item_id, $list_id, $checked) 
	{
		$item = array(
			'item_id'	=> $item_id,
			'list_id'	=> $list_id,
			'checked'	=> $checked
		);

		// $this->chromephp->log($item);
		
		// check to make sure item is not already in list
		if(!$this->is_in_list($item_id, $list_id)) {
			// $this->chromephp->log('Item is unique');
			$this->db->insert('lists_items', $item);
			return $this->db->affected_rows();
		}
		// $this->chromephp->log('Item is already in list'); 
		return false;
	}
	
	
	/**
	* Check if an item is in a user's list.
	* Useful for ensuring that an item doesn't
	* appear twice in a list.
	* @return: boolean
	*/
	
	function is_in_list($item_id, $list_id) 
	{
		$this->db->where('item_id', $item_id);
		$this->db->where('list_id', $list_id);
		$query = $this->db->get('lists_items');
		
		if($query->num_rows() > 0) return true;
		else return false;
	}
	
	/**
	* Delete a list from the lists table.
	*/
	
	function delete_list($list_id) 
	{
		$this->db->where('list_id', $list_id);
		$this->db->delete('lists_items');
	}
	
	
	/**
	* Get a field from the lists table.
	*/
	
	function get_info($field, $key, $value) {
		$this->db->select($field);
		$query = $this->db->get_where('lists', array($key => $value));
		if($query->num_rows() > 0) {
			$row = $query->row();
			return $row->$field;
		}
		return false;
	}

	######################
	#	Item Functions   #
	######################

	/**
	* Get the item's where $key = $value. Useful
	* for grabbing the default list.
	* @return: an array of items
	*/
	
	function get_items($key, $value, $where = null) 
	{
		$this->db->select('item_id, title, category, code, type, amazon_url');
		if($where) {
			// $where = "name='Joe' AND status='boss' OR status='active'";
			$this->db->where($where);
		} else {
			$this->db->where($key, $value); 
		}
		
		$query = $this->db->get('items');
		return $query->result_array();
	}	
	
	/**
	* Create a new item in the items table. First
	* checks if the item already exists and returns
	* existing item_id if it does.
	* @return: item_id
	*/
	
    function create_item($title, $category, $creator_id, $code)
    {
		$item = array(
			'title'			=> $title,
			'category'		=> $category,
			'creator_id'	=> $creator_id,
			'code'			=> $code,
			'type'			=> 'submitted'
		);
		
		// $this->chromephp->log($item);

		if($this->get_items('title', $title)) {
			// item with that title already exists
			$item = $this->get_items('title', $title);
			return $item[0]['item_id'];
		} else {
			$this->db->insert('items', $item);
			$id = $this->db->insert_id();
			return $id;
		}
		
    }
	
	
	/**
	* Change the checked field in the lists_items
	* table.
	*/
	
	function check_item($list_id, $item_id, $checked)
	{
		$data = array('checked' => $checked);
		$this->db->where('list_id', $list_id);
		$this->db->where('item_id', $item_id);
		$result = $this->db->update('lists_items', $data);
		// $this->chromephp->log($this->db->affected_rows());
	}
	
	
	/**
	* Delete an item from a list. Works by deleting
	* the relevant row in the lists_items table. The
	* item never gets deleted.
	* @todo: delete item from items table if no other
	* user is using it. 
	*/
	
	function delete_from_list($item_id, $list_id) {
		$this->db->where('list_id', $list_id);
		$this->db->where('item_id', $item_id);

		$this->db->delete('lists_items');
	}
}
