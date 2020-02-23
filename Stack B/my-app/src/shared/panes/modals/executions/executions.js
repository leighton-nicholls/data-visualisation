import React from "react";
import { Table, Button, Modal } from "semantic-ui-react";

import moment from "moment";
import { handleSort } from "../../../shared-functions";

class ExecutionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: this.props.currentModal,
      column: null,
      direction: null
    };
  }

  handleSort = (clickedColumn, column, data, direction) =>
    this.setState(handleSort(clickedColumn, column, data, direction));

  componentDidMount() {
    this.props.finishLoading();
  }

  createExecutionsModal = () => {
    return (
      this.props.currentModal === "executionsModal" && (
        <React.Fragment>
          <Modal
            centered
            closeIcon
            size={"fullscreen"}
            open={this.props.currentModal === "executionsModal"}
            onClose={this.props.handleHide}
          >
            <Modal.Header>Executions ({this.props.stateName})</Modal.Header>
            <Modal.Content>
              <Table celled sortable fixed>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "execution_number"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "execution_number",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Execution Number
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "first_name"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "first_name",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      First Name
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "middle_name"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "middle_name",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Middle Name
                    </Table.HeaderCell>

                    <Table.HeaderCell
                      sorted={
                        this.state.column === "last_name"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "last_name",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Last Name
                    </Table.HeaderCell>

                    <Table.HeaderCell
                      sorted={
                        this.state.column === "execution_date"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "execution_date",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Execution Date
                    </Table.HeaderCell>
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
                        this.state.column === "county"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "county",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      County
                    </Table.HeaderCell>

                    <Table.HeaderCell
                      sorted={
                        this.state.column === "region"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "region",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Region
                    </Table.HeaderCell>

                    <Table.HeaderCell
                      sorted={
                        this.state.column === "execution_method"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "execution_method",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Execution Method
                    </Table.HeaderCell>

                    <Table.HeaderCell
                      sorted={
                        this.state.column === "age_at_execution"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "age_at_execution",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Age At Execution
                    </Table.HeaderCell>

                    <Table.HeaderCell
                      sorted={
                        this.state.column === "race"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "race",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Race
                    </Table.HeaderCell>

                    <Table.HeaderCell
                      sorted={
                        this.state.column === "gender"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "gender",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Gender
                    </Table.HeaderCell>

                    <Table.HeaderCell
                      sorted={
                        this.state.column === "execution_volunteer"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "execution_volunteer",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Volunteer
                    </Table.HeaderCell>

                    <Table.HeaderCell
                      sorted={
                        this.state.column === "foreign_national"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "foreign_national",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Foreign National
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "number_of_victims"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "number_of_victims",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Number of Victims
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.props.executions.length > 0 &&
                    this.props.executions.map((execution, index) => {
                      return (
                        <React.Fragment key={index}>
                          <Table.Row>
                            <Table.Cell>
                              {execution.execution_number}
                            </Table.Cell>
                            <Table.Cell>{execution.first_name}</Table.Cell>
                            <Table.Cell>{execution.middle_name}</Table.Cell>
                            <Table.Cell>{execution.last_name}</Table.Cell>
                            <Table.Cell>
                              {moment(execution.execution_date).format(
                                "DD/MM/YYYY"
                              )}
                            </Table.Cell>
                            <Table.Cell>{execution.state}</Table.Cell>
                            <Table.Cell>{execution.county}</Table.Cell>

                            <Table.Cell>{execution.region}</Table.Cell>
                            <Table.Cell>
                              {execution.execution_method}
                            </Table.Cell>
                            <Table.Cell>
                              {execution.age_at_execution}
                            </Table.Cell>
                            <Table.Cell>{execution.race}</Table.Cell>
                            <Table.Cell>{execution.gender}</Table.Cell>
                            <Table.Cell>
                              {execution.execution_volunteer}
                            </Table.Cell>
                            <Table.Cell>
                              {execution.foreign_national}
                            </Table.Cell>
                            <Table.Cell>
                              {execution.number_of_victims}
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
    return <React.Fragment>{this.createExecutionsModal()}</React.Fragment>;
  }
}

export default ExecutionsModal;
