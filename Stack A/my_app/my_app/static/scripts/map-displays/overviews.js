generateLegalStatusOverview = response => {
  if (response.data.length > 0) {
    const legalStatusOverview = map
      .append("foreignObject")
      .attr("x", 20)
      .attr("y", 600)
      .attr("width", 400)
      .attr("height", 1000)
      .attr("class", "legal-status-summary");

    legalStatusOverview.html(`
        <h4 class="ui header">Overview</h4>
        <h5 class="ui header">Retentionist: ${response.data[0].retentionist}</h5>
        <h5 class="ui header">Disfavour: ${response.data[0].abolished}</h5>
        <h5 class="ui header">Neutral/no opinion: ${response.data[0].moratorium}</h5>
    `);
  }
};

generateOpinionSummary = response => {
  if (response.data.length > 0) {
    const opinions = map
      .append("foreignObject")
      .attr("x", 20)
      .attr("y", 800)
      .attr("width", 200)
      .attr("height", 1000)
      .attr("class", "opinion-summary");

    opinions.html(`
        <h4 class="ui header">Opinion</h4>
        <h5 class="ui header">Favour: ${response.data[0].favour}%</h5>
        <h5 class="ui header">Disfavour: ${response.data[0].disfavour}%</h5>
        <h5 class="ui header">Neutral/no opinion: ${response.data[0].neutral}%</h5>
    `);
  }
};

generateTotalExecutions = response => {
  if (response.data.length > 0) {
    const totalExecutions = map
      .append("foreignObject")
      .attr("x", 20)
      .attr("y", 600)
      .attr("width", 400)
      .attr("height", 1000)
      .attr("class", "total-executions");

    totalExecutions.html(
      `<h4 class="ui header total-executions">Total Executions: ${response.data[0].total}</h4>`
    );
  }
};

generateExecutionMethodsSummary = response => {
  if (response.data.length > 0) {
    const lethalInjection = map
      .append("foreignObject")
      .attr("x", 20)
      .attr("y", 200)
      .attr("width", 400)
      .attr("height", 1000)
      .attr("class", "execution-methods-summary");

    let html = "";

    const lethalInjectionTotal = response.data[0].lethal_injection;
    const electrocutionTotal = response.data[0].electrocution;
    const gasTotal = response.data[0].gas;
    const hangingTotal = response.data[0].hanging;
    const firingSquadTotal = response.data[0].firing_squad;

    if (lethalInjectionTotal > 0) {
      html += "<tr>";
      html +=
        "<td data-label='lethal injection icon'><img title='Lethal Injection' class='ui large image' src='/static/images/execution icons/lethal-injection.svg'></td>";
      html += `<td data-label='lethal_injection'>${response.data[0].lethal_injection}</td>`;
      html += "</tr>";
    }
    if (electrocutionTotal > 0) {
      html += "<tr>";
      html +=
        "<td data-label='lethal injection icon'><img title='Electric Chair' class='ui large image' src='/static/images/execution icons/electric-chair.svg'></td>";
      html += `<td data-label='electrocution'>${response.data[0].electrocution}</td>`;
      html += "</tr>";
    }
    if (gasTotal > 0) {
      html += "<tr>";
      html +=
        "<td data-label='lethal injection icon'><img title='Gas' class='ui large image' src='/static/images/execution icons/gas-mask.svg'></td>";
      html += `<td data-label='gas'>${response.data[0].gas}</td>`;
      html += "</tr>";
    }
    if (hangingTotal > 0) {
      html += "<tr>";
      html +=
        "<td data-label='lethal injection icon'><img title='Hanging' class='ui large image' src='/static/images/execution icons/hanging.svg'></td>";
      html += `<td data-label='hanging'>${response.data[0].hanging}</td>`;
      html += "</tr>";
    }
    if (firingSquadTotal > 0) {
      html += "<tr>";
      html +=
        "<td data-label='lethal injection icon'><img title='Firing Squad' class='ui large image' src='/static/images/execution icons/firing-squad.svg'></td>";
      html += `<td data-label='firing_squad'>${response.data[0].firing_squad}</td>`;
      html += "</tr>";
    }

    lethalInjection.html(`<div class="ui grid">
    <div class="two wide column">
        <table id="summaryOfExecutions" class="ui celled small compact table">
    <thead>
        <tr>
    <th class="two wide">Type</th>
    <th class="one wide">Number</th>
        </tr>
    </thead>
    <tbody>
    ${html}
    </tbody>
        </table>
    </div>
    </div>`);
  }
};
