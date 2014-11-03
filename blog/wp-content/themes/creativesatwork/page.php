<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package globehop
 */

get_header(); ?>


<div class="body_content">
		<div class="content-area no-padding">
			<!-- end of destinations-banner -->
			<div class="featured-local-experiences-wrapper">
				<div class="container">
					
					<div class="row">
						<div class="col-sm-8 col-sm-offset-2">

						
							<div class="blog_box">
								<div class="blog_header">
									<h3><a href="<?php echo get_permalink();?>"><?php the_title();?></a></h3>
								</div>
								<div class="blog_body">
									<?php while ( have_posts() ) : the_post(); ?>
									
										<?php the_content(); ?>

									<?php endwhile; // end of the loop. ?>
				
									
									
									
								</div>
							</div>
							<!-- end of blog_box -->
							
							
							
						</div>
					</div>
				</div>
			</div>
			<!-- end of featured-local-experiences-wrapper -->
		</div>
	</div>
	
	
<?php get_footer(); ?>
