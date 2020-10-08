
get_legend_wu_sizes <- function(wu_type_cd) {
  if(wu_type_cd == "te") {
    legend_wu_val <- c(170, 670, 2700)
  } else if(wu_type_cd == "ir") {
    legend_wu_val <- c(130,520,2100)
  } else if(wu_type_cd == "ps") {
    legend_wu_val <- c(25, 100, 400)
  }
  data.frame(radius = c(5, 10, 20), legend_wu_val = legend_wu_val)
}
