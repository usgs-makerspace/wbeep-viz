read_and_parse_huc10 <- function(huc10_fn) {
  geojson_sf(huc10_fn) %>% 
    st_make_valid() %>% 
    select(HUC10 = huc10, NAME = name, geometry) %>% 
    st_transform("+proj=aea +lat_1=29.5 +lat_2=45.5 +lat_0=37.5 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs")
}

read_and_parse_wu <- function(filepath, is_irr = FALSE, is_ps = FALSE) {
  
  # Columns have different names between water use types
  col_name <- ifelse(is_irr, "HUC_12t", "huc12")
  col_name <- ifelse(is_ps, "HUC12t", col_name) # PS huc12 col was in sci notation...
  col_prefix <- ifelse(is_ps, "C", "W_") # PS just has "C" as the prefix due to an error but is withdrawal values
  date_format <- ifelse(is_ps, "%m_%d_%Y", "%m-%d-%Y")
  
  readr::read_csv(filepath) %>% 
    rename(HUC12 = !!col_name) %>% # Columns have different names between water use types
    mutate(HUC12 = gsub("[^0-9]", "", HUC12)) %>% # For PS, had to use HUC12t which had characters around it
    mutate(HUC12 = zeroPad(HUC12, 12)) %>% # Many of the HUCs were missing leading 0s ... :(
    # Starts in wide format with a column for each day of the year. 
    tidyr::pivot_longer(cols = starts_with(col_prefix), names_to = "prefixdate", values_to = "wu_val") %>% 
    mutate(Date = as.Date(gsub(col_prefix, "", prefixdate), format = date_format)) %>% 
    select(HUC12, Date, wu_val) %>% 
    # Convert from cubic meters per day to million gal per day
    mutate(wu_val = convert_m3d_to_mgd(wu_val))
  
}

convert_m3d_to_mgd <- function(vals_m3s) {
  # m3 to gal: 1 m3 = 264.172 gallons
  # convert to millions of gallons by dividing by 10^6
  vals_m3s * 264.172 / 10^6
}
