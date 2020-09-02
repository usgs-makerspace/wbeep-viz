build_svg_map <- function(svg_fp, wu_dat, svg_huc_locations, svg_height, svg_width, season, wu_type_cd) {
  
  ##### Create whole SVG #####
  svg_root <- init_svg(svg_width, svg_height, id_keyword = paste(wu_type_cd, season, sep="-"), is_pixels = TRUE)
  
  ##### Add the SVG nodes #####
  
  add_background_map(svg_root, svg_width)
  
  # Add HUC dots and size by water use values
  add_wu_points(svg_root, wu_dat, svg_huc_locations, season, wu_type_cd)

  ##### Write out final SVG to file #####
  
  xml2::write_xml(svg_root, file = svg_fp)
  
}

add_wu_points <- function(svg, wu_dat, svg_huc_locations, season, wu_type_cd) {
  
  # Prepare dot locations for SVG land
  wu_dat_svg <- wu_dat %>% 
    left_join(svg_huc_locations, by = "HUC12")
  
  # Add a group for all of these pts
  wu_dot_grp <- xml_add_child(svg, 'g', id = sprintf("wu-dots-%s-%s", wu_type_cd, season))
  
  # Create a new path for each stroke with. Place smaller "dots"
  # above bigger "dots" by ordering in reverse
  unique_widths <- sort(unique(wu_dat_svg$stroke_width), decreasing = TRUE)
  for(w in unique_widths) {
    wu_dat_w <- filter(wu_dat_svg, stroke_width == w) 
    add_wu_data(wu_dot_grp, wu_dat_w, w)
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
                class = "wu-dots",
                style = sprintf("stroke-width:%s", wu_grp))
}

add_background_map <- function(svg, svg_width) {
  
  map_data <- maps::map("usa", fill = TRUE, plot=FALSE) %>% 
    sf::st_as_sf() %>% 
    st_transform("+proj=aea +lat_1=29.5 +lat_2=45.5 +lat_0=37.5 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs") %>% 
    convert_coords_to_svg(svg_width)
  
  # Build path
  first_pt_x <- head(map_data$x, 1)
  first_pt_y <- head(map_data$y, 1)
  d <- sprintf("M%s %s %s Z", first_pt_x, head(map_data$y, 1),
               paste0("L", c(tail(map_data$x, -1), first_pt_x), " ", 
                      c(tail(map_data$y, -1), first_pt_y), collapse = " "))
  
  xml_add_child(svg, 'g', id = "bkgrd-map-grp") %>% 
    xml_add_child('path', d = d, class='map-bkgrd')
}
