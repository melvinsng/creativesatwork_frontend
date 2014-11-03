<?php
/**
 * The template for displaying 404 pages (not found).
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
									<h3><?php _e( 'Oops! That page can&rsquo;t be found.', 'globehop' ); ?></h3>
								</div>
								
								
								<section class="error-404 not-found">
									
					
									<div class="page-content">
										<p><?php _e( 'It looks like nothing was found at this location. Maybe try one of the links below.', 'globehop' ); ?></p>
					
										
					
										<?php the_widget( 'WP_Widget_Recent_Posts' ); ?>
					
										<?php if ( globehop_categorized_blog() ) : // Only show the widget if site has multiple categories. ?>
										<div class="widget widget_categories">
											<h2 class="widget-title"><?php _e( 'Most Used Categories', 'globehop' ); ?></h2>
											<ul>
											<?php
												wp_list_categories( array(
													'orderby'    => 'count',
													'order'      => 'DESC',
													'show_count' => 1,
													'title_li'   => '',
													'number'     => 10,
												) );
											?>
											</ul>
										</div><!-- .widget -->
										<?php endif; ?>
					
										<?php
											/* translators: %1$s: smiley */
											$archive_content = '<p>' . sprintf( __( 'Try looking in the monthly archives. %1$s', 'globehop' ), convert_smilies( ':)' ) ) . '</p>';
											the_widget( 'WP_Widget_Archives', 'dropdown=1', "after_title=</h3>$archive_content" );
										?>
					
										<?php the_widget( 'WP_Widget_Tag_Cloud' ); ?>
					
									</div><!-- .page-content -->
								</section><!-- .error-404 -->
											
								
								
								
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
