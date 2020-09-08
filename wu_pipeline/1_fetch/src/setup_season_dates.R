setup_season_dates <- function() {
  list(
    winter = list(
      startDates = as.Date(c("2015-01-01", "2015-12-01")),
      endDates = as.Date(c("2015-02-28", "2015-12-31"))
    ),
    spring = list(
      startDates = as.Date("2015-03-01"),
      endDates = as.Date("2015-05-31")
    ),
    summer = list(
      startDates = as.Date("2015-06-01"),
      endDates = as.Date("2015-08-31")
    ),
    fall = list(
      startDates = as.Date("2015-09-01"),
      endDates = as.Date("2015-11-30")
    )
  ) 
}
