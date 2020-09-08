build_svg_bars <- function(svg_fp, wu_dat, wu_type_cd, season_info, svg_height, svg_width) {
  
  ##### Create whole SVG #####
  svg_root <- init_svg(svg_width, svg_height, id_keyword = sprintf("wu-bars-%s", wu_type_cd), is_pixels = TRUE)
  
  ##### Add the SVG nodes #####
  
  # One group per season
  
  for(season in names(season_info)) {
    
    doy_list <- lapply(season_info[[season]], function(dates) {
      as.numeric(format(dates, "%j"))
    })
    
    season_data <- wu_dat %>% 
      filter( 
        if(length(doy_list$startDates) > 1) 
          doy >= doy_list$startDates[1] & doy <= doy_list$endDates[1] |
          doy >= doy_list$startDates[2] & doy <= doy_list$endDates[2] 
        else
          doy >= doy_list$startDates[1] & doy <= doy_list$endDates[1]
      )
    
    max_wu <- max(wu_dat$wu_total)
    
    svg_root %>% 
      xml_add_child("g", id = sprintf("%sGroup", season),
                    transform = sprintf("translate(0 %s) scale(%s %s)", 
                                        svg_height, 
                                        svg_width/max(wu_dat$doy), 
                                        svg_height/max_wu)) %>% 
      # Add path for the bars
      add_bar_path(season_data) %>% 
      # Add rectangle overtop for hovering
      add_hover_rect(season_data, max_wu)
  }
  
  
  
  ##### Write out final SVG to file #####
  
  xml2::write_xml(svg_root, file = svg_fp)
  
}

add_bar_path <- function(svg, wu_dat) {
  d <- build_path_from_counts(wu_dat, mx = min(wu_dat$doy-1))
  xml_add_child(svg, "path", d = d, class = "wu-bars")
}

add_hover_rect <- function(svg, wu_dat, max_wu = NULL) {
  
  if(is.null(max_wu)) max_wu <- max(wu_dat$wu_total)
  start_doy <- min(wu_dat$doy)
  end_doy <- max(wu_dat$doy)
  
  # Build a rectangle shape around the data
  d <- sprintf("M%s,%s v%s h%s v%s Z", start_doy-1, 0, -max_wu, end_doy-start_doy, max_wu)
  
  xml_add_sibling(svg, "path", d = d, class = "wu-bars-hover")
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
