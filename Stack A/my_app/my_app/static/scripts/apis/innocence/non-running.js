getInnocenceByYearOnStateLevel = year => {
  axios
    .get(`/getInnocenceDocumentsOnStateLevelByYear/${year}`)
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

getInnocenceByYearOnFederalLevel = year => {
  axios
    .get(`/getInnocenceDocumentsOnFederalLevelByYear/${year}`)
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

getInnocenceByYearOnMilitaryLevel = year => {
  axios
    .get(`/getInnocenceDocumentsOnMilitaryLevelByYear/${year}`)
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
