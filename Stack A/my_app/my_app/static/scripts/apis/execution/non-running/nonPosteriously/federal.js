getExecutionMethodsSummaryOnFederalLevelByYearNonPosteriously = (year) => {

    axios.get(`/getExecutionMethodsSummaryOnFederalLevelByYearNonPosteriously/${year}`)
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


getExecutionsMethodsOnFederalLevelByYearNonPosteriously = (year) => {


    axios.get(`/getExecutionsMethodsOnFederalLevelByYearNonPosteriously/${year}`)
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

getTotalExecutionsOnFederalLevelByYearNonPosteriously = (year) => {


    axios.get(`/getTotalExecutionsOnFederalLevelByYearNonPosteriously/${year}`)
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