getExecutionsMethodsOnStateLevelByYearNonPosteriously = (year) => {

    axios.get(`/getExecutionsMethodsOnStateLevelByYearNonPosteriously/${year}`)
        .then(response => {
            // SUCCESS
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

getExecutionMethodsSummaryOnStateLevelByYearNonPosteriously = (year) => {

    console.log(year);

    axios.get(`/getExecutionMethodsSummaryOnStateLevelByYearNonPosteriously/${year}`)
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

getTotalExecutionsOnStateLevelByYearNonPosteriously = (year) => {


    axios.get(`/getTotalExecutionsOnStateLevelByYearNonPosteriously/${year}`)
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