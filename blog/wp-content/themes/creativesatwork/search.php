<?php
/**
 * The template for displaying search results pages.
 *
 * @package globehop
 */

get_header(); ?>

	<div class="body_content">
		<div class="content-area no-padding">
			<!-- end of destinations-banner -->
			<div class="featured-local-experiences-wrapper">
				<div class="container">
					<div class="row title-area">
						<div class="col-sm-12">
							<h3>SEARCH</h3>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-8 col-sm-offset-2">
							<?php if ( have_posts() ) : ?>
							<?php while ( have_posts() ) : the_post(); ?>

								<?php
									get_template_part( 'content', 'blog' );
								?>

							<?php endwhile; ?>
							<div class="row">
								<div class="col-sm-3 ">
									<div class="load-more-div"><?php if(get_previous_posts_link()) {previous_posts_link( 'Previous Page' );} else {echo '<a class="none" href="#">Previous Page</a>';} ?></div>
								</div>
								<div class="col-sm-3 pull-right">
									<div class="load-more-div"><?php if(get_next_posts_link()) {next_posts_link( 'Next Page' );} else {echo '<a class="none" href="#">Next Page</a>';} ?></div>
								</div>
							</div>
							<?php else : ?>

								<?php get_template_part( 'content', 'none' ); ?>

							<?php endif; ?>
							<!-- end of blog_box -->
						</div>
					</div>
				</div>
			</div>
			<!-- end of featured-local-experiences-wrapper -->
		</div>
	</div>
<?php get_footer(); ?>
