<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package globehop
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php wp_title( '|', true, 'right' ); ?></title>

<link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php bloginfo('template_url');?>/images/touch/apple-touch-icon-144x144-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php bloginfo('template_url');?>/images/touch/apple-touch-icon-114x114-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php bloginfo('template_url');?>/images/touch/apple-touch-icon-72x72-precomposed.png">
<link rel="apple-touch-icon-precomposed" href="<?php bloginfo('template_url');?>/images/touch/apple-touch-icon-57x57-precomposed.png">

<link rel="shortcut icon" sizes="196x196" href="<?php bloginfo('template_url');?>/images/touch/touch-icon-196x196.png">
<link rel="shortcut icon" href="<?php bloginfo('template_url');?>/images/globe-hop-favicon.png" type="image/vnd.microsoft.icon">

<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<!-- Bootstrap -->
<link href="<?php bloginfo('template_url');?>/css/bootstrap.min.css" rel="stylesheet">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

<link href="<?php bloginfo('template_url');?>/css/flexslider.css" rel="stylesheet">
<link rel="stylesheet" href="<?php bloginfo('template_url');?>/css/font-awesome.min.css">
<link rel="stylesheet" href="<?php bloginfo('template_url');?>/css/blog.css">
<link rel="stylesheet" href="<?php bloginfo('template_url');?>/css/datepicker.css">
<link rel="stylesheet" href="<?php bloginfo('template_url');?>/css/fileinput.css">
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.min.js"></script>
<!-- FlexSlider -->
<script defer src="<?php bloginfo('template_url');?>/js/jquery.flexslider.js"></script>
<script defer src="<?php bloginfo('template_url');?>/js/bootstrap-datepicker.js"></script>
<script defer src="<?php bloginfo('template_url');?>/js/jquery.navgoco.js"></script>
<!-- tinynav -->
<!--<script src="js/tinynav.min.js"></script>-->

<script src="<?php bloginfo('template_url');?>/js/script.js"></script>

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div class="header">
		<div class="container">
			<div class="row">
				<div class="logo-area">
					<a href="<?php echo home_url();?>"><img src="<?php bloginfo('template_url');?>/images/logo-w450.png" alt="CreativesAtWork Blog" /></a>
					<!--<p class="logo-tagline">Blog</p>-->
					
					<div class="clearfix"></div>
				</div>
				
				
			</div>
		</div>
	</div>
	<nav>
		<ul class="list-unstyled main-menu side-menu">
			
			<li class="nav-home">
				<a href="http://globehop.co">Home</a>
			</li>
			

			<li class="nav-blog">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>">Blog</a>
			</li>
			
			
			<li>
				<a href="http://globehop.co" class="btn-primary btn-signup hidden-xs">Sign Up</a>
			</li>
			
		</ul>
	</nav>