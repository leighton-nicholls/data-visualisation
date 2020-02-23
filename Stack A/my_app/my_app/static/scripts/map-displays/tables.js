generateStateSentencingTable = response => {
  /* const STATECODES = [
        { state: "Alabama", code: "AL" },
        { state: "Alaska", code: "AK" },
        { state: "Arizona", code: "AZ" },
        { state: "Arkansas", code: "AR" },
        { state: "California", code: "CA" },
        { state: "Colorado", code: "CO" },
        { state: "Connecticut", code: "CT" },
        { state: "Delaware", code: "DE" },
        { state: "Florida", code: "FL" },
        { state: "Georgia", code: "GA" },
        { state: "Hawaii", code: "HI" },
        { state: "Idaho", code: "ID" },
        { state: "Illinois", code: "IL" },
        { state: "Indiana", code: "IN" },
        { state: "Iowa", code: "IA" },
        { state: "Kansas", code: "KS" },
        { state: "Kentucky", code: "KY" },
        { state: "Louisiana", code: "LA" },
        { state: "Maine", code: "ME" },
        { state: "Montana", code: "MT" },
        { state: "Nebraska", code: "NE" },
        { state: "Nevada", code: "NV" },
        { state: "New Hampshire", code: "NH" },
        { state: "New Jersey", code: "NJ" },
        { state: "New Mexico", code: "NM" },
        { state: "New York", code: "NY" },
        { state: "North Carolina", code: "NC" },
        { state: "North Dakota", code: "ND" },
        { state: "Ohio", code: "OH" },
        { state: "Oklahoma", code: "OK" },
        { state: "Oregon", code: "OR" },
        { state: "Maryland", code: "MD" },
        { state: "Massachusetts", code: "MA" },
        { state: "Michigan", code: "MI" },
        { state: "Minnesota", code: "MN" },
        { state: "Mississippi", code: "MS" },
        { state: "Missouri", code: "MO" },
        { state: "Pennsylvania", code: "PA" },
        { state: "Rhode Island", code: "RI" },
        { state: "South Carolina", code: "SC" },
        { state: "South Dakota", code: "SD" },
        { state: "Tennessee", code: "TN" },
        { state: "Texas", code: "TX" },
        { state: "Utah", code: "UT" },
        { state: "Vermont", code: "VT" },
        { state: "Virginia", code: "VA" },
        { state: "Washington", code: "WA" },
        { state: "West Virginia", code: "WV" },
        { state: "Wisconsin", code: "WI" },
        { state: "Wyoming", code: "WY" },
    ]

    console.log(response)

    const table = map.append('foreignObject')
        .attr("x", 1675)
        .attr("y", 200)
        .attr("width", 400)
        .attr("height", 1000)
        .attr('class', 'state-sentencing-summary')

    var html = "";

    if (response.data.length > 0) {


        response.data.map(data => {
            const stateCode = STATECODES.find(obj => obj.state === data.state).code;
            html += "<tr>";
            html += `<td data-label='flag'><img src="/static/images/flags/mini-res/${stateCode}.png"></td>`;
            html += `<td data-label="state">${data.state}</td>`;
            html += ` <td data-label="sentences">${data.years.sentence}</td>`;
            html += "</tr>";
        })

        table
            .html(`<div class="ui grid">
    <div class="one wide column">
    <table id="summaryOfSentences" class="ui celled small compact table">
        <thead>
    <tr>
        <th class="one wide" colSpan="2">State</th>
        <th class="one wide">Sentences</th>
    </tr>
        </thead>
        <tbody>
    ${html}
        </tbody>
    </table>
    </div>
</div>`)
    }*/
};

generateFederalSentencingTable = response => {
  /* const STATECODES = [
        { state: "Alabama", code: "AL" },
        { state: "Alaska", code: "AK" },
        { state: "Arizona", code: "AZ" },
        { state: "Arkansas", code: "AR" },
        { state: "California", code: "CA" },
        { state: "Colorado", code: "CO" },
        { state: "Connecticut", code: "CT" },
        { state: "Delaware", code: "DE" },
        { state: "Florida", code: "FL" },
        { state: "Georgia", code: "GA" },
        { state: "Hawaii", code: "HI" },
        { state: "Idaho", code: "ID" },
        { state: "Illinois", code: "IL" },
        { state: "Indiana", code: "IN" },
        { state: "Iowa", code: "IA" },
        { state: "Kansas", code: "KS" },
        { state: "Kentucky", code: "KY" },
        { state: "Louisiana", code: "LA" },
        { state: "Maine", code: "ME" },
        { state: "Montana", code: "MT" },
        { state: "Nebraska", code: "NE" },
        { state: "Nevada", code: "NV" },
        { state: "New Hampshire", code: "NH" },
        { state: "New Jersey", code: "NJ" },
        { state: "New Mexico", code: "NM" },
        { state: "New York", code: "NY" },
        { state: "North Carolina", code: "NC" },
        { state: "North Dakota", code: "ND" },
        { state: "Ohio", code: "OH" },
        { state: "Oklahoma", code: "OK" },
        { state: "Oregon", code: "OR" },
        { state: "Maryland", code: "MD" },
        { state: "Massachusetts", code: "MA" },
        { state: "Michigan", code: "MI" },
        { state: "Minnesota", code: "MN" },
        { state: "Mississippi", code: "MS" },
        { state: "Missouri", code: "MO" },
        { state: "Pennsylvania", code: "PA" },
        { state: "Rhode Island", code: "RI" },
        { state: "South Carolina", code: "SC" },
        { state: "South Dakota", code: "SD" },
        { state: "Tennessee", code: "TN" },
        { state: "Texas", code: "TX" },
        { state: "Utah", code: "UT" },
        { state: "Vermont", code: "VT" },
        { state: "Virginia", code: "VA" },
        { state: "Washington", code: "WA" },
        { state: "West Virginia", code: "WV" },
        { state: "Wisconsin", code: "WI" },
        { state: "Wyoming", code: "WY" },
    ]

    console.log(response)

    const table = map.append('foreignObject')
        .attr("x", 1675)
        .attr("y", 200)
        .attr("width", 400)
        .attr("height", 1000)
        .attr('class', 'federal-sentencing-summary')

    var html = "";

    if (response.data.length > 0) {


        response.data.map(data => {
            const stateCode = STATECODES.find(obj => obj.state === data.state).code;
            html += "<tr>";
            html += `<td data-label='flag'><img src="/static/images/flags/mini-res/${stateCode}.png"></td>`;
            html += `<td data-label="state">${data.state}</td>`;
            html += ` <td data-label="sentences">${data.years.sentence}</td>`;
            html += "</tr>";
        })

        table
            .html(`<div class="ui grid">
    <div class="one wide column">
    <table id="summaryOfSentences" class="ui celled small compact table">
        <thead>
    <tr>
        <th class="one wide" colSpan="2">Federal</th>
        <th class="one wide">Sentences</th>
    </tr>
        </thead>
        <tbody>
    ${html}
        </tbody>
    </table>
    </div>
</div>`)
    }*/
};

generateMilitarySentencingTable = response => {
  /*const STATECODES = [
        { state: "Alabama", code: "AL" },
        { state: "Alaska", code: "AK" },
        { state: "Arizona", code: "AZ" },
        { state: "Arkansas", code: "AR" },
        { state: "California", code: "CA" },
        { state: "Colorado", code: "CO" },
        { state: "Connecticut", code: "CT" },
        { state: "Delaware", code: "DE" },
        { state: "Florida", code: "FL" },
        { state: "Georgia", code: "GA" },
        { state: "Hawaii", code: "HI" },
        { state: "Idaho", code: "ID" },
        { state: "Illinois", code: "IL" },
        { state: "Indiana", code: "IN" },
        { state: "Iowa", code: "IA" },
        { state: "Kansas", code: "KS" },
        { state: "Kentucky", code: "KY" },
        { state: "Louisiana", code: "LA" },
        { state: "Maine", code: "ME" },
        { state: "Montana", code: "MT" },
        { state: "Nebraska", code: "NE" },
        { state: "Nevada", code: "NV" },
        { state: "New Hampshire", code: "NH" },
        { state: "New Jersey", code: "NJ" },
        { state: "New Mexico", code: "NM" },
        { state: "New York", code: "NY" },
        { state: "North Carolina", code: "NC" },
        { state: "North Dakota", code: "ND" },
        { state: "Ohio", code: "OH" },
        { state: "Oklahoma", code: "OK" },
        { state: "Oregon", code: "OR" },
        { state: "Maryland", code: "MD" },
        { state: "Massachusetts", code: "MA" },
        { state: "Michigan", code: "MI" },
        { state: "Minnesota", code: "MN" },
        { state: "Mississippi", code: "MS" },
        { state: "Missouri", code: "MO" },
        { state: "Pennsylvania", code: "PA" },
        { state: "Rhode Island", code: "RI" },
        { state: "South Carolina", code: "SC" },
        { state: "South Dakota", code: "SD" },
        { state: "Tennessee", code: "TN" },
        { state: "Texas", code: "TX" },
        { state: "Utah", code: "UT" },
        { state: "Vermont", code: "VT" },
        { state: "Virginia", code: "VA" },
        { state: "Washington", code: "WA" },
        { state: "West Virginia", code: "WV" },
        { state: "Wisconsin", code: "WI" },
        { state: "Wyoming", code: "WY" },
    ]

    console.log(response)

    const table = map.append('foreignObject')
        .attr("x", 1675)
        .attr("y", 200)
        .attr("width", 400)
        .attr("height", 1000)
        .attr('class', 'military-sentencing-summary')

    var html = "";

    if (response.data.length > 0) {


        response.data.map(data => {
            const stateCode = STATECODES.find(obj => obj.state === data.state).code;
            html += "<tr>";
            html += `<td data-label='flag'><img src="/static/images/flags/mini-res/${stateCode}.png"></td>`;
            html += `<td data-label="military">${data.state}</td>`;
            html += ` <td data-label="sentences">${data.years.sentence}</td>`;
            html += "</tr>";
        })

        table
            .html(`<div class="ui grid">
    <div class="one wide column">
    <table id="summaryOfSentences" class="ui celled small compact table">
        <thead>
    <tr>
        <th class="one wide" colSpan="2">Military</th>
        <th class="one wide">Sentences</th>
    </tr>
        </thead>
        <tbody>
    ${html}
        </tbody>
    </table>
    </div>
</div>`)
    }*/
};

generateExecutionTable = response => {
  /*const STATECODES = [
        { state: "Alabama", code: "AL" },
        { state: "Alaska", code: "AK" },
        { state: "Arizona", code: "AZ" },
        { state: "Arkansas", code: "AR" },
        { state: "California", code: "CA" },
        { state: "Colorado", code: "CO" },
        { state: "Connecticut", code: "CT" },
        { state: "Delaware", code: "DE" },
        { state: "Florida", code: "FL" },
        { state: "Georgia", code: "GA" },
        { state: "Hawaii", code: "HI" },
        { state: "Idaho", code: "ID" },
        { state: "Illinois", code: "IL" },
        { state: "Indiana", code: "IN" },
        { state: "Iowa", code: "IA" },
        { state: "Kansas", code: "KS" },
        { state: "Kentucky", code: "KY" },
        { state: "Louisiana", code: "LA" },
        { state: "Maine", code: "ME" },
        { state: "Montana", code: "MT" },
        { state: "Nebraska", code: "NE" },
        { state: "Nevada", code: "NV" },
        { state: "New Hampshire", code: "NH" },
        { state: "New Jersey", code: "NJ" },
        { state: "New Mexico", code: "NM" },
        { state: "New York", code: "NY" },
        { state: "North Carolina", code: "NC" },
        { state: "North Dakota", code: "ND" },
        { state: "Ohio", code: "OH" },
        { state: "Oklahoma", code: "OK" },
        { state: "Oregon", code: "OR" },
        { state: "Maryland", code: "MD" },
        { state: "Massachusetts", code: "MA" },
        { state: "Michigan", code: "MI" },
        { state: "Minnesota", code: "MN" },
        { state: "Mississippi", code: "MS" },
        { state: "Missouri", code: "MO" },
        { state: "Pennsylvania", code: "PA" },
        { state: "Rhode Island", code: "RI" },
        { state: "South Carolina", code: "SC" },
        { state: "South Dakota", code: "SD" },
        { state: "Tennessee", code: "TN" },
        { state: "Texas", code: "TX" },
        { state: "Utah", code: "UT" },
        { state: "Vermont", code: "VT" },
        { state: "Virginia", code: "VA" },
        { state: "Washington", code: "WA" },
        { state: "West Virginia", code: "WV" },
        { state: "Wisconsin", code: "WI" },
        { state: "Wyoming", code: "WY" },
    ]


    const table = map.append('foreignObject')
        .attr("x", 1675)
        .attr("y", 200)
        .attr("width", 400)
        .attr("height", 1000)
        .attr('class', 'state-execution-summary')

    var html = "";

    if (response.data.length > 0) {


        response.data.map(data => {
            const stateCode = STATECODES.find(obj => obj.state === data.state).code;


            html += "<tr>";
            html += `<td data-label='flag'><img src="/static/images/flags/mini-res/${stateCode}.png"></td>`;
            html += `<td data-label="state">${data.state}</td>`;
            html += ` <td data-label="executions">${data.total}</td>`;
            html += "</tr>";
        })




        table
            .html(`<div class="ui grid">
    <div class="one wide column">
    <table id="summaryOfExecutions" class="ui celled small compact table">
        <thead>
    <tr>
        <th class="one wide" colSpan="2">State</th>
        <th class="one wide">Executions</th>
    </tr>
        </thead>
        <tbody>
    ${html}
        </tbody>
    </table>
    </div>
</div>`)
    }*/
};
