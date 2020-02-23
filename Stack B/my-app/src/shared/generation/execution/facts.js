import {
  retrieveFirstExecutionDate,
  retrieveLatestExecutionDate
} from "../../shared-functions";

export function generateFacts(executions) {
  const executionsByLethalInjection = executions.filter(execution => {
    return execution.execution_method === "Lethal Injection";
  });

  const executionsByElectrocution = executions.filter(execution => {
    return execution.execution_method === "Electrocution";
  });

  const executionsByGas = executions.filter(execution => {
    return execution.execution_method === "Gas";
  });

  const executionsByFiringSquad = executions.filter(execution => {
    return execution.execution_method === "Firing Squad";
  });

  const executionsByHanging = executions.filter(execution => {
    return execution.execution_method === "Hanging";
  });

  const firstExecutionDate = retrieveFirstExecutionDate(executions);
  const latestExecutionDate = retrieveLatestExecutionDate(executions);

  const firstExecutionByLethalInjectionDate = retrieveFirstExecutionDate(
    executionsByLethalInjection
  );
  const latestExecutionByLethalInjectionDate = retrieveLatestExecutionDate(
    executionsByLethalInjection
  );

  const firstExecutionByElectrocutionDate = retrieveFirstExecutionDate(
    executionsByElectrocution
  );
  const latestExecutionByElectrocutionDate = retrieveLatestExecutionDate(
    executionsByElectrocution
  );

  const firstExecutionByGasDate = retrieveFirstExecutionDate(executionsByGas);
  const latestExecutionByGasDate = retrieveLatestExecutionDate(executionsByGas);

  const firstExecutionByFiringSquadDate = retrieveFirstExecutionDate(
    executionsByFiringSquad
  );
  const latestExecutionByFiringSquadDate = retrieveLatestExecutionDate(
    executionsByFiringSquad
  );

  const firstExecutionByHangingDate = retrieveFirstExecutionDate(
    executionsByHanging
  );
  const latestExecutionByHangingDate = retrieveLatestExecutionDate(
    executionsByHanging
  );

  const firstExecutionSummary = {
    firstExecutionDate: firstExecutionDate,
    firstExecutionByLethalInjectionDate: firstExecutionByLethalInjectionDate,
    firstExecutionByElectrocutionDate: firstExecutionByElectrocutionDate,
    firstExecutionByGasDate: firstExecutionByGasDate,
    firstExecutionByFiringSquadDate: firstExecutionByFiringSquadDate,
    firstExecutionByHangingDate: firstExecutionByHangingDate
  };

  const latestExecutionSummary = {
    latestExecutionDate: latestExecutionDate,
    latestExecutionByLethalInjectionDate: latestExecutionByLethalInjectionDate,
    latestExecutionByElectrocutionDate: latestExecutionByElectrocutionDate,
    latestExecutionByGasDate: latestExecutionByGasDate,
    latestExecutionByFiringSquadDate: latestExecutionByFiringSquadDate,
    latestExecutionByHangingDate: latestExecutionByHangingDate
  };

  return {
    firstExecutionSummary: firstExecutionSummary,
    latestExecutionSummary: latestExecutionSummary
  };
}
