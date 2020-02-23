import React from "react";
import { Table, Button, Modal, Grid, Dropdown } from "semantic-ui-react";

import { handleSort } from "../../../shared-functions";

class CrimeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: this.props.currentModal,
      column: null,
      direction: null,
      data: []
    };
  }

  handleSort = (clickedColumn, column, data, direction) =>
    this.setState(handleSort(clickedColumn, column, data, direction));

  componentDidUpdate(prevProps) {
    if (this.props.crimes !== prevProps.crimes) {
      this.setState({ data: this.props.crimes });
    }
  }

  createCrimeModal = () => {
    return (
      this.props.currentModal === "crimeModal" && (
        <React.Fragment>
          <Modal
            closeIcon
            size={"fullscreen"}
            open={this.props.currentModal === "crimeModal"}
            onClose={this.props.handleHide}
          >
            <Modal.Header>Crime overall ({this.props.stateName})</Modal.Header>
            <Modal.Content>
              <Table celled sortable fixed>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>

                    <Table.HeaderCell
                      sorted={
                        this.state.column === "year"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "year",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Year
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "population"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "population",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Population
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "violent_crime_total"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "violent_crime_total",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      violent_crime_total
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column ===
                        "murder_and_nonnegligent_manslaugher_total"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "murder_and_nonnegligent_manslaugher_total",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      murder_and_nonnegligent_manslaugher_total
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "legacy_rape_total"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "legacy_rape_total",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      legacy_rape_total
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "revised_rape_total"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "revised_rape_total",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      revised_rape_total
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "robbery_total"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "robbery_total",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      robbery_total
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "aggravated_assault_total"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "aggravated_assault_total",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      aggravated_assault_total
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "violent_crime_rate"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "violent_crime_rate",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      violent_crime_rate
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column ===
                        "murder_and_nonnegligent_manslaugher_rate"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "murder_and_nonnegligent_manslaugher_rate",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      murder_and_nonnegligent_manslaugher_rate
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "legacy_rape_total"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "legacy_rape_total",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      legacy_rape_total
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "revised_rape_total"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "revised_rape_total",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      revised_rape_total
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "violent_crime_rate"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "violent_crime_rate",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      violent_crime_rate
                    </Table.HeaderCell>

                    <Table.HeaderCell
                      sorted={
                        this.state.column === "robbery_rate"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "robbery_rate",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      robbery_rate
                    </Table.HeaderCell>

                    <Table.HeaderCell
                      sorted={
                        this.state.column === "aggravated_assault_rate"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "aggravated_assault_rate",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      aggravated_assault_rate
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.data.length > 0 &&
                    this.state.data.map((crime, index) => {
                      return (
                        <React.Fragment key={index}>
                          <Table.Row>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{crime.year}</Table.Cell>
                            <Table.Cell>{crime.population}</Table.Cell>

                            <Table.Cell>{crime.violent_crime_total}</Table.Cell>

                            <Table.Cell>
                              {crime.murder_and_nonnegligent_manslaughter_total}
                            </Table.Cell>

                            <Table.Cell>{crime.legacy_rape_total}</Table.Cell>

                            <Table.Cell>{crime.revised_rape_total}</Table.Cell>

                            <Table.Cell>{crime.robbery_total}</Table.Cell>

                            <Table.Cell>
                              {crime.aggravated_assault_total}
                            </Table.Cell>

                            <Table.Cell>{crime.violent_crime_rate}</Table.Cell>

                            <Table.Cell>
                              {crime.murder_and_nonnegligent_manslaughter_rate}
                            </Table.Cell>

                            <Table.Cell>{crime.legacy_rape_total}</Table.Cell>

                            <Table.Cell>{crime.revised_rape_total}</Table.Cell>

                            <Table.Cell>{crime.violent_crime_rate}</Table.Cell>

                            <Table.Cell>{crime.robbery_rate}</Table.Cell>

                            <Table.Cell>
                              {crime.aggravated_assault_rate}
                            </Table.Cell>
                          </Table.Row>
                        </React.Fragment>
                      );
                    })}
                </Table.Body>
              </Table>
            </Modal.Content>
            <Modal.Actions>
              <Button
                onClick={this.props.handleHide}
                positive
                icon="close"
                labelPosition="right"
                content="Close"
              />
            </Modal.Actions>
          </Modal>
        </React.Fragment>
      )
    );
  };

  render() {
    return <React.Fragment>{this.createCrimeModal()}</React.Fragment>;
  }
}

export default CrimeModal;
