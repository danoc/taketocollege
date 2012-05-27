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
	<link rel="stylesheet/less" type="text/css" href="../css/style.less">
	<script src="http://lesscss.googlecode.com/files/less-1.3.0.min.js" type="text/javascript"></script>

	<!-- More ideas for your <head> here: h5bp.com/d/head-Tips -->

	<!-- All JavaScript at the bottom, except this Modernizr build.
	     Modernizr enables HTML5 elements & feature detects for optimal performance.
	     Create your own custom Modernizr build: www.modernizr.com/download/ -->
	<script src="<?=base_url();?>js/libs/modernizr-2.5.3.min.js"></script>
</head>
<body id="settings">
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
		};
		
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

					<?php if($this->session->userdata('user_id') && ENVIRONMENT == 'development'): ?>
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

	    <section id="content">
		
			<?php if(validation_errors()): ?>
				<div id="notice-container" class="notice error"><?= validation_errors(); ?></div>
			<?php elseif($this->session->userdata('flash:new:success')): ?>
				<div id="notice-container" class="notice success"><?= $this->session->userdata('flash:new:success'); ?></div>
			<?php endif; ?>
			
			<div id="welcome">
				<img id="profile-photo" src="https://graph.facebook.com/<?=$this->session->userdata('fb_id');?>/picture" alt="Facebook Profile Photo" />
				<h1>Welcome, <?= $this->session->userdata('first_name'); ?>!</h1>
				<h2>Edit your account information in the fields below</h2>
	    	</div>
	
			<div id="settings-container">
				<?=form_open(base_url().'settings/', array('class' => 'form-horizontal'));?>
					<fieldset>
						<div class="control-group">
							<label class="control-label" for="firstname">First Name</label>
							<div class="controls">
								<?=form_input(array('class' => 'input-xlarge', 'name' => 'first_name', 'disabled' => 'true', 'value' => $this->session->userdata('first_name'))); ?>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="lastname">Last Name</label>
							<div class="controls">
								<?=form_input(array('class' => 'input-xlarge', 'name' => 'last_name', 'disabled' => 'true', 'value' => $this->session->userdata('last_name'))); ?>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="email">Email</label>
							<div class="controls">
								<?=form_input(array('class' => 'input-xlarge', 'name' => 'email', 'disabled' => 'true', 'value' => $this->session->userdata('email'))); ?>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="optionsCheckbox">Social Sharing</label>
							<div class="controls">
								<label class="checkbox">
									<?=form_checkbox(array('class' => 'input-xlarge', 'name' => 'social_sharing', 'value' => TRUE, 'checked' => ($this->session->userdata('social_sharing') == 1 ? TRUE : FALSE))); ?>
										<span>Toggle social sharing on Facebook</span>
								</label>
							</div>
						</div>
						<div class="form-actions">
							<?= form_submit('submit', 'Save changes'); ?>
							<!-- <input type="submit" name="submit" id="submit-name" class="btn btn-primary" value="Save changes" /> -->
							<button class="btn">Cancel</button>
						</div>
					</fieldset>
				<?= form_close(); ?>
				
				
				
				
			</div>
		</section>
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