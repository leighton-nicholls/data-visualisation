getRunningInnocenceByYearOnStateLevel = year => {
  axios
    .get(`/getRunningInnocenceDocumentsOnStateLevelByYear/${year}`)
    .then(response => {
      //console.log(response);
      // SUCCESS
      this.updateMap(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });
};

getRunningInnocenceByYearOnFederalLevel = year => {
  axios
    .get(`/getRunningInnocenceDocumentsOnFederalLevelByYear/${year}`)
    .then(response => {
      // SUCCESS
      this.updateMap(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });
};

getRunningInnocenceByYearOnMilitaryLevel = year => {
  axios
    .get(`/getRunningInnocenceDocumentsOnMilitaryLevelByYear/${year}`)
    .then(response => {
      // SUCCESS
      this.updateMap(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });
};
