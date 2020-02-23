
getExecutionMethodsSummaryOnMilitaryLevelByYearNonPosteriously = (year) => {


    axios.get(`/getExecutionMethodsSummaryOnMilitaryLevelByYearNonPosteriously/${year}`)
        .then(response => {
            // SUCCESS
            this.generateExecutionMethodsSummary(response);
            this.generateTotalExecutions(response);
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
        .finally(() => {
            // always executed
        });

}

getExecutionsMethodsOnMilitaryLevelByYearNonPosteriously = (year) => {


    axios.get(`/getExecutionsMethodsOnMilitaryLevelByYearNonPosteriously/${year}`)
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


getTotalExecutionsOnMilitaryLevelByYearNonPosteriously = (year) => {


    axios.get(`/getTotalExecutionsOnMilitaryLevelByYearNonPosteriously/${year}`)
        .then(response => {
            // SUCCESS
            this.generateExecutionMethodsSummary(response);
            this.generateTotalExecutions(response);
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
        .finally(() => {
            // always executed
        });

}