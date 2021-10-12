import React, { Component } from "react";
import "./index.css";
const classNames = require("classnames");

const List = ({ list = [] }) => (
  <ul className="mr-20 matches styled" data-testid="match-list">
    {list.map((match) => (
      <li className="slide-up-fade-in">
        {`Match ${match.name} won by ${match.winner}`}
      </li>
    ))}
  </ul>
);

const NoResults = () => (
  <div data-testid="no-result" className="slide-up-fade-in no-result">
    No Matches Found
  </div>
);

export default class FootballMatchesData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      data: {},
    };
  }

  onClick = (year) => async (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    const response = await fetch(
      "https://jsonmock.hackerrank.com/api/football_competitions?year=" + year
    );
    const data = await response.json();

    this.setState({
      data: data,
      selectedYear: year,
    });
  };

  render() {
    var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    const footballMatches = this.state.data;
    const showList = this.state.selectedYear && footballMatches.total;
    const showNoResults = this.state.selectedYear && !footballMatches.total;
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li
                className={classNames({
                  "sidebar-item": true,
                  active: this.state.selectedYear === year,
                })}
                onClick={this.onClick(year)}
                key={year}
              >
                <a>{year}</a>
              </li>
            );
          })}
        </ul>

        <section className="content">
          {showList && (
            <section>
              <div
                className="total-matches"
                data-testid="total-matches"
              >{`Total Matches : ${footballMatches.total}`}</div>
              <List list={footballMatches.data} />
            </section>
          )}

          {showNoResults && <NoResults />}
        </section>
      </div>
    );
  }
}
