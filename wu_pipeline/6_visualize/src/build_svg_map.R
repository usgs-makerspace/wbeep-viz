build_svg_map <- function(svg_fp, wu_dat, svg_huc_locations, svg_height, svg_width, season, wu_type_cd, huc_colname = "HUC12") {
  
  ##### Create whole SVG #####
  svg_root <- init_svg(svg_width, svg_height, id_keyword = paste(wu_type_cd, season, sep="-"), is_pixels = TRUE)
  
  ##### Add the SVG nodes #####
  
  add_background_map(svg_root, svg_width)
  
  # Add HUC dots and size by water use values
  add_wu_points(svg_root, wu_dat, svg_huc_locations, season, wu_type_cd, huc_colname)

  ##### Write out final SVG to file #####
  
  xml2::write_xml(svg_root, file = svg_fp)
  
}

add_wu_points <- function(svg, wu_dat, svg_huc_locations, season, wu_type_cd, huc_colname) {
  
  # Prepare dot locations for SVG land
  wu_dat_svg <- wu_dat %>% 
    left_join(svg_huc_locations, by = huc_colname)
  
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
  map_data <- generate_usa_map_data()
  
  bkgrd_grp <- xml_add_child(svg, 'g', id = "bkgrd-map-grp")
  purrr::map(map_data$ID, function(polygon_id, map_data, svg_width) {
    d <- map_data %>% 
      filter(ID == polygon_id) %>% 
      convert_coords_to_svg(view_bbox = st_bbox(map_data), svg_width) %>% 
      build_path_from_coords()
    xml_add_child(bkgrd_grp, 'path', d = d, class='map-bkgrd')
  }, map_data, svg_width)
    
}
