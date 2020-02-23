
getExecutionsMethodsOnStateLevelByYearPosteriously = (year) => {


    axios.get(`/getExecutionsMethodsOnStateLevelByYearPosteriously/${year}`)
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


getExecutionMethodsSummaryOnStateLevelByYearPosteriously = (year) => {


    axios.get(`/getExecutionMethodsSummaryOnStateLevelByYearPosteriously/${year}`)
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