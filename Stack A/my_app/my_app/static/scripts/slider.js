createSlider = () => {
  const minYear = 1976;
  const maxYear = new Date().getFullYear();
  const sliderValue = 1976;
  initialiseSlider(minYear, maxYear, sliderValue);
};

updateSlider = response => {
  const mapSelection = $("#mapSelection").val();
  const minYear = mapSelection == "legalStatus" ? 1970 : 1976;
  const maxYear =
    response != undefined
      ? response.data[0].endingYear
      : new Date().getFullYear();
  const sliderValue =
    mapSelection == "legalStatus" ? 1970 : $(".ui.slider").slider("get value");

  initialiseSlider(minYear, maxYear, sliderValue);
};

initialiseSlider = (minYear, maxYear, sliderValue) => {
  $(".ui.slider").slider({
    min: minYear,
    max: maxYear,
    start: sliderValue,
    step: 1,
    //labelType: Number,
    showLabelTicks: true,
    autoAdjustLabels: false,
    labelDistance: 100,
    onChange: function(value, min, max) {
      // I would've preferred to use the existing function from the logic.js file (i.e. controlCurrentSelectionLogic)
      // and simply call it here, but it does not work due to some unknown error to do with jquery (which is what the slider is based on)
      const year = value;
      const checkboxSelection = $("input[name=level]:checked").val();
      const posteriorViewSelection = $(
        "input[type=checkbox].posterior-view:checked"
      ).val();
      const mapSelection = $("#mapSelection").val();

      clearResults();

      // this gigantic switch statement checks the current selection of the inputs on the map and then retrieves the relevant data based on that
      // i.e. if the user has selected 'Federal' and 'Sentences', the map will therefore show all sentences for Federal
      switch (mapSelection) {
        case "executions":
          switch (checkboxSelection) {
            case "state":
              if (posteriorViewSelection == "posterior-view") {
                getExecutionsMethodsOnStateLevelByYearPosteriously(year);
                getExecutionMethodsSummaryOnStateLevelByYearPosteriously(year);
              } else {
                getExecutionsMethodsOnStateLevelByYearNonPosteriously(year);
                getExecutionMethodsSummaryOnStateLevelByYearNonPosteriously(
                  year
                );
              }

              break;
            case "federal":
              if (posteriorViewSelection == "posterior-view") {
                getExecutionsMethodsOnFederalLevelByYearPosteriously(year);
                getExecutionMethodsSummaryOnFederalLevelByYearPosteriously(
                  year
                );
              } else {
                getExecutionsMethodsOnFederalLevelByYearNonPosteriously(year);
                getExecutionMethodsSummaryOnFederalLevelByYearNonPosteriously(
                  year
                );
              }

              break;
            case "military":
              if (posteriorViewSelection == "posterior-view") {
                getExecutionsMethodsOnMilitaryLevelByYearPosteriously(year);
                getExecutionMethodsSummaryOnMilitaryLevelByYearPosteriously(
                  year
                );
              } else {
                getExecutionsMethodsOnMilitaryLevelByYearNonPosteriously(year);
                getExecutionMethodsSummaryOnMilitaryLevelByYearNonPosteriously(
                  year
                );
              }

              break;
          }
          break;

        case "runningExecutions":
          switch (checkboxSelection) {
            case "state":
              getRunningExecutionMethodsSummaryTotalOnStateLevel(year);
              break;
            case "federal":
              getRunningExecutionMethodsSummaryTotalOnFederalLevel(year);
              break;
            case "military":
              getRunningExecutionMethodsSummaryTotalOnMilitaryLevel(year);
              break;
          }
          break;

        case "sentences":
          switch (checkboxSelection) {
            case "state":
              getSentencingRatesByYearOnStateLevel(year);
              break;
            case "federal":
              getSentencingRatesByYearOnFederalLevel(year);
              break;
            case "military":
              getSentencingRatesByYearOnMilitaryLevel(year);
              break;
          }
          break;

        case "runningSentences":
          switch (checkboxSelection) {
            case "state":
              getRunningSentencingRatesByYearOnStateLevel(year);
              break;
            case "federal":
              getRunningSentencingRatesByYearOnFederalLevel(year);
              break;
            case "military":
              getRunningSentencingRatesByYearOnMilitaryLevel(year);
              break;
          }
          break;
        case "legalStatus":
          switch (checkboxSelection) {
            case "state":
              getLegalStatusByYearOnStateLevel(year);
              break;
            case "federal":
              getLegalStatusByYearOnFederalLevel(year);
              break;
            case "military":
              getLegalStatusByYearOnMilitaryLevel(year);
              break;
          }
          break;
        case "deathRow":
          switch (checkboxSelection) {
            case "state":
              getDeathRowByYearOnStateLevel(year);
              break;
            case "federal":
              getDeathRowByYearOnFederalLevel(year);
              break;
            case "military":
              getDeathRowByYearOnMilitaryLevel(year);
              break;
          }
          break;

        case "runningDeathRow":
          switch (checkboxSelection) {
            case "state":
              getRunningDeathRowByYearOnStateLevel(year);
              break;
            case "federal":
              getRunningDeathRowByYearOnFederalLevel(year);
              break;
            case "military":
              getRunningDeathRowByYearOnMilitaryLevel(year);
              break;
          }
          break;

        case "innocence":
          switch (checkboxSelection) {
            case "state":
              getInnocenceByYearOnStateLevel(year);
              break;
            case "federal":
              getInnocenceByYearOnFederalLevel(year);
              break;
            case "military":
              getInnocenceByYearOnMilitaryLevel(year);
              break;
          }
          break;

        case "runningInnocence":
          switch (checkboxSelection) {
            case "state":
              getRunningInnocenceByYearOnStateLevel(year);
              break;
            case "federal":
              getRunningInnocenceByYearOnFederalLevel(year);
              break;
            case "military":
              getRunningInnocenceByYearOnMilitaryLevel(year);
              break;
          }
          break;
      }

      getOpinionRatesByYear(year);
    }
  });
};
