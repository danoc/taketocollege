<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!-- Consider adding a manifest.appcache: h5bp.com/d/Offline -->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">

	<!-- Use the .htaccess and remove these lines to avoid edge case issues.
	     More info: h5bp.com/i/378 -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title>Take to College</title>
	<meta name="description" content="">

	<!-- Mobile viewport optimized: h5bp.com/viewport -->
	<meta name="viewport" content="width=device-width">

	<!-- Place favicon.ico and apple-touch-icon.png in the root directory: mathiasbynens.be/notes/touch-icons -->

	<!-- <link rel="stylesheet" href="css/style.css"> -->
	<link rel="stylesheet/less" type="text/css" href="<?=base_url();?>css/style.less">
	<script src="http://lesscss.googlecode.com/files/less-1.3.0.min.js" type="text/javascript"></script>

	<!-- More ideas for your <head> here: h5bp.com/d/head-Tips -->

	<!-- All JavaScript at the bottom, except this Modernizr build.
	     Modernizr enables HTML5 elements & feature detects for optimal performance.
	     Create your own custom Modernizr build: www.modernizr.com/download/ -->
	<script src="<?=base_url();?>js/libs/modernizr-2.5.3.min.js"></script>
</head>
<body id="main">
	<!-- Prompt IE 6 users to install Chrome Frame. Remove this if you support IE 6.
	     chromium.org/developers/how-tos/chrome-frame-getting-started -->
	<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
	
	<div id="fb-root"></div>
	<script>
		var connected = false;

		window.fbAsyncInit = function() {
			FB.init({
				appId      : <?=FACEBOOK_APP_ID;?>, // App ID
				status     : true, // check login status
				cookie     : true, // enable cookies to allow the server to access the session
				xfbml      : true  // parse XFBML
			});
			
			// visitor clicked on login link
			$('.login-link').live('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				FB.login(function(response) {
					var authenticated = false;
					
					if(response.authResponse) {
						// user has granted all permissions
						authenticated = true;
					} else {
						// user denied access to information
						// continue as long as email is accessible
						FB.api('/me/permissions', 'get', function(response) {
							if(response.data[0].email) authenticated = true;
						});
					}
					
					// continue with login/registration
					if(authenticated) {
						// assume user is registering
						// create the user
						FB.api('/me?fields=id,name,first_name,last_name,email', function(me) {
							var cct = $.cookie('ttc_csrf_cookie'); // csrf protection
							var sUrl = "<?= base_url(); ?>user/create/";
							var serialized = { 
								first_name: me.first_name, 
								last_name: me.last_name, 
								email: me.email, 
								oauth_provider: 'facebook', 
								oauth_uid: me.id,
								ttc_csrf_token: cct
							};
							$.ajax({
								url: sUrl,
								type: "POST",
								data: serialized,
								success: function(user_id) { // return false when account exists
									if(eval(user_id)) {
										// account created successfully
										console.log('Account created successfully');
			
										// prepare items and create list
										var items = createItemArray();

										// create a list
										var cct = $.cookie('ttc_csrf_cookie'); // csrf protection
										var sUrl = "<?= base_url(); ?>list/create/";
										var serialized = {
											title: me.first_name+'\'s College Packing List',
											items: items,
											creator_id: user_id,
											ttc_csrf_token: cct
										};
										$.ajax({
											url: sUrl,
											type: "POST",
											data: serialized,
											success: function(list_id) {
												console.log('List Created: list_id - '+list_id);
												loginUser(me.id);
											} // returns list_id 
										});		
									} else {
										// account already exists
										console.log('User already exists');
										loginUser(me.id, me.name, me.first_name, me.last_name, me.email);
									}

								}
							});
						});
					}
					
				}, {scope: 'email, user_education_history, publish_actions'});
			});
			
		 };
		
		function loginUser(uid, name, firstName, lastName, email) {
			var cct = $.cookie('ttc_csrf_cookie'); // csrf protection
			var sUrl = "<?= base_url(); ?>user/login/";
			var serialized = {
				oauth_uid: uid,
				name: name,
				first_name: firstName,
				last_name: lastName,
				email: email,
				ttc_csrf_token: cct
			};
			$.ajax({
				url: sUrl,
				type: "POST",
				data: serialized,
				success: function(user_id) { // false when login fails
					if(eval(user_id)) {
						// login successful
						console.log('Login successful');
						location.reload();
					} else {
						// login failed
						console.log('Login failed');
					}
				}
			});
		}		

		// Load the SDK Asynchronously
		(function(d){
			var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement('script'); js.id = id; js.async = true;
			js.src = "//connect.facebook.net/en_US/all.js";
			ref.parentNode.insertBefore(js, ref);
		}(document));
	</script>
	
	<div id="container">
		<header class="clearfix">
			<a href="<?= base_url(); ?>" id="logo">
				<img src="<?= base_url(); ?>img/take-to-college.png" width="279" height="60" alt="Take To College" />
			</a>
			<nav>
				<ul class="navigation">
					<?php if(ENVIRONMENT == 'development'): ?>	
						<li><a class="group" href="#about" rel="facebox">About</a></li>
						<li><a href="#fb_ideas" rel="facebox" class="soft-button success">Explore Items</a></li>
					<?php endif; ?>

					<?php if($this->session->userdata('user_id')): ?>
						<li>
							<a href="<?=base_url();?>settings/" class="nav-profile-link">
								<img src="https://graph.facebook.com/<?=$this->session->userdata('fb_id');?>/picture" /><?=$this->session->userdata('first_name');?>
							</a>
						</li>
					<?php else: ?>
						<li><a href="#" class="login-link"><strong>Login</strong></a></li>
					<?php endif; ?>
				</ul>
			</nav>
	    </header>

	    <div class="list clearfix" role="main">
			<div id="list-<?=$list_id;?>">
			<div class="fb-like" id="like-button" data-href="http://facebook.com/ttcollege" data-send="false" data-layout="button_count" data-width="100" data-show-faces="false"></div>
			<h1><?=$title;?></h1>
			<?php
				foreach($items as $column) 
				{
					echo '<div class="col">';
					foreach($column as $category => $category_array) 
					{
						echo '<div id="category-'.str_replace(' ', '-', strtolower($category)).'" name="'.$category.'" class="category">';
							echo '<h2>'.$category.'</h2>';
							echo '<ul>';
							foreach($category_array as $item) 
							{
								echo '<li id="item-'.$item['item_id'].'" class="item clearfix" name="'.$item['title'].'">';
								if(isset($item['checked']) && $item['checked']) {
									echo '<img src="'.base_url().'img/checkbox-checked.png" width="16" height="16" class="checkbox checked" />';
								} else {
									echo '<img src="'.base_url().'img/checkbox-unchecked.png" width="16" height="16" class="checkbox" />';		
								}	
									echo '<span class="item_title">'.$item['title'].'</span>';
									if($item['amazon_url']) {
										echo '<div class="item_actions">';
											echo '<a href="'.$item['amazon_url'].'" title="Buy on Amazon"><img src="'.base_url().'img/icons/basket.png" width="16" height="16" class="buy" alt="Buy"></a>';
										echo '</div>';
									}	
								echo '</li>';
							}
							echo '</ul>';

						echo '</div>';
					}
					echo '</div>';
				}
			?>
			</div>
	    </div>

		<?php if(ENVIRONMENT == 'development'): ?>	
			<a href="<?= site_url(); ?>user/logout">Logout</a>
			<pre>
