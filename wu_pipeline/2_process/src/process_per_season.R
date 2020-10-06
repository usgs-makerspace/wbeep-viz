filter_to_season <- function(wu_dat, season_nm) {
  wu_dat %>% filter(season == season_nm) 
}

join_wu_to_huc_centroids <- function(wu_dat, huc_sf, huc_colname = "HUC12") {
  stopifnot(length(unique(wu_dat$season)) == 1)
  huc_sf %>% left_join(wu_dat, by = huc_colname) %>% filter(!is.na(wu_val))
}

calc_wu_type_max <- function(wu_dat) {
  max(wu_dat$wu_val, na.rm=TRUE)
}

prep_wu_data_for_map <- function(wu_dat, wu_type_max, stroke_width_range = c(2, 40)) {
  
  # Scale area with water use. Stroke-width == diameter of "circle"
  # Idea communicated here: https://github.com/usgs-makerspace/makerspace-sandbox/issues/650#issuecomment-703882213
  area_range <- pi*(stroke_width_range/2)^2
  wu_to_area <- approx(c(0, wu_type_max), area_range, wu_dat$wu_val)$y
  wu_to_widths <- sqrt(4*wu_to_area/pi)
  
  # Now add to data and remove NAs
  wu_dat %>% 
    # TODO: rounding to 0 digits, will remove ~150 dots for the winter date,
    # but would simplify the number of paths from 136 to 33 which could
    # improve speed
    mutate(stroke_width = round(wu_to_widths, digits = 1)) %>% 
    filter(wu_val != 0) # Don't keep 0s - no need to draw them
}
