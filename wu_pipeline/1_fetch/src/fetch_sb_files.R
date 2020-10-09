download_sb_single_file <- function(target_name, sb_id, sb_filename, dummy, user_specific = FALSE) {
  
  sb_check_login(user_specific) # some of these SB items are locked down to specific users right now
  
  item_file_download(
    sb_id, 
    names = sb_filename, 
    destinations = target_name, 
    overwrite_file = TRUE)
  
}

sb_check_login <- function(user_specific) {
  if (!sbtools::is_logged_in()){
    if(user_specific) {
      user <- readline(prompt = "Enter SB username:")
      pw <- rstudioapi::askForPassword()
      sbtools::authenticate_sb(username = user, password = pw)
    } else {
      sb_secret <- dssecrets::get_dssecret("cidamanager-sb-srvc-acct")
      sbtools::authenticate_sb(username = sb_secret$username, password = sb_secret$password)
    }
  }
}

manually_unzip_file <- function(target_name, zipped_fn) {
  readline(prompt = sprintf("Please manually unzip `%s` to `%s`.\nPress enter when done to let the pipeline continue.", 
                            zipped_fn, target_name))
}

unzip_file <- function(target_name, zipped_fn, file_to_extract) {
  unzipped_fn <- unzip(zipped_fn, files = file_to_extract, exdir = dirname(target_name))
  file.rename(unzipped_fn, target_name)
}
