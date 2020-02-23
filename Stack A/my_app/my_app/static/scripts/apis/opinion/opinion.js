getOpinionRatesByYear = year => {
  axios
    .get(`/getAllMurderOpinionDocumentsByYear/${year}`)
    .then(response => {
      this.generateOpinionSummary(response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .finally(() => {
      // always executed
    });
};
