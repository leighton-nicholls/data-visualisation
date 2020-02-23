getLegalStatusByYearOnStateLevel = year => {
  axios
    .get(`/getLegalStatusByYearOnStateLevel/${year}`)
    .then(response => {
      //console.log(response)
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

getLegalStatusByYearOnFederalLevel = year => {
  axios
    .get(`/getLegalStatusByYearOnFederalLevel/${year}`)
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

getLegalStatusByYearOnMilitaryLevel = year => {
  axios
    .get(`/getLegalStatusByYearOnMilitaryLevel/${year}`)
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
