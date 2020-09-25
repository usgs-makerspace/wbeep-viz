make_seasonal_maps <- function(seasons, wu_type_cd = c("te", "ir"), isHUC10 = FALSE, ...) {
  
  ##### Define steps #####
  
  # Step 1: filter all WU data to single date
  filter_step <- create_task_step(
    step_name = 'filter',
    target_name = function(task_name, step_name, ...) {
      sprintf("wu_%s_%s", wu_type_cd, task_name)
    },
    command = function(task_name, ...) {
      sprintf("filter_to_season(wu_%s_seasonal_avg, I('%s'))", 
              wu_type_cd, task_name)
    }
  )
  
  # Step 2: join WU data to spatial HUC locations
  joinspatial_step <- create_task_step(
    step_name = 'joinspatial',
    target_name = function(task_name, step_name, ...) {
      sprintf("wu_%s_%s_sf", wu_type_cd, task_name)
    },
    command = function(steps, ...) {
      sprintf("join_wu_to_huc_centroids(%s, %s_centroids, I('%s'))", steps[["filter"]]$target_name,
              ifelse(isHUC10, "huc10", "huc12"), ifelse(isHUC10, "HUC10", "HUC12"))
    }
  )
  
  # Step 3: prep the WU data for the SVG map
  prepdatasvg_step <- create_task_step(
    step_name = 'prepdatasvg',
    target_name = function(task_name, step_name, ...) {
      sprintf("wu_%s_%s_svg_ready", wu_type_cd, task_name)
    },
    command = function(steps, ...) {
      sprintf("prep_wu_data_for_map(%s, wu_%s_max)", steps[["joinspatial"]]$target_name, wu_type_cd)
    }
  )
  
  # Step 4: build and save the SVG map
  buildsvg_step <- create_task_step(
    step_name = 'buildsvg',
    target_name = function(task_name, step_name, ...) {
      sprintf("6_visualize/out/svg_map_%s_%s.svg", wu_type_cd, task_name)
    },
    command = function(steps, task_name, ...) {
      psprintf("build_svg_map(", 
               "target_name,",
               "wu_dat = %s," = steps[["prepdatasvg"]]$target_name,
               "svg_huc_locations,",
               "svg_height_map,",
               "svg_width_map,",
               "wu_type_cd = I('%s')," = wu_type_cd,
               "season = I('%s')," = task_name,
               "huc_colname = I('%s'))" = ifelse(isHUC10, "HUC10", "HUC12"))
    }
  )
  
  # Step 5: copy the SVG map to the location where Vue needs it
  copysvg_step <- create_task_step(
    step_name = 'copysvg',
    target_name = function(task_name, step_name, ...) {
      sprintf("svg_map_%s_%s_copied", wu_type_cd, task_name)
    },
    command = function(steps, task_name, ...) {
      psprintf("file.copy(",
               "from = '%s'," = steps[["buildsvg"]]$target_name,
               "to = I('../src/assets/wuMapSVGs/svg_map_%s_%s.svg')," = c(wu_type_cd, task_name),
               "overwrite = TRUE)")
    }
  )
  
  ##### Create the task plan #####
  
  task_plan <- create_task_plan(
    task_names = seasons,
    task_steps = list(filter_step, joinspatial_step, prepdatasvg_step, buildsvg_step, copysvg_step),
    final_steps = c('buildsvg'),
    add_complete = FALSE)
  
  ##### Create task makefile #####
  task_makefile <- sprintf('6_visualize_seasonal_map_tasks_%s.yml', wu_type_cd)
  final_target <- sprintf('6_visualize/out/seasonal_maps_%s.yml', wu_type_cd)
  
  create_task_makefile(
    task_plan = task_plan,
    makefile = task_makefile,
    include = c('1_fetch_wu.yml', '2_process_wu.yml', '6_visualize_wu.yml'),
    sources = c(...),
    packages = c('sf', 'dplyr', 'xml2'),
    final_targets = final_target,
    as_promises = TRUE)
  
  ##### Build the tasks #####
  loop_tasks(task_plan = task_plan, task_makefile = task_makefile, num_tries = 1)
  
  ##### Return the filenames that were built #####
  
  seasonal_map_files <- yaml::yaml.load_file(final_target) %>%
    tibble::enframe(name = 'filename', value = 'hash') %>%
    mutate(hash = purrr::map_chr(hash, `[[`, 1))
  
  return(seasonal_map_files)
  
}
