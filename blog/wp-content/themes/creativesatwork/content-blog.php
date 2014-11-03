							<div class="blog_box">
								<div class="blog_header">
									<h3><a href="<?php echo get_permalink();?>"><?php the_title();?></a></h3>
								</div>
								<div class="blog_feat_img">
									<?php the_post_thumbnail('full'); ?>
								</div>
								
								<div class="blog_body">
									
									<?php the_excerpt();?>
									
									<div class="blog_meta">
										<div class="blog_author">Posted by
											<?php the_author_posts_link(); ?> on <?php the_time('F j, Y') ?></div>
										<div class="blog_category">Category:
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
										<div class="clearfix"></div>
										<div class="blog_tag">
											<?php the_tags(); ?>
										</div>
									</div>
								</div>
							</div>