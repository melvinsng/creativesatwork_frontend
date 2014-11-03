<?php
/**
 * @package globehop
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">
		<div class="blog_feat_img">
			<?php the_post_thumbnail('full'); ?>
		</div>
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'globehop' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<div class="entry-footer">

		<?php edit_post_link( __( 'Edit', 'globehop' ), '<span class="edit-link">', '</span>' ); ?>
	</div><!-- .entry-footer -->
</article><!-- #post-## -->
