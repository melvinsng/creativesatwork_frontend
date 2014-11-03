<?php
/**
 * The template for displaying archive pages.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package creativesatwork
 */
 

get_header(); ?>

	<div class="body_content">
		<div class="content-area no-padding">
			<!-- end of destinations-banner -->
			<div class="featured-local-experiences-wrapper">
				<div class="container">
					<div class="row title-area">
						<div class="col-sm-12">
							<h3>
					<?php
						if ( is_category() ) :
							single_cat_title();

						elseif ( is_tag() ) :
							single_tag_title();

						elseif ( is_author() ) :
							printf( __( 'Author: %s', 'globehop' ), '<span class="vcard">' . get_the_author() . '</span>' );

						elseif ( is_day() ) :
							printf( __( 'Day: %s', 'globehop' ), '<span>' . get_the_date() . '</span>' );

						elseif ( is_month() ) :
							printf( __( 'Month: %s', 'globehop' ), '<span>' . get_the_date( _x( 'F Y', 'monthly archives date format', 'globehop' ) ) . '</span>' );

						elseif ( is_year() ) :
							printf( __( 'Year: %s', 'globehop' ), '<span>' . get_the_date( _x( 'Y', 'yearly archives date format', 'globehop' ) ) . '</span>' );

						elseif ( is_tax( 'post_format', 'post-format-aside' ) ) :
							_e( 'Asides', 'globehop' );

						elseif ( is_tax( 'post_format', 'post-format-gallery' ) ) :
							_e( 'Galleries', 'globehop' );

						elseif ( is_tax( 'post_format', 'post-format-image' ) ) :
							_e( 'Images', 'globehop' );

						elseif ( is_tax( 'post_format', 'post-format-video' ) ) :
							_e( 'Videos', 'globehop' );

						elseif ( is_tax( 'post_format', 'post-format-quote' ) ) :
							_e( 'Quotes', 'globehop' );

						elseif ( is_tax( 'post_format', 'post-format-link' ) ) :
							_e( 'Links', 'globehop' );

						elseif ( is_tax( 'post_format', 'post-format-status' ) ) :
							_e( 'Statuses', 'globehop' );

						elseif ( is_tax( 'post_format', 'post-format-audio' ) ) :
							_e( 'Audios', 'globehop' );

						elseif ( is_tax( 'post_format', 'post-format-chat' ) ) :
							_e( 'Chats', 'globehop' );

						else :
							_e( 'Archives', 'globehop' );

						endif;
					?>
							</h3>
							<p class="filter-by-mood">
								<span class="title-desc">Category Archives</span>
								<div class="clearfix"></div>
							</p>
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
