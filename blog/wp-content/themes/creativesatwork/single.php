<?php
/**
 * The template for displaying all single posts.
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
						<div class="blog-head-breadcumb">
						
						<?php the_breadcrumb(); ?>
						
							
						</div>
						</div>
					</div>
					
					<div class="row">
						<div class="col-sm-8 col-sm-offset-2">
						
						
						
						<!--<ol class="breadcrumb">
						  <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
						  <li><a href="http://blog.globehop.co/">Blog</a></li>

						</ol>-->
				
						<div class="breadcrumbs">
						    <?php if(function_exists('bcn_display'))
						    {
						        bcn_display();
						    }?>
						</div>
						
							<div class="blog_box">
								<div class="blog_header">
									<h3><a href="<?php echo get_permalink();?>"><?php the_title();?></a></h3>
								</div>
								<div class="blog_body">
									<?php while ( have_posts() ) : the_post(); ?>

										<?php get_template_part( 'content', 'single' ); ?>

									<?php endwhile; // end of the loop. ?>
									
									<div class="row">
									<div class="blog_meta">
										
										<div class="blog_category col-sm-6">Category:
											<?php
											$categories = get_the_category();
											$separator = ' ';
											$output = '';
											if($categories){
												foreach($categories as $category) {
													$output .= '<a href="'.get_category_link( $category->term_id ).'" title="' . esc_attr( sprintf( __( "View all posts in %s" ), $category->name ) ) . '">'.$category->cat_name.'</a>'.$separator;
												}
											echo trim($output, $separator);
											}
											?>
										</div>
										
										<div class="blog_author col-sm-6">Posted by
										
											<?php the_author_posts_link(); ?>
											
											on <?php the_time('F j, Y') ?></div>
											
										<div class="clearfix"></div>
										<div class="blog_tag col-sm-12">											<?php the_tags(); ?>
										</div>
									</div>
									</div>
									
									<div class="blog_share">
										<!-- Go to www.addthis.com/dashboard to customize your tools -->
										<div class="addthis_custom_sharing"></div>
										
									</div>
								</div>
							</div>
							<!-- end of blog_box -->
							
							
							<div class="row">
								<div class="col-sm-3 ">
									<div class="load-more-div"><?php if(get_previous_post_link()) {previous_post_link( '%link','Previous Post' );} else {echo '<a class="none" href="#">Previous Post</a>';} ?></div>
								</div>
								
								<div class="col-sm-4 col-sm-offset-1">
									<div class="load-more-div"><a href="<?php echo home_url();?>">See All Posts</a></div>
								</div>
								
								
								<div class="col-sm-3 col-sm-offset-1">
									<div class="load-more-div"><?php if(get_next_post_link()) {next_post_link( '%link','Next Post' );} else {echo '<a class="none" href="#">Next Post</a>';} ?></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- end of featured-local-experiences-wrapper -->
		</div>
	</div>
<?php get_footer(); ?>