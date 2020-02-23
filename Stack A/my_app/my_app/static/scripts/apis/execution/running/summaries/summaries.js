
getRunningExecutionMethodsSummaryTotalOnStateLevel = (year) => {


    axios.get(`/getRunningExecutionMethodsSummaryTotalOnStateLevel/${year}`)
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

}

getRunningExecutionMethodsSummaryTotalOnFederalLevel = (year) => {

    axios.get(`/getRunningExecutionMethodsSummaryTotalOnFederalLevel/${year}`)
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

}

getRunningExecutionMethodsSummaryTotalOnMilitaryLevel = (year) => {


    axios.get(`/getRunningExecutionMethodsSummaryTotalOnMilitaryLevel/${year}`)
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

}