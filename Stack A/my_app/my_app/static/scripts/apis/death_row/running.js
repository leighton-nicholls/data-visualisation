getRunningDeathRowByYearOnStateLevel = year => {
  axios
    .get(`/getRunningDeathRowDocumentsByYearOnStateLevel/${year}`)
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

getRunningDeathRowByYearOnFederalLevel = year => {
  axios
    .get(`/getRunningDeathRowDocumentsByYearOnFederalLevel/${year}`)
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

getRunningDeathRowByYearOnMilitaryLevel = year => {
  axios
    .get(`/getRunningDeathRowDocumentsByYearOnMilitaryLevel/${year}`)
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
