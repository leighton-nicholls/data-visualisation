createSelectEventListener = () => {
  $("#mapSelection").on("change", function(event) {
    clearElement("posterior-view");
    clearResults();
    clearElement("legendThreshold");

    createColours();

    controlCurrentSelectionLogic();
  });
};
