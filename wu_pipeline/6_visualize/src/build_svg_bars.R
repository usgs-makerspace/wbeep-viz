build_svg_bars <- function(svg_fp, wu_dat, wu_type_cd, svg_height, svg_width) {
  
  ##### Create whole SVG #####
  svg_root <- init_svg(svg_width, svg_height, id_keyword = sprintf("wu-bars-%s", wu_type_cd), is_pixels = TRUE)
  
  ##### Add the SVG nodes #####
  
  # Add path for the bars
  add_bar_path(svg_root, wu_dat, svg_height, 
               scale_x = svg_width/max(wu_dat$doy),
               scale_y = svg_height/max(wu_dat$wu_total))
  
  ##### Write out final SVG to file #####
  
  xml2::write_xml(svg_root, file = svg_fp)
  
}

add_bar_path <- function(svg, wu_dat, svg_height, scale_x = 1, scale_y = 1) {
  d <- build_path_from_counts(wu_dat)
  xml_add_child(svg, "path", d = d, 
                class = "wu-bars",
                transform = sprintf("translate(0 %s) scale(%s %s)", svg_height, scale_x, scale_y))
}

build_path_from_counts <- function(wu_dat, mx = 0, my = 0) {
  # Assumes 1 day = 1 pixel (x direction) & 1 MGD = 1 pixel (y direction)
  dat_bars <- wu_dat %>% ungroup() %>% mutate(v = wu_total - lead(wu_total, 1))
  
  v_vec <- c(-head(dat_bars$wu_total, 1), # first vertical distance is the first bar's height but negative to move up
             head(dat_bars$v, -1), # remove the last v bc it will just be NA since there is no `lead` value on the last one
             tail(dat_bars$wu_total, 1)) # add in height of last bar to get back to baseline, positive to move down 
  v_vec <- round(v_vec)
  # Build path string with equal widths
  hv_path_str <- paste(paste0("v", v_vec), collapse = sprintf(" h%s ", 1)) # v=vertical, h=horizontal
  sprintf('M%s,%s %sZ', mx, my, hv_path_str)
}
