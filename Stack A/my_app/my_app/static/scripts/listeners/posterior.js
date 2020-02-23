// adds event listener to the posterior view checkbox
document.addDelegatedListener("click", "input[name='posterior']", function(
  event
) {
  const posteriorViewSelection = $(
    "input[type=checkbox].posterior-view:checked"
  ).val();
  const levelSelection = $("input[type=radio]:checked").val();
  const year = $(".ui.slider").slider("get value");
  const mapSelection = $("#mapSelection").val();

  if (posteriorViewSelection == "posterior-view") {
    if (mapSelection === "executions") {
      switch (levelSelection) {
        case "state":
          clearResults();
          getSliderYearsOnStateLevelPosteriously();
          getExecutionsMethodsOnStateLevelByYearPosteriously(year);
          break;
        case "federal":
          clearResults();
          getSliderYearsOnFederalLevelPosteriously();
          getExecutionsMethodsOnFederalLevelByYearPosteriously(year);
          break;
        case "military":
          clearResults();
          getSliderYearsOnMilitaryLevelPosteriously();
          getExecutionsMethodsOnMilitaryLevelByYearPosteriously(year);
          break;
      }
    } else if (mapSelection === "runningExecutions") {
      switch (levelSelection) {
        case "state":
          clearResults();
          getSliderYearsOnStateLevelPosteriously();
          getRunningExecutionMethodsSummaryTotalOnStateLevel(year);
          break;
        case "federal":
          clearResults();
          getSliderYearsOnFederalLevelPosteriously();
          getRunningExecutionMethodsSummaryTotalOnFederalLevel(year);
          break;
        case "military":
          clearResults();
          getSliderYearsOnMilitaryLevelPosteriously();

          getRunningExecutionMethodsSummaryTotalOnMilitaryLevel(year);
          break;
      }
    }
  } /*else {
    switch (levelSelection) {
      case "state":
        clearResults();
        updateSlider();
        getExecutionsMethodsOnStateLevelByYearNonPosteriously(year);
        break;
      case "federal":
        clearResults();
        updateSlider();
        getExecutionsMethodsOnFederalLevelByYearNonPosteriously(year);
        break;
      case "military":
        clearResults();
        updateSlider();
        getExecutionsMethodsOnMilitaryLevelByYearNonPosteriously(year);
        break;
    }
  }*/
});
