download_gdb <- function(target_name, gdb_zip_url, gdb_file) {
  
  temp_zip <- file.path(tempdir(), basename(gdb_zip_url))
  temp_gdb <- file.path(temp_zip, gdb_file)
  download.file(gdb_zip_url, destfile = temp_zip)
  
  # CANNOT GET UNZIPPING TO HAPPEN SMARTLY.
  # MANUAL STEP REQUIRED
  manually_unzip_file(target_name, temp_gdb)
  
  return(target_name)
}
