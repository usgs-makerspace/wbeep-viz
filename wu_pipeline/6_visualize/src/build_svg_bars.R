build_svg_bars <- function(svg_fp, wu_dat, wu_type_cd, season_info, svg_height, svg_width) {
  
  ##### Create whole SVG #####
  svg_root <- init_svg(viewbox_dims = c(-120, -5, svg_width+120, svg_height+40), id_keyword = sprintf("wu-bars-%s", wu_type_cd))
  
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
    
    season_fix <- gsub("[0-9]", "", season) # erase numbers used to denote winter 1 and winter 2
    max_wu <- max(wu_dat$wu_total)
    
    svg_root %>% 
      xml_add_child("g", id = sprintf("%sGroup",  season_fix), 
                    transform = translate_bars(svg_width, svg_height, 
                                               max(wu_dat$doy), max_wu)) %>%
      # Add path for the bars
      add_bar_path(season_data) %>% 
      # Add rectangle overtop for hovering
      add_hover_rect(season_data, id_nm = season_fix, max_wu) 
  }
  
  svg_root %>% add_y_axis(wu_dat, svg_height)
  svg_root %>% add_x_axis(wu_dat, svg_height, svg_width, season_info)
  
  ##### Write out final SVG to file #####
  
  xml2::write_xml(svg_root, file = svg_fp)
  
}

add_bar_path <- function(svg, wu_dat) {
  d <- build_path_from_counts(wu_dat, mx = min(wu_dat$doy-1))
  xml_add_child(svg, "path", d = d, class = "wu-bars")
}

add_hover_rect <- function(svg, wu_dat, id_nm, max_wu = NULL) {
  
  if(is.null(max_wu)) max_wu <- max(wu_dat$wu_total)
  start_doy <- min(wu_dat$doy)
  end_doy <- max(wu_dat$doy)
  
  # Build a rectangle shape around the data
  d <- sprintf("M%s,%s v%s h%s v%s Z", start_doy-1, 0, -max_wu, end_doy-start_doy+1, max_wu)
  
  xml_add_sibling(svg, "path", d = d, class = "wu-bars-hover",
                  id = id_nm)
}

add_y_axis <- function(svg, wu_dat, svg_height) {
  
  max_wu_val <- max(wu_dat$wu_total)
  
  # Create line segment for y axis with appropriate labels
  svg %>% 
    xml_add_child("g", id = "yAxis", translate = sprintf("translate(0 %s)", svg_height)) %>% 
    xml_add_child("path", class = "wu-bars-axis", d = sprintf("M0,0 v%s", svg_height)) %>% 
    xml_add_sibling("text", id = "yAxisLabelLow", class = "wu-bars-axis", `text-anchor`="end",
                    x = -20, y = svg_height - 2, "0") %>% 
    xml_add_sibling("text", id = "yAxisLabelHigh", class = "wu-bars-axis", `text-anchor`="end",
                    x = -20, y = 10, formatC(signif(max_wu_val, digits = 3), format = "d", big.mark = ",")) %>% 
    xml_add_sibling("text", id = "yAxisTitle", class = "wu-bars-axis", "Daily water use, mgd", `text-anchor`="middle",
                    transform=sprintf("rotate(-90) translate(-%s -20)", svg_height/2))
  
}

add_x_axis <- function(svg, wu_dat, svg_height, svg_width, season_info) {
  
  season_start_doy <- unlist(lapply(season_info, get_startDate_as_doy))
  season_end_doy <- unlist(lapply(season_info, get_endDate_as_doy))
  season_middle_doy <- colMeans(rbind(season_start_doy, season_end_doy), na.rm=TRUE)
  max_doy <- max(wu_dat$doy, na.rm=TRUE)
  scale_x_factor <- svg_width/max_doy # Needed to change x values rather than scaling which warps text
  
  y_pos_label <- 20 # distance below x axis to put y label
  
  svg %>% 
    xml_add_child("g", id = "xAxis", 
                  transform = sprintf("translate(0 %s)", svg_height)) %>%  
    xml_add_child("path", class = "wu-bars-axis", d = sprintf("M0,0 h%s", max_doy*scale_x_factor)) %>%
    xml_add_sibling("path", class = "wu-bars-axis", 
                    d = paste(sprintf("M%s,0 v10", head(season_end_doy*scale_x_factor, -1)), collapse=" ")) %>% 
    xml_add_sibling("text", class = "wu-bars-text seasonLabel", "Winter", 
                    transform = sprintf("translate(%s %s)", season_middle_doy[["winter1"]]*scale_x_factor, y_pos_label)) %>% 
    xml_add_sibling("text", class = "wu-bars-text seasonLabel", "Spring", 
                    transform = sprintf("translate(%s %s)", season_middle_doy[["spring"]]*scale_x_factor, y_pos_label)) %>% 
    xml_add_sibling("text", class = "wu-bars-text seasonLabel", "Summer", 
                    transform = sprintf("translate(%s %s)", season_middle_doy[["summer"]]*scale_x_factor, y_pos_label)) %>% 
    xml_add_sibling("text", class = "wu-bars-text seasonLabel", "Fall", 
                    transform = sprintf("translate(%s %s)", season_middle_doy[["fall"]]*scale_x_factor, y_pos_label)) %>% 
    xml_add_sibling("text", class = "wu-bars-text seasonLabel", "Winter", 
                    transform = sprintf("translate(%s %s)", season_middle_doy[["winter2"]]*scale_x_factor, y_pos_label))
  
}

translate_bars <- function(svg_width, svg_height, max_doy, max_wu) {
  sprintf("translate(0 %s) scale(%.5f %.5f)", 
          svg_height, 
          round_for_firefox(svg_width/max_doy), 
          round_for_firefox(svg_height/max_wu))
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

round_for_firefox <- function(val) {
  # Firefox couldn't handle anything smaller than e-5
  # If the value cannot be rounded to e-6, then fudge it.
  # These are small enough, that it shouldn't make that much of a difference.
  ifelse(round(val, 5) == 0, 0.00001, round(val, 5)) 
}

get_endDate_as_doy <- function(season_dates_list) {
  as.numeric(format(season_dates_list$endDates, "%j"))
}

get_startDate_as_doy <- function(season_dates_list) {
  as.numeric(format(season_dates_list$startDates, "%j"))
}
