summarize_wu <- function(wu_dat_per_huc) {
  wu_dat_per_huc %>% 
    mutate(doy = as.numeric(format(Date, "%j"))) %>% 
    group_by(doy) %>% 
    summarize(wu_total = sum(wu_val, na.rm = TRUE))
}
