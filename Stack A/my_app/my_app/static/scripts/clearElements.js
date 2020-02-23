clearElement = className => {
  [...document.getElementsByClassName(className)].map(n => n && n.remove());
};

// results continually append to the html if we don't clear them
clearResults = () => {
  // clears results from map as different inputs change
  [...document.getElementsByClassName("opinion-summary")].map(
    n => n && n.remove()
  );
  [...document.getElementsByClassName("execution-methods-summary")].map(
    n => n && n.remove()
  );
  [...document.getElementsByClassName("total-executions")].map(
    n => n && n.remove()
  );
  [...document.getElementsByClassName("state-execution-summary")].map(
    n => n && n.remove()
  );
  [...document.getElementsByClassName("state-sentencing-summary")].map(
    n => n && n.remove()
  );
  [...document.getElementsByClassName("state-federal-summary")].map(
    n => n && n.remove()
  );
  [...document.getElementsByClassName("state-military-summary")].map(
    n => n && n.remove()
  );
  [...document.getElementsByClassName("total-executions")].map(
    n => n && n.remove()
  );
  //[...document.getElementsByClassName("preemptive-search")].map(n => n && n.remove());
};
