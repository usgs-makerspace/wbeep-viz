
# How to run the viz pipeline that builds the water use SVGs

Set working directory to the pipeline, then build the pipeline using `scipiper`. You may need to install some new packages first. You can see the packages used by looking at the top of each `.yml` file or you can try running `remake::install_missing_packages(instructions=TRUE)` to see what packages you need to install.

## First time building the full pipeline

You will need access to the appropriate ScienceBase items based on the ScienceBase IDs listed in `1_fetch_wu.yml` (denoted by `sbid_`). Then, you should be able to smoothly execute the pipeline.

```r
library(scipiper)
setwd("wu_pipeline")
scmake()
```

Commit the SVGs from `src/assets` to make sure that changes make it into the final viz.

## Rebuilding SVGs only

If you have already build the pipeline once, you may want to rebuild just the bar charts or just the map SVGs. Use the following to do that (sometimes pipeline doesn't see SVG maps as needing to rebuild, so this is a work around.)

```r
wu_types <- c("te", "ir", "ps")
seasons <- c("winter", "spring", "summer", "fall")

# Recreate bars:
scmake(sprintf("6_visualize/out/svg_bars_%s.svg", wu_types), force=TRUE)
scmake(sprintf("svg_bars_%s_copied", wu_types))

# Recreate maps
for(w in wu_types) {
  scmake(sprintf("6_visualize/out/svg_map_%s_%s.svg", w, seasons),
         sprintf("6_visualize_seasonal_map_tasks_%s.yml", w),
         force=TRUE)
}

for(w in wu_types) {
  scmake(sprintf("svg_map_%s_%s_copied", w, seasons),
         sprintf("6_visualize_seasonal_map_tasks_%s.yml", w))
}
```

Then, commit the SVG files that show up in `src/assets`.