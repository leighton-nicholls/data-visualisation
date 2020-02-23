controlCurrentSelectionLogic = () => {
  const mapSelection = $("#mapSelection").val();
  const levelSelection = $("input[type=radio]:checked").val();
  const posteriorViewSelection = $(
    "input[type=checkbox].posterior-view:checked"
  ).val();
  const year = $(".ui.slider").slider("get value");

  clearResults();

  // this gigantic switch statement checks the current selection of the inputs on the map and then retrieves the relevant data based on that
  // i.e. if the user has selected 'Federal' and 'Sentences', the map will therefore show all sentences for Federal
  switch (mapSelection) {
    case "executions":
      $(".posterior-view").length === 0 && generateCheckbox();
      switch (levelSelection) {
        case "state":
          if (posteriorViewSelection == "posterior-view") {
            getSliderYearsOnStateLevelPosteriously();
            getExecutionsMethodsOnStateLevelByYearPosteriously(year);
            getExecutionMethodsSummaryOnStateLevelByYearPosteriously(year);
          } else {
            updateSlider();
            getExecutionsMethodsOnStateLevelByYearNonPosteriously(year);
            getExecutionMethodsSummaryOnStateLevelByYearNonPosteriously(year);
          }
          break;
        case "federal":
          if (posteriorViewSelection == "posterior-view") {
            getSliderYearsOnFederalLevelPosteriously();
            getExecutionsMethodsOnFederalLevelByYearPosteriously(year);
            getExecutionMethodsSummaryOnFederalLevelByYearPosteriously(year);
          } else {
            updateSlider();
            getExecutionsMethodsOnFederalLevelByYearNonPosteriously(year);
            getExecutionMethodsSummaryOnFederalLevelByYearNonPosteriously(year);
          }
          break;
        case "military":
          if (posteriorViewSelection == "posterior-view") {
            getSliderYearsOnMilitaryLevelPosteriously();
            getExecutionsMethodsOnMilitaryLevelByYearPosteriously(year);
            getExecutionMethodsSummaryOnMilitaryLevelByYearPosteriously(year);
          } else {
            updateSlider();
            getExecutionsMethodsOnMilitaryLevelByYearNonPosteriously(year);
            getExecutionMethodsSummaryOnMilitaryLevelByYearNonPosteriously(
              year
            );
          }
          break;
      }
      break;
    case "runningExecutions":
      $(".posterior-view").length === 0 && generateCheckbox();
      switch (levelSelection) {
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
      clearElement("posterior-view");
      updateSlider();

      switch (levelSelection) {
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
      clearElement("posterior-view");
      updateSlider();

      switch (levelSelection) {
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
      switch (levelSelection) {
        case "state":
          updateSlider();
          getLegalStatusByYearOnStateLevel(year);
          break;
        case "federal":
          updateSlider();
          getLegalStatusByYearOnFederalLevel(year);
          break;
        case "military":
          updateSlider();
          getLegalStatusByYearOnMilitaryLevel(year);
          break;
      }
      break;
    case "deathRow":
      switch (levelSelection) {
        case "state":
          updateSlider();
          getDeathRowByYearOnStateLevel(year);
          break;
        case "federal":
          updateSlider();
          getDeathRowByYearOnFederalLevel(year);
          break;
        case "military":
          updateSlider();
          getDeathRowByYearOnMilitaryLevel(year);
          break;
      }
      break;

    case "runningDeathRow":
      switch (levelSelection) {
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
      switch (levelSelection) {
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
      switch (levelSelection) {
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
};

// this will update the map values accordingly in order to display the colours on the map according to the data passed in
updateMap = response => {
  const levelSelection = $("input[type=radio]:checked").val();
  const posteriorViewSelection = $(
    "input[type=checkbox].posterior-view:checked"
  ).val();
  const year = $(".ui.slider").slider("get value");
  const mapSelection = $("#mapSelection").val();

  Object.keys(dataByFIPS).forEach(data => (dataByFIPS[data] = 0)); // reset all data properties back to zero
  if (response.data.length > 0) {
    switch (mapSelection) {
      case "executions":
        switch (levelSelection) {
          case "state":
            response.data.map(data => {
              let key = Object.keys(stateByFIPS).find(
                key => stateByFIPS[key] === data.state
              );
              dataByFIPS[key] = data.total;
            });
            break;
          case "federal":
          case "military":
            // this will colour in the whole map, rather than on a selective state level
            Object.keys(dataByFIPS).forEach(
              v => (dataByFIPS[v] = response.data[0].total)
            );
            break;
        }
        break;
      case "runningExecutions":
        switch (levelSelection) {
          case "state":
            response.data.map(data => {
              let key = Object.keys(stateByFIPS).find(
                key => stateByFIPS[key] === data.state
              );
              dataByFIPS[key] = data.total;
            });
            break;
          case "federal":
          case "military":
            Object.keys(dataByFIPS).forEach(
              v => (dataByFIPS[v] = response.data[0].total)
            );
            break;
        }
        break;
      case "sentences":
        switch (levelSelection) {
          case "state":
            response.data.map(data => {
              let key = Object.keys(stateByFIPS).find(
                key => stateByFIPS[key] === data.state
              );

              dataByFIPS[key] = data.years.sentence;
            });
            break;
          case "federal":
          case "military":
            Object.keys(dataByFIPS).forEach(
              v => (dataByFIPS[v] = response.data[0].years.sentence)
            );
            break;
        }
        break;

      case "runningSentences": {
        switch (levelSelection) {
          case "state":
            response.data.map(data => {
              let key = Object.keys(stateByFIPS).find(
                key => stateByFIPS[key] === data.state
              );

              dataByFIPS[key] = data.count;
            });
            break;
          case "federal":
          case "military":
            Object.keys(dataByFIPS).forEach(
              v => (dataByFIPS[v] = response.data[0].count)
            );
            break;
        }
        break;
      }
      case "legalStatus":
        switch (levelSelection) {
          case "state":
            response.data.map(data => {
              let key = Object.keys(stateByFIPS).find(
                key => stateByFIPS[key] === data.state
              );

              switch (data.status) {
                case "Retentionist":
                  dataByFIPS[key] = 0;
                  break;
                case "Abolished":
                  dataByFIPS[key] = 1;
                  break;
                case "Moratorium":
                  dataByFIPS[key] = 2;
                  break;

                default:
                  dataByFIPS[key] = 1;
              }
            });
            break;
          case "federal":
          case "military":
            switch (response.data[0].status) {
              case "Retentionist":
                Object.keys(dataByFIPS).forEach(v => (dataByFIPS[v] = 0));
                break;
              case "Abolished":
                Object.keys(dataByFIPS).forEach(v => (dataByFIPS[v] = 1));
                break;
              case "Moratorium":
                Object.keys(dataByFIPS).forEach(v => (dataByFIPS[v] = 2));
                break;

              default:
                Object.keys(dataByFIPS).forEach(v => (dataByFIPS[v] = 1));
            }
        }
        break;

      case "deathRow":
        switch (levelSelection) {
          case "state":
            response.data.map(data => {
              let key = Object.keys(stateByFIPS).find(
                key => stateByFIPS[key] === data.state
              );

              dataByFIPS[key] = data.total;
            });
            break;
          case "federal":
          case "military":
            Object.keys(dataByFIPS).forEach(
              v => (dataByFIPS[v] = response.data[0].total)
            );
        }
        break;

      case "runningDeathRow":
        switch (levelSelection) {
          case "state":
            response.data.map(data => {
              let key = Object.keys(stateByFIPS).find(
                key => stateByFIPS[key] === data.state
              );

              dataByFIPS[key] = data.total;
            });
            break;
          case "federal":
          case "military":
            Object.keys(dataByFIPS).forEach(
              v => (dataByFIPS[v] = response.data[0].total)
            );
        }
        break;

      case "innocence":
        switch (levelSelection) {
          case "state":
            response.data.map(data => {
              let key = Object.keys(stateByFIPS).find(
                key => stateByFIPS[key] === data.state
              );

              dataByFIPS[key] = data.total;
            });
            break;
          case "federal":
          case "military":
            Object.keys(dataByFIPS).forEach(
              v => (dataByFIPS[v] = response.data[0].total)
            );
        }
        break;

      case "runningInnocence":
        switch (levelSelection) {
          case "state":
            response.data.map(data => {
              let key = Object.keys(stateByFIPS).find(
                key => stateByFIPS[key] === data.state
              );

              dataByFIPS[key] = data.total;
            });
            break;
          case "federal":
          case "military":
            Object.keys(dataByFIPS).forEach(
              v => (dataByFIPS[v] = response.data[0].total)
            );
        }
        break;
    }
  }

  // colors (fills) the map in according to the FIPS id code
  stateShapes.style("fill", d => {
    return colorScale(dataByFIPS[d.id]);
  });
};
