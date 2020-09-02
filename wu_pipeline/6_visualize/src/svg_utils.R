init_svg <- function(width = 8, height = 5, ppi = 72, id_keyword, is_pixels = FALSE) {
  view_box <- sprintf("0 0 %s %s", ifelse(is_pixels, width, width*ppi), ifelse(is_pixels, height, height*ppi))
  # create the main "parent" svg node. This is the top-level part of the svg
  svg_root <- xml_new_root('svg', viewBox = view_box, preserveAspectRatio="xMidYMid meet", id = sprintf("svg-%s", id_keyword),
                           xmlns="http://www.w3.org/2000/svg", `xmlns:xlink`="http://www.w3.org/1999/xlink", 
                           version="1.1")
  return(svg_root)
}

convert_hucs_to_svg <- function(huc_locations_sf, svg_width) {
  huc_locations_sf %>% 
    convert_coords_to_svg(svg_width) %>% 
    mutate(HUC12 = huc_locations_sf$HUC12)
}

#TODO: might be able to use round() to simplify the SVG decimals used
#TODO: one path element per polygon
convert_coords_to_svg <- function(sf_obj, svg_width) {
  
  coords <- st_coordinates(sf_obj)
  x_dec <- coords[,1]
  y_dec <- coords[,2]
  
  # Calculate aspect ratio
  aspect_ratio <- diff(range(x_dec))/diff(range(y_dec))
  
  # Figure out what the svg_height is based on svg_width, maintaining the aspect ratio
  svg_height <- svg_width / aspect_ratio
  
  # Convert longitude and latitude to SVG horizontal and vertical positions
  # Remember that SVG vertical position has 0 on top
  x_pixels <- (x_dec - min(x_dec)) # Make it so that the minimum longitude = 0 pixels
  y_pixels <- (y_dec - min(y_dec)) # Make it so that the maximum latitude = 0
  
  data.frame(
    x = approx(range(x_pixels), c(0, svg_width), x_pixels)$y,
    y = approx(range(y_pixels), c(svg_height, 0), y_pixels)$y
  )
}
