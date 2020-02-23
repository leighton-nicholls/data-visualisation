
getSentencingRatesByYearOnStateLevel = (year) => {

    axios.get(`/getSentencingRatesByYearOnStateLevel/${year}`)
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

getSentencingRatesByYearOnFederalLevel = (year) => {

    axios.get(`/getSentencingRatesByYearOnFederalLevel/${year}`)
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

getSentencingRatesByYearOnMilitaryLevel = (year) => {

    axios.get(`/getSentencingRatesByYearOnMilitaryLevel/${year}`)
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