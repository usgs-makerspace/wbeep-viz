summarize_wu <- function(wu_dat_per_huc) {
  wu_dat_per_huc %>% 
    mutate(doy = as.numeric(format(Date, "%j"))) %>% 
    group_by(doy) %>% 
    summarize(wu_total = sum(wu_val, na.rm = TRUE))
}

summarize_to_huc10 <- function(wu_dat_per_huc12) {
  wu_dat_per_huc12 %>%
    mutate(HUC10 = substr(HUC12, 1, 10)) %>% 
    group_by(HUC10, Date) %>% 
    summarize(wu_val = sum(wu_val)) %>% 
    ungroup()
}

summarize_per_season <- function(wu_dat, season_info) {
  wu_dat %>% 
    mutate(season = ifelse(
                 test = Date >= season_info[["spring"]]$startDates &
                   Date <= season_info[["spring"]]$endDates,
                 yes = "spring",
                 no = ifelse(
                   test = Date >= season_info[["summer"]]$startDates &
                     Date <= season_info[["summer"]]$endDates,
                   yes = "summer",
                   no = ifelse(
                     test = Date >= season_info[["fall"]]$startDates &
                       Date <= season_info[["fall"]]$endDates,
                     yes = "fall",
                     no = "winter"
                 )))) %>% 
    group_by(HUC10, season) %>% 
    summarize(wu_val = mean(wu_val, na.rm = TRUE))
}
  
