getDeathRowByYearOnStateLevel = year => {
  axios
    .get(`/getAllDeathRowDocumentsByYearOnStateLevel/${year}`)
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

getDeathRowByYearOnFederalLevel = year => {
  axios
    .get(`/getAllDeathRowDocumentsByYearOnFederalLevel/${year}`)
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

getDeathRowByYearOnMilitaryLevel = year => {
  axios
    .get(`/getAllDeathRowDocumentsByYearOnMilitaryLevel/${year}`)
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
