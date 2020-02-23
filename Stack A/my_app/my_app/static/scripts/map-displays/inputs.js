generateLevelSelections = () => {
  const levelSelections = map
    .append("foreignObject")
    .attr("x", 1640)
    .attr("y", 20)
    .attr("width", 400)
    .attr("height", 100);

  levelSelections.html(`<div class="ui form">
    <div class="inline fields">
    <div class="field">
        <div class="ui radio checkbox">
    <input type="radio" name="level" value="state" checked="checked">
    <label>State</label>
        </div>
    </div>
    <div class="field">
        <div class="ui radio checkbox">
    <input type="radio" name="level" value="federal">
    <label>Federal</label>
        </div>
    </div>
    <div class="field">
        <div class="ui radio checkbox">
    <input type="radio" name="level" value="military">
    <label>Military</label>
        </div>
    </div>
    </div>
</div>`);
};

generateMapSelections = () => {
  const mapSelections = map
    .append("foreignObject")
    .attr("x", 1715)
    .attr("y", 70)
    .attr("width", 400)
    .attr("height", 100);

  mapSelections.html(`<select id="mapSelection" class="ui search dropdown">
    <option value="executions">Executions</option>
    <option value="runningExecutions">Running Executions</option>
    <option value="sentences">Sentences</option>
    <option value="runningSentences">Running Sentences</option>
    <option value="legalStatus">Legal Status</option>
    <option value="deathRow">Death Row</option>
    <option value="runningDeathRow">Running Death Row</option>
    <option value="innocence">Innocence</option>
    <option value="runningInnocence">Running Innocence</option>
  </select>`);
};

generateCheckbox = () => {
  const checkbox = map
    .append("foreignObject")
    .attr("x", 1740)
    .attr("y", 135)
    .attr("width", 200)
    .attr("height", 200)
    .attr("class", "posterior-view");

  checkbox.html(`<div class="ui checkbox posterior-view">
    <input class="posterior-view" name="posterior" value="posterior-view" type="checkbox">
    <label>Posterior view</label>
  </div>`);
};
