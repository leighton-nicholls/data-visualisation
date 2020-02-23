
getRunningSentencingRatesByYearOnStateLevel = (year) => {

    axios.get(`/getRunningSentencingRatesByYearOnStateLevel/${year}`)
        .then(response => {
            // SUCCESS
            //executionInfo.push(response.data)
            this.updateMap(response);

            this.generateStateSentencingTable(response);
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
        .finally(() => {
            // always executed
        });

}

getRunningSentencingRatesByYearOnFederalLevel = (year) => {

    axios.get(`/getRunningSentencingRatesByYearOnFederalLevel/${year}`)
        .then(response => {
            // SUCCESS
            this.updateMap(response);

            this.generateFederalSentencingTable(response);
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
        .finally(() => {
            // always executed
        });

}

getRunningSentencingRatesByYearOnMilitaryLevel = (year) => {

    axios.get(`/getRunningSentencingRatesByYearOnMilitaryLevel/${year}`)
        .then(response => {
            // SUCCESS
            //executionInfo.push(response.data)
            this.updateMap(response);
            this.generateMilitarySentencingTable(response);
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
        .finally(() => {
            // always executed
        });

}