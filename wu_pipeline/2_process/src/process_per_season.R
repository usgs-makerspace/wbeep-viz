filter_to_season <- function(wu_dat, season_nm) {
  wu_dat %>% filter(season == season_nm) 
}

join_wu_to_huc_centroids <- function(wu_dat, huc_sf, huc_colname = "HUC12") {
  stopifnot(length(unique(wu_dat$Date)) == 1)
  huc_sf %>% left_join(wu_dat, by = huc_colname)
}

prep_wu_data_for_map <- function(wu_dat, stroke_width_range = c(2, 60)) {
  
  wu_to_widths <- approx(c(0, max(wu_dat$wu_val, na.rm=TRUE)), stroke_width_range, wu_dat$wu_val)$y
  
  # Now add to data and remove NAs
  wu_dat %>% 
    # TODO: rounding to 0 digits, will remove ~150 dots for the winter date,
    # but would simplify the number of paths from 136 to 33 which could
    # improve speed
    mutate(stroke_width = round(wu_to_widths, digits = 1)) %>% 
    filter(!is.na(wu_val)) %>% 
    filter(stroke_width != 0) # Don't keep 0s - no need to draw them
}