<?php print_r($this->session->userdata); ?>
			</pre>
		<?php endif; ?>

	    <footer>
			<ul>
				<?php if(ENVIRONMENT == 'development'): ?>	
					<li><a href="<?= site_url().'about/'; ?>">About</a></li>
				<?php endif; ?>
				
				<li><a href="http://blog.taketocollege.com/">Blog</a></li>
				<li><a href="mailto:daniel@danoc.me">Contact</a></li>
				<li><a href="http://twitter.com/ttcollege">Twitter</a></li>
				<li><a href="http://facebook.com/ttcollege">Facebook</a></li>
				<li>&copy; Take to College</li>
			</ul>
	    </footer>
	</div>
	
	<!-- JavaScript at the bottom for fast page loading -->

	<!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script>

	<!-- scripts concatenated and minified via build script -->
	<script src="<?=base_url();?>js/plugins.js"></script>
	<script src="<?=base_url();?>js/script.js"></script>
	<!-- end scripts -->

	<!-- Asynchronous Google Analytics snippet. Change UA-XXXXX-X to be your site's ID.
	     mathiasbynens.be/notes/async-analytics-snippet -->
	<script>
		var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
		(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
		g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
		s.parentNode.insertBefore(g,s)}(document,'script'));
	</script>
	</body>
</html>