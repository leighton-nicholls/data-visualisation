import React from "react";
import { Table, Button, Modal } from "semantic-ui-react";

import { handleSort } from "../../../shared-functions";

class InnocenceModal extends React.Component {
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

  createInnocenceModal = () => {
    return (
      this.props.currentModal == "innocenceModal" && (
        <React.Fragment>
          <Modal
            closeIcon
            size={"large"}
            open={this.props.currentModal === "innocenceModal"}
            onClose={this.props.handleHide}
          >
            <Modal.Header>Innocence ({this.props.stateName})</Modal.Header>
            <Modal.Content>
              <Table celled sortable fixed>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "innocence_number"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "innocence_number",
                          this.state.column,
                          this.props.innocents,
                          this.state.direction
                        )
                      }
                    >
                      Innocence Number #
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "innocence_number"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "name",
                          this.state.column,
                          this.props.innocents,
                          this.state.direction
                        )
                      }
                    >
                      Name
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "name"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "state",
                          this.state.column,
                          this.props.innocents,
                          this.state.direction
                        )
                      }
                    >
                      State
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "state"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "race",
                          this.state.column,
                          this.props.innocents,
                          this.state.direction
                        )
                      }
                    >
                      Race
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "race"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "convicted",
                          this.state.column,
                          this.props.innocents,
                          this.state.direction
                        )
                      }
                    >
                      Convicted
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "convicted"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "exonerated",
                          this.state.column,
                          this.props.innocents,
                          this.state.direction
                        )
                      }
                    >
                      Exonerated
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "exonerated"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "years_between",
                          this.state.column,
                          this.props.innocents,
                          this.state.direction
                        )
                      }
                    >
                      Years between
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "years_between"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "exoneration_procedure",
                          this.state.column,
                          this.props.innocents,
                          this.state.direction
                        )
                      }
                    >
                      Exoneration Procedure
                    </Table.HeaderCell>
                    <Table.HeaderCell>Reasons</Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={
                        this.state.column === "dna"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "dna",
                          this.state.column,
                          this.props.innocents,
                          this.state.direction
                        )
                      }
                    >
                      DNA
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.props.innocents.length > 0 &&
                    this.props.innocents.map((innocent, index) => {
                      return (
                        <React.Fragment key={index}>
                          <Table.Row>
                            <Table.Cell>{innocent.innocence_number}</Table.Cell>
                            <Table.Cell>{innocent.name}</Table.Cell>
                            <Table.Cell>{innocent.state}</Table.Cell>
                            <Table.Cell>{innocent.race}</Table.Cell>

                            <Table.Cell>{innocent.convicted}</Table.Cell>
                            <Table.Cell>{innocent.exonerated}</Table.Cell>

                            <Table.Cell>{innocent.years_between}</Table.Cell>

                            <Table.Cell>
                              {innocent.exoneration_procedure}
                            </Table.Cell>

                            <Table.Cell>
                              {innocent.reasons.map(reason => {
                                return reason;
                              })}
                            </Table.Cell>

                            <Table.Cell>{innocent.dna.toString()}</Table.Cell>
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
    return <React.Fragment>{this.createInnocenceModal()}</React.Fragment>;
  }
}

export default InnocenceModal;
