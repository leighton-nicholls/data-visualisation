
getExecutionsMethodsOnMilitaryLevelByYearPosteriously = (year) => {


    axios.get(`/getExecutionsMethodsOnMilitaryLevelByYearPosteriously/${year}`)
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

getExecutionMethodsSummaryOnMilitaryLevelByYearPosteriously = (year) => {


    axios.get(`/getExecutionMethodsSummaryOnMilitaryLevelByYearPosteriously/${year}`)
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