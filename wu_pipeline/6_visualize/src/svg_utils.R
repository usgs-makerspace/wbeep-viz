init_svg <- function(width = 8, height = 5, ppi = 72, id_keyword, is_pixels = FALSE) {
  # create the main "parent" svg node. This is the top-level part of the svg
  svg_root <- xml_new_root('svg', height = height, width = width, 
                           preserveAspectRatio="xMidYMid meet", id = sprintf("svg-%s", id_keyword),
                           xmlns="http://www.w3.org/2000/svg", `xmlns:xlink`="http://www.w3.org/1999/xlink", 
                           version="1.1")
  return(svg_root)
}

convert_hucs_to_svg <- function(huc_locations_sf, svg_width, huc_colname) {
  huc_locations_sf %>% 
    convert_coords_to_svg(svg_width, view_bbox = st_bbox(generate_usa_map_data())) %>%
    mutate(!!huc_colname := huc_locations_sf[[huc_colname]]) 
}

build_path_from_coords <- function(coords) {
  # Build path
  first_pt_x <- head(coords$x, 1)
  first_pt_y <- head(coords$y, 1)
  d <- sprintf("M%s %s %s Z", first_pt_x, head(coords$y, 1),
               paste0("L", c(tail(coords$x, -1), first_pt_x), " ", 
                      c(tail(coords$y, -1), first_pt_y), collapse = " "))
  return(d)
}

#TODO: might be able to use round() to simplify the SVG decimals used
convert_coords_to_svg <- function(sf_obj, svg_width, view_bbox = NULL) {
  
  coords <- st_coordinates(sf_obj)
  x_dec <- coords[,1]
  y_dec <- coords[,2]
  
  # Using the whole view, figure out coordinates
  # If view_bbox isn't provided, assume sf_obj is the whole view
  if(is.null(view_bbox)) view_bbox <- st_bbox(sf_obj)
  
  x_extent <- c(view_bbox$xmin, view_bbox$xmax)
  y_extent <- c(view_bbox$ymin, view_bbox$ymax)
  
  # Calculate aspect ratio
  aspect_ratio <- diff(x_extent)/diff(y_extent)
  
  # Figure out what the svg_height is based on svg_width, maintaining the aspect ratio
  svg_height <- svg_width / aspect_ratio
  
  # Convert longitude and latitude to SVG horizontal and vertical positions
  # Remember that SVG vertical position has 0 on top
  x_extent_pixels <- x_extent - view_bbox$xmin
  y_extent_pixels <- y_extent - view_bbox$ymin
  x_pixels <- x_dec - view_bbox$xmin # Make it so that the minimum longitude = 0 pixels
  y_pixels <- y_dec - view_bbox$ymin # Make it so that the maximum latitude = 0
  
  data.frame(
    x = approx(x_extent_pixels, c(0, svg_width), x_pixels)$y,
    y = approx(y_extent_pixels, c(svg_height, 0), y_pixels)$y
  )
}

generate_usa_map_data <- function(proj_str = NULL) {
  if(is.null(proj_str)) {
    # Albers Equal Area
    proj_str <- "+proj=aea +lat_1=29.5 +lat_2=45.5 +lat_0=37.5 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"
  }
  
  maps::map("usa", fill = TRUE, plot=FALSE) %>% 
    sf::st_as_sf() %>% 
    st_transform(proj_str)
}
