
getExecutionsMethodsOnFederalLevelByYearPosteriously = (year) => {


    axios.get(`/getExecutionsMethodsOnFederalLevelByYearPosteriously/${year}`)
        .then(response => {

            // SUCCESS
            this.generateExecutionMethodsSummary(response);
            this.generateTotalExecutions(response);

            this.updateMap(response);
            this.generateExecutionTable(response);

        })
        .catch(error => {
            // handle error
            console.log(error);
        })
        .finally(() => {
            // always executed
        });

}

getExecutionMethodsSummaryOnFederalLevelByYearPosteriously = (year) => {


    axios.get(`/getExecutionMethodsSummaryOnFederalLevelByYearPosteriously/${year}`)
        .then(response => {
            // SUCCESS

            this.generateExecutionMethodsSummary(response);
            this.generateTotalExecutions(response);
            this.updateMap(response);
            this.generateExecutionTable(response);
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
        .finally(() => {
            // always executed
        });

}