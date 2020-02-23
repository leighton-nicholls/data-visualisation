
getSliderYearsOnStateLevelPosteriously = () => {
    axios.get(`/getSliderYearsOnStateLevelPosteriously`)
        .then(response => {
            // SUCCESS
            this.updateSlider(response);
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
        .finally(() => {
            // always executed
        });

}

getSliderYearsOnFederalLevelPosteriously = () => {
    axios.get(`/getSliderYearsOnFederalLevelPosteriously`)
        .then(response => {
            // SUCCESS
            this.updateSlider(response);
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
        .finally(() => {
            // always executed
        });

}

getSliderYearsOnMilitaryLevelPosteriously = () => {
    axios.get(`/getSliderYearsOnMilitaryLevelPosteriously`)
        .then(response => {
            // SUCCESS
            this.updateSlider(response);
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
        .finally(() => {
            // always executed
        });

}