import { getDayOfWeek } from "../../shared-functions";

export function generateVolunteerPieChart(executions) {
  const foreign_nationals = executions.map(execution => {
    return execution.foreign_national.toLowerCase();
  });

  const pieChartData = {
    label: "somethingB",
    values: []
  };

  const foreignNationalTotals = foreign_nationals.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  const values = Object.entries(foreignNationalTotals).map(([k, v]) => ({
    x: [k],
    y: v
  }));

  pieChartData.values = values;

  return {
    foreignNationalBreakdownPieChartData: pieChartData
  };
}

export function generateRacialPieChart(executions) {
  const races = executions.map(execution => {
    return execution.race.toLowerCase();
  });

  const pieChartData = {
    label: "somethingB",
    values: []
  };

  const raceTotals = races.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  const values = Object.entries(raceTotals).map(([k, v]) => ({
    x: [k],
    y: v
  }));

  pieChartData.values = values;

  return {
    racialBreakdownPieChartData: pieChartData
  };
}

export function generateGenderPieChart(executions) {
  const genders = executions.map(execution => {
    return execution.gender.toLowerCase();
  });

  const pieChartData = {
    label: "somethingB",
    values: []
  };

  const genderTotals = genders.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  );

  const values = Object.entries(genderTotals).map(([k, v]) => ({
    x: [k],
    y: v
  }));

  pieChartData.values = values;

  return {
    genderBreakdownPieChartData: pieChartData
  };
}

export function generateWeekdaysPieChart(executions) {
  const days = executions.map(execution => {
    return getDayOfWeek(execution.execution_date);
  });

  const weekdayTotals = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0
  };

  for (var i = 0; i < days.length; i++) {
    var num = days[i].toLowerCase();
    weekdayTotals[num] = weekdayTotals[num] ? weekdayTotals[num] + 1 : 1;
  }

  const pieChartData = {
    label: "somethingB",
    values: []
  };

  const values = Object.entries(weekdayTotals).map(([k, v]) => ({
    x: [k],
    y: v
  }));

  pieChartData.values = values;

  return {
    weekdaysBreakdownPieChartData: pieChartData
  };
}

export function generateMonthPieChart(executions) {
  const months = executions.map(execution => {
    return execution.execution_date.toLocaleString("default", {
      month: "long"
    });
  });

  const monthTotals = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0
  };

  for (var i = 0; i < months.length; i++) {
    var num = months[i].toLowerCase();
    monthTotals[num] = monthTotals[num] ? monthTotals[num] + 1 : 1;
  }

  const pieChartData = {
    label: "somethingB",
    values: []
  };

  const values = Object.entries(monthTotals).map(([k, v]) => ({
    x: [k],
    y: v
  }));

  pieChartData.values = values;

  return {
    monthsBreakdownPieChartData: pieChartData
  };
}

function between(x, min, max) {
  return x >= min && x <= max;
}

export function generateAgeBreakdownPieChart(executions) {
  const ages = executions.map(execution => {
    return execution.age_at_execution;
  });

  const ageTotals = {
    "18-25": 0,
    "26-35": 0,
    "36-45": 0,
    "46-55": 0,
    "56-65": 0,
    "66-75": 0,
    "75-85": 0,
    "86-95": 0
  };

  for (var i = 0; i < ages.length; i++) {
    var num = ages[i];

    if (between(num, 18, 25)) {
      ageTotals["18-25"] = ageTotals["18-25"] + 1;
    }
    if (between(num, 26, 35)) {
      ageTotals["26-35"] = ageTotals["26-35"] + 1;
    }
    if (between(num, 36, 45)) {
      ageTotals["36-45"] = ageTotals["36-45"] + 1;
    }
    if (between(num, 46, 55)) {
      ageTotals["46-55"] = ageTotals["46-55"] + 1;
    }
    if (between(num, 56, 65)) {
      ageTotals["56-65"] = ageTotals["56-65"] + 1;
    }
    if (between(num, 66, 75)) {
      ageTotals["66-75"] = ageTotals["66-75"] + 1;
    }
    if (between(num, 76, 85)) {
      ageTotals["76-85"] = ageTotals["76-85"] + 1;
    }
    if (between(num, 86, 95)) {
      ageTotals["86-95"] = ageTotals["86-95"] + 1;
    }
  }

  const pieChartData = {
    label: "somethingB",
    values: []
  };

  const values = Object.entries(ageTotals).map(([k, v]) => ({
    x: [k],
    y: v
  }));

  pieChartData.values = values;

  return {
    ageBreakdownPieChartData: pieChartData
  };
}

export function generateRegionBreakdownPieChartData(executions) {
  return function generateChart(state) {
    const regions = executions.map(execution => {
      return execution.region.toLowerCase();
    });

    const regionTotals = regions.reduce(
      (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
      {}
    );

    const values = Object.entries(regionTotals).map(([k, v]) => ({
      x: [k],
      y: v
    }));

    const pieChartData = {
      label: "somethingB",
      values: []
    };

    pieChartData.values = values;

    return {
      regionBreakdownPieChartData: pieChartData
    };
  };
}

export function generateVolunteerBreakdownPieChartData(executions) {
  return function generateChart(state) {
    const volunteers = executions.map(execution => {
      return execution.execution_volunteer.toLowerCase();
    });

    const volunteerTotals = volunteers.reduce(
      (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
      {}
    );

    const values = Object.entries(volunteerTotals).map(([k, v]) => ({
      x: [k],
      y: v
    }));

    const pieChartData = {
      label: "somethingB",
      values: []
    };

    pieChartData.values = values;


    return {
      volunteerBreakdownPieChartData: pieChartData
    };
  };
}
