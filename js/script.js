/* Author: Daniel O'Connor */

$(document).ready(function() {

	var actions = 0;
	var welcomeMessage = false; // welcome new users
	var loginAlert = false; // warn about saving list
	var base_url = window.location;
	
	if(base_url.toString().indexOf("localhost") != -1) {
		base_url = 'http://localhost:8888/taketocollege/';
	} else {
		base_url = 'http://beta.taketocollege.com/';
	}
	
	// Check the checkbox when an item is clicked.
	$('.item').live('click', function(e) {
		$(this).children('.info').slideToggle();

		var checkbox = $(this).children('.checkbox');
		checkbox.toggleClass('checked');

		// used for submitting to controller
		var list_id = $(this).parentsUntil('[id*="list"]').parent().attr('id').substring(5);
		var checked = '0';

		if(checkbox.attr('src') == 'img/checkbox-unchecked.png') {		
			checkbox.attr('src', 'img/checkbox-checked.png');
			checked = '1';
		} else {
			checkbox.attr('src', 'img/checkbox-unchecked.png');
		}
		
		if(connected) {
			var item_id = $(this).attr('id').substring(5);
			var cct = $.cookie('ttc_csrf_cookie'); // csrf protection
			var sUrl = base_url+'item/check/';
			var serialized = {
				list_id: list_id,
				item_id: item_id,
				checked: checked,
				ttc_csrf_token: cct
			};
			$.ajax({
				url: sUrl,
				type: "POST",
				data: serialized,
				success: function(data) {}
			});
		}

		if(connected) setSaved(true);

		// Show notices and messages
		processActions();
	});	

	// Show the add_item_form when the "Add Item"
	// link is clicked and hide the "Add Item" button.
	$('.add_item').click(function(e) {
		$(this).hide();
		var form = $(this).prev('.add_item_form');
		var input = $(form).children('input');
		var list_id = $(this).parentsUntil('[id*="list"]').parent().attr('id').substring(5);
		
		$(form).fadeIn(250);
		$(input).show().focus();
		
		var cct = $.cookie('ttc_csrf_cookie'); // csrf protection
		var sUrl = base_url+'list/autocomplete/';
		var serialized = {
			list_id: list_id,
			ttc_csrf_token: cct
		};
		$.ajax({
			url: sUrl,
			type: "POST",
			data: serialized,
			success: function(items) {
				var itemsArr = jQuery.parseJSON(items);
				$(input).autocomplete({
					source: itemsArr,
					minLength: 2,
					select: function( event, ui ) {},
					open: function(e,ui) { // bold matched term
			            var acData = $(this).data('autocomplete');
			            acData.menu.element.find('a').each(function() {
							var me = $(this);
			                var regex = new RegExp(acData.term, "gi");
			                me.html( me.text().replace(regex, function (matched) {
			                    return '<strong>'+matched+'</strong>';
			                }));
			            });
			        }
				});
			}
		});


		
	});
	
	// Hide the add_item_form when the input is
	// empty and focus is lost.
	$('.add_item_form').children('input').blur(function() {
		if($(this).val().length == 0) {
			$(this).hide();
			$(this).parent().next('.add_item').fadeIn(250);
		}
	});
	
	// Get the old item title, a new one,
	// and replace it. 
	// $('.rename').live('click', function(e) {
	// 	e.preventDefault();
	// 	var titleSpan = $(this).parent().parent().prev();
	// 	var title = titleSpan.text(); // item_name
	// 	var category = titleSpan.parentsUntil('ul').parent().attr('name');
	// 	var list_id = $(this).parentsUntil('[id*="list"]').parent().attr('id').substring(5);
	// 	var item_id = $(this).parentsUntil('li').parent().attr('id');
	// 	var newTitle = prompt("Rename this item:", title);
	// 			
	// 	if(connected) {
	// 		var sUrl = base_url+'item/rename/';
	// 		var serialized = {
	// 			title: newTitle,
	// 			category: category,
	// 			item_id: item_id,
	// 			list_id: list_id
	// 		};
	// 		$.ajax({
	// 			url: sUrl,
	// 			type: "POST",
	// 			data: serialized,
	// 			success: function(data) {
	// 				alert(data);
	// 				if(data) { // new item created
	// 					titleSpan.text(newTitle).parent().effect("highlight", {}, 3000);
	// 				}
	// 			}
	// 		});
	// 	}
	// 
	// 	// show notices and messages
	// 	processActions();
	// 	
	//     e.stopPropagation();
	// });
	
	// Remove an item from the list.
	$('.remove').live('click', function(e) {
		e.preventDefault();
		var list_item = $(this).parentsUntil('li').parent();

		var list_id = $(this).parentsUntil('[id*="list"]').parent().attr('id').substring(5);

		if(connected) {
			var item_id = list_item.attr('id').substring(5);
			var cct = $.cookie('ttc_csrf_cookie'); // csrf protection
			var sUrl = base_url+'item/remove/';
			var serialized = {
				list_id: list_id,
				item_id: item_id,
				ttc_csrf_token: cct
			};
			$.ajax({
				url: sUrl,
				type: "POST",
				data: serialized,
				success: function(data) {
					// remove list item
					list_item.fadeOut(300, function() {
						$(this).remove();
					});
					processActions(); // show notices and messages
				}
			});
		} else {
			// remove list item
			list_item.fadeOut(300, function() {
				$(this).remove();
			});
		}
		if(connected) setSaved(true);
	    e.stopPropagation();
	});

	
	// Process new items and add them to the list.
	$('.add_item_form').submit(function(e) {
		e.preventDefault();
		var form = $(this);
		var title = $(this).children('input').val();
		var category = $(this).parent().attr('name');
		var list_id = $(this).parentsUntil('[id*="list"]').parent().attr('id').substring(5);
		var params = $(this).serialize();

		if(connected) {		
			var cct = $.cookie('ttc_csrf_cookie'); // csrf protection
			var sUrl = base_url+'item/create/';
			var serialized = {
				title: title,
				category: category,
				list_id: list_id,
				ttc_csrf_token: cct
			};
			$.ajax({
				url: sUrl,
				type: "POST",
				data: serialized,
				success: function(item_id) {
					// console.log(item_id);
					if(eval(item_id)) {
						// item is unique - add it to list
						addToList(title, item_id, category);
						$(form).children('input[name="title"]').val('');
					} else {
						// item already in list
						alert('An item named \''+title+'\' already exists in your list.')
						$('li[name="'+title+'"]').effect("highlight", {}, 2000);
					}
				}
			});
		} else {
			// user is just a guest - add item to list.
			addToList(title, null, category);
			$(form).children('input[name="title"]').val('');
		}

		if(connected) setSaved(true);
		processActions();
	
		$(this).children('input').blur().focus();
	});
	
	
	// open links in new tabs if user is not
	$('.buy').parent().attr({ target: "_blank" });
	$('.buy').live('click', function(e) {
	    e.stopPropagation();
	});
	
	
	// Add an item to a category within a list, sort
	// the category, and highlight the new item.
	function addToList(title, item_id, category) {
		var container = $('div[name="'+category+'"]').children('ul');

		container.append('<li class="item clearfix" name="'+ title +'"><img src="img/checkbox-unchecked.png" width="16" height="16" class="checkbox" alt=""><span class="item_title">'+ title +'</span><div class="item_actions"><!--<a href="" title="Remame item"><img src="img/icons/rename.png" width="12" height="12" class="rename" alt="Rename"></a>--><a href="" title="Remove from list"><img src="img/icons/remove.png" width="10" height="10" class="remove" alt="Remove"></a></div></li>');
		
		if(item_id) {
			console.log('item_id: '+item_id);
			$('li[name="'+title+'"]').attr('id', 'item-'+item_id);
		}
		
		var items = container.children('li').get();
		
		items.sort(function(a, b) {
		   var compA = jQuery.trim($(a).text().toUpperCase());
		   var compB = jQuery.trim($(b).text().toUpperCase());
		   return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
		})

		$.each(items, function(idx, itm) { container.append(itm); });
	
		container.children('li[name="'+title+'"]').effect("highlight", {}, 2000);
		if(connected) setSaved(true);
	}
	
	// Make the list_actions scroll with the 
	// visitor's browser
	$(window).bind('scroll', function(){
		var scrollBottom = $(document).height() - ($(document).scrollTop() + $(window).height());
			
		$("#list_actions").fadeIn();
						
		if(scrollBottom < 55) {
			$('#list_actions').css("margin-bottom", 55-scrollBottom);
		} else {
			$('#list_actions').css("margin-bottom", 0);
		}
	});
		
	$('#save').click(function(e) {
		e.preventDefault();
		setSaved(true);
	});

	$('#print').click(function(e) {
		e.preventDefault();
		window.print();
	});

	function clearNotices() {
		$('.notice').remove();
	}
	
	function showNotice(id, style, strong, text, clearNotice, highlightColor, scrollTo, fadeOut) {
		if(clearNotice) clearNotices();
		$('#new-user-notice-container').append('<div id="'+id+'" class="notice '+style+'"><p><strong>'+strong+'</strong> '+text+'</p></div>');
		if(scrollTo) $.scrollTo('#'+id, 400, {offset: {top:-5}});
		if(highlightColor) $('#'+id).delay('250').effect("highlight", {color:highlightColor}, 2000);
		if(fadeOut) $('#'+id).delay(fadeOut).fadeOut('1000');
	}

	function processActions() {
		actions++;
		if(actions > 0 && !connected && !welcomeMessage) {		
			// show welcome notice to visitors
			showNotice('notice-welcome', 'alert', 'Welcome!', 'Create your college packing list below and login to save it when you are done.', true, false, false, false);
			$('#notice-container').fadeIn(700);
			welcomeMessage = true; 
		} else if(actions > 7 && !connected && !loginAlert) {
			// ask users to create an account
			showNotice('notice-login', 'error login-link', 'Warning!', 'You should <a href="#" class="login-link">register or login</a> to save your college shopping list.', true, 'false', true, false);
			$('#save').css('border', '1px solid #e95050').effect("highlight", {color: '#ffbebe'}, 3000);
			loginAlert = true;
		}
	}

	// Take an item from the "Explore Items" list and
	// add it to the user's list.
	$('.add').live('click', function(e) {
		e.preventDefault();
		
		var listItem = $(this).parentsUntil('li').parent();
		var itemCategory = listItem.attr('name');
		var itemTitle = $(this).parent().prev('.item_title').text();
		var list = $('ul[name="'+itemCategory+'"]');
				
		// Add the item to the college packing list.
		list.append('<li class="item clearfix" name="'+ itemTitle +'"><img src="img/checkbox-unchecked.png" width="16" height="16" class="checkbox" alt=""><span class="item_title">'+ itemTitle +'</span><div class="item_actions"><!--<a href="" title="Remame item"><img src="img/icons/rename.png" width="12" height="12" class="rename" alt="Rename"></a>--><a href="" title="Remove from list"><img src="img/icons/remove.png" width="10" height="10" class="remove" alt="Remove"></a></div></li>');
		
		// Sort the user's list.
		var listitems = list.children('li').get();
		listitems.sort(function(a, b) {
		   var compA = jQuery.trim($(a).text().toUpperCase());
		   var compB = jQuery.trim($(b).text().toUpperCase());
		   return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
		})
		$.each(listitems, function(idx, itm) { list.append(itm); });
		
		// Highlight the new item when it is added.
		$(list).children('li[name="'+itemTitle+'"]').effect("highlight", {}, 2000);				
		
		// Show a success message.
		$('#ideas ul').before('<p class="notice alert">Item added successfully</p>');
		$('#ideas .notice').delay(2000).fadeOut();
	
		// Remove the item from the "Explore Items" page.
		listItem.fadeOut();
	
		// Show notices and messages
		processActions();
	
		e.stopPropagation();
	});
	
	$('a[rel*=facebox]').facebox();
  
});