import React from "react";
import { Table, Button, Modal, Grid, Dropdown } from "semantic-ui-react";

import { handleSort } from "../../../shared-functions";
import moment from "moment";

class DeathRowModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: this.props.currentModal,
      column: null,
      direction: null,
      data: [],
      yearsDropdown: [],
      dropdownYear: null
    };
  }

  handleSort = (clickedColumn, column, data, direction) =>
    this.setState(handleSort(clickedColumn, column, data, direction));

  componentDidUpdate(prevProps) {
    if (this.props.inmates !== prevProps.inmates) {
      this.setState({ data: this.props.inmates }, () => {
        const years = [
          ...new Set(this.state.data.map(inmate => inmate.date.getFullYear()))
        ];

        const yearForDropdown = Math.max.apply(null, years);

        const yearsBuilder = years.map(year => ({
          key: year,
          value: year,
          text: year
        }));

        this.setState(
          {
            dropdownYear: yearForDropdown,
            yearsDropdown: yearsBuilder
          },
          () => {
            this.generateDeathRowData();
          }
        );
      });
    }
  }

  generateDeathRowData = () => {
    const filteredInmates = this.props.inmates.filter(inmate => {
      return inmate.date.getFullYear() === this.state.dropdownYear;
    });
    this.setState({ data: filteredInmates });
  };

  handleYearChange = (event, data) => {
    this.setState({ dropdownYear: data.value }, () => {
      this.generateDeathRowData();
    });
  };

  createDeathRowModal = () => {
    return (
      this.props.currentModal === "deathRowModal" && (
        <React.Fragment>
          <Modal
            closeIcon
            size={"large"}
            open={this.props.currentModal === "deathRowModal"}
            onClose={this.props.handleHide}
          >
            <Modal.Header>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={12}>
                    Death row ({this.props.stateName})
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Dropdown
                      placeholder="Select year"
                      value={this.state.dropdownYear}
                      search
                      selection
                      fluid
                      options={this.state.yearsDropdown}
                      onChange={this.handleYearChange}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Header>
            <Modal.Content>
              <Table celled sortable fixed>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "state"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "state",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      State
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "date"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "date",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Date
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "total"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "total",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Total
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "white"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "white",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      White
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "black"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "black",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Black
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "latino/a"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "latino/a",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Latino/a
                    </Table.HeaderCell>{" "}
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "native american"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "native american",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Native American
                    </Table.HeaderCell>{" "}
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "asian"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "asian",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Black
                    </Table.HeaderCell>{" "}
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "unknown"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "unknown",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Unknown
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.data.length > 0 &&
                    this.state.data.map((inmate, index) => {
                      return (
                        <React.Fragment key={index}>
                          <Table.Row>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{inmate.state}</Table.Cell>
                            <Table.Cell>
                              {moment(inmate.date).format("DD/MM/YYYY")}
                            </Table.Cell>

                            <Table.Cell>{inmate.total}</Table.Cell>

                            <Table.Cell>{inmate.races.white}</Table.Cell>

                            <Table.Cell>{inmate.races.black}</Table.Cell>

                            <Table.Cell>{inmate.races["latino/a"]}</Table.Cell>

                            <Table.Cell>
                              {inmate.races["native american"]}
                            </Table.Cell>

                            <Table.Cell>{inmate.races["asian"]}</Table.Cell>

                            <Table.Cell>{inmate.races["unknown"]}</Table.Cell>
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
    return <React.Fragment>{this.createDeathRowModal()}</React.Fragment>;
  }
}

export default DeathRowModal;
