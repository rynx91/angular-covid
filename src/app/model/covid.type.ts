export interface CovidInfoInterface {
  country?;
  cases?;
  todayCases?;
  deaths?;
  todayDeaths?;
  recovered?;
  todayRecovered?;
  active?;
  critical?;
  casesPerOneMillion?;
  deathsPerOneMillion?;
  tests?;
  testsPerOneMillion?;
  population?;
  continent?;
  countries?;
}

export interface CovidHistoryInterface {
  cases?;
  deaths?;
  recovered?;
}

export interface CovidHistoryByCountryInterface {
  country?;
  province?;
  timeline?: CovidHistoryInterface;
}
