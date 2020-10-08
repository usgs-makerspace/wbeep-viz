build_svg_map <- function(svg_fp, wu_dat, svg_huc_locations, legend_size_dat, svg_height, svg_width, season, wu_type_cd, huc_colname = "HUC12") {
  
  ##### Create whole SVG #####
  svg_root <- init_svg(viewbox_dims = c(0, 0, svg_width, svg_height), id_keyword = paste(wu_type_cd, season, sep="-"))
  
  ##### Add the SVG nodes #####
  
  add_background_map(svg_root, svg_width)
  
  # Add HUC dots and size by water use values
  add_wu_points(svg_root, wu_dat, svg_huc_locations, season, wu_type_cd, huc_colname)

  # Add legend
  add_legend(svg_root, legend_size_dat, svg_width, svg_height, wu_type_cd)
  
  ##### Write out final SVG to file #####
  
  xml2::write_xml(svg_root, file = svg_fp)
  
}

add_wu_points <- function(svg, wu_dat, svg_huc_locations, season, wu_type_cd, huc_colname) {
  
  # Prepare dot locations for SVG land
  wu_dat_svg <- wu_dat %>% 
    left_join(svg_huc_locations, by = huc_colname) %>% 
    filter(!is.na(x), !is.na(y))
  
  # Add a group for all of these pts
  wu_dot_grp <- xml_add_child(svg, 'g', id = sprintf("wu-dots-%s-%s", wu_type_cd, season))
  
  # Create a new path for each stroke with. Place smaller "dots"
  # above bigger "dots" by ordering in reverse
  unique_widths <- sort(unique(wu_dat_svg$stroke_width), decreasing = TRUE)
  for(w in unique_widths) {
    wu_dat_w <- filter(wu_dat_svg, stroke_width == w) 
    add_wu_data(wu_dot_grp, wu_dat_w, w, class = sprintf("wu-dots-%s", wu_type_cd))
  }
  
}

add_background_dots <- function(svg, svg_pts) {
  # Add a group for all of these pts
  xml_add_child(svg, 'g', id = "bkgrd-dots-all") %>% 
  xml_add_child('path', 
                d = paste("M", svg_pts$x, " ",  svg_pts$y, "v0", collapse="", sep=''), 
                id="bkgrd-dots", class='bkgrd-dot',
                # style stuff will be CSS eventually
                style = "stroke-width:1; stroke: #bdbdbd; stroke-linecap: round; opacity: 0.7;")
}

add_wu_data <- function(svg, wu_dat, wu_grp, class) {
  xml_add_child(svg, 'path', 
                d = paste("M", wu_dat$x, " ",  wu_dat$y, "v0", collapse="", sep=''), 
                # style stuff is CSS except for stroke-width
                class = class,
                style = sprintf("stroke-width:%s", wu_grp))
}

add_background_map <- function(svg, svg_width) {
  map_data <- generate_usa_map_data(outline_states = TRUE)
  
  bkgrd_grp <- xml_add_child(svg, 'g', id = "bkgrd-map-grp")
  purrr::map(map_data$ID, function(polygon_id, map_data, svg_width) {
    d <- map_data %>% 
      filter(ID == polygon_id) %>% 
      convert_coords_to_svg(view_bbox = st_bbox(map_data), svg_width) %>% 
      build_path_from_coords()
    xml_add_child(bkgrd_grp, 'path', d = d, class='map-bkgrd')
  }, map_data, svg_width)
    
}

add_legend <- function(svg, legend_size_dat, svg_width, svg_height, wu_type_cd) {
  label_line_length <- 30 # Distance from circles to to draw a line for the text label
  
  # Add a group for all of these pts
  wu_legend <- xml_add_child(svg, 'g', id = "waterUseLegend", class = sprintf("%sLegend", wu_type_cd),
                             transform = sprintf("translate(%s,%s)", svg_width*0.15, svg_height*0.95))
  
  # Order data from greatest circle size to smallest so that they don't cover each other up
  legend_size_dat <- arrange(legend_size_dat, desc(radius))
  for(i in 1:nrow(legend_size_dat)) {
    add_circle_with_label(wu_legend, legend_size_dat$radius[i], legend_size_dat$legend_wu_val[i], label_line_length)
  }
  
  # Add miniscule dot to show that those values represent non-zero water use data
  y_pos_tiny_dot <- 10
  wu_legend %>% 
    xml_add_child('circle', cx = 0, cy = y_pos_tiny_dot, r = 1, style = "fill:#2c594f") %>% 
    xml_add_sibling('text', x = label_line_length*1.10, y = y_pos_tiny_dot, "< 1", style = "dominant-baseline:middle")
  
  # Add text above circles
  wu_legend %>% 
    xml_add_child('text', x = label_line_length/2, y = -max(legend_size_dat$radius)*2*1.50, 
                  "Water use, million gallons per day", style = "text-anchor:middle")
}

add_circle_with_label <- function(svg, r, label, label_line_length) {
  svg %>% 
    xml_add_child('circle', cx = 0, cy = -r, r = r, style = "fill:#2c594f;stroke:#000") %>% 
    xml_add_sibling('path', d = sprintf('M0 %s h%s', -r*2, label_line_length), style="stroke:#000") %>% 
    xml_add_sibling('text', x = label_line_length*1.10, y = -r*2, label, style = "dominant-baseline:middle")
}
