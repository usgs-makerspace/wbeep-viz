init_svg <- function(viewbox_dims, id_keyword) {
  # create the main "parent" svg node. This is the top-level part of the svg
  svg_root <- xml_new_root('svg', viewBox = paste(viewbox_dims, collapse=" "), 
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
    x = round(approx(x_extent_pixels, c(0, svg_width), x_pixels)$y, 6),
    y = round(approx(y_extent_pixels, c(svg_height, 0), y_pixels)$y, 6)
  )
}

generate_usa_map_data <- function(proj_str = NULL, outline_states = FALSE) {
  if(is.null(proj_str)) {
    # Albers Equal Area
    proj_str <- "+proj=aea +lat_1=29.5 +lat_2=45.5 +lat_0=37.5 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs"
  }
  
  usa_sf <- maps::map("usa", fill = TRUE, plot=FALSE) %>%
    sf::st_as_sf() %>% 
    st_transform(proj_str) %>% 
    st_buffer(0) 
  
  if(outline_states) usa_sf <- use_state_outlines(usa_sf, proj_str)
  
  return(usa_sf)
}

use_state_outlines <- function(usa_border_sf, proj_str) {
  
  # Need to remove islands from state outlines and then add back in 
  # later so that they can be drawn as individual polygons. Otherwise,
  # drawn with the state since the original state maps data only has 1
  # ID per state.
  
  usa_islands_sf <- usa_border_sf %>% filter(ID != "main")
  usa_addl_islands_sf <- generate_addl_islands(proj_str)
  usa_mainland_sf <- usa_border_sf %>% 
    filter(ID == "main") %>% 
    st_erase(usa_addl_islands_sf) 

  maps::map("state", fill = TRUE, plot=FALSE) %>%
    sf::st_as_sf() %>%
    st_transform(proj_str) %>%
    st_buffer(0) %>% 
    # Get rid of islands from state outline data
    st_intersection(usa_mainland_sf) %>%
    select(-ID.1) %>% # st_intersection artifact that is unneeded
    # Add islands back in as separate polygons from states
    bind_rows(usa_islands_sf) %>%
    bind_rows(usa_addl_islands_sf) %>%
    st_buffer(0) %>% 
    st_cast("MULTIPOLYGON") %>% # Needed to bring back to correct type to use st_coordinates
    rmapshaper::ms_simplify(0.5)
    
  
  # st_read("tl_2019_us_state.shp") %>% 
  #   st_transform(proj_str) %>% 
  #   st_intersection(usa_sf) %>% 
  #   rmapshaper::ms_simplify(0.01) %>% 
  #   mutate(ID = NAME)
  
}

generate_addl_islands <- function(proj_str) {
  # These are not called out specifically as islands in the maps::map("usa") data
  # but cause lines to be drawn across the map if not treated separately. This creates those shapes.
  
  # Counties to be considered as separate polygons
  
  separate_polygons <- list(
    `upper penninsula` = list(
      state = "michigan",
      counties = c(
        "alger",
        "baraga",
        "chippewa",
        "delta",
        "dickinson",
        "gogebic",
        "houghton",
        "iron",
        "keweenaw",
        "luce",
        "mackinac",
        "marquette",
        "menominee",
        "ontonagon",
        "schoolcraft"
      )),
    `eastern shore` = list(
      state = "virginia",
      counties = c(
        "accomack",
        "northampton"
      )),
    # TODO: borders still slightly wonky bc it doesn't line up with counties perfectly. 
    `nags head` = list(
      state = "north carolina",
      counties = c(
        "currituck"
    )),
    # This + simplifying to 0.5 took care of the weird line across NY
    `staten island` = list(
      state = "new york",
      counties = c(
        "richmond"
    )))
  
  purrr::map(names(separate_polygons), function(nm) {
    maps::map("county", fill = TRUE, plot=FALSE) %>%
      sf::st_as_sf() %>%
      st_transform(proj_str) %>% 
      st_buffer(0) %>%
      filter(ID %in% sprintf("%s,%s", separate_polygons[[nm]][["state"]],
                             separate_polygons[[nm]][["counties"]])) %>% 
      mutate(ID = nm) 
  }) %>% 
    bind_rows() %>% 
    group_by(ID) %>% 
    summarize(geom = st_union(geom))
}

list_state_counties <- function(state_abbr) {
  tolower(gsub(" County", "", countyCd$COUNTY_NAME[which(countyCd$STUSAB == state_abbr)]))
}

st_erase <- function(x, y) st_difference(x, st_union(st_combine(y)))
