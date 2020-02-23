import React from "react";
import { Table, Button, Modal } from "semantic-ui-react";

class CountiesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: this.props.currentModal
    };
  }

  createCountiesModal = () => {
    return (
      this.props.currentModal === "countiesModal" && (
        <React.Fragment>
          <Modal
            closeIcon
            size={"large"}
            open={this.props.currentModal === "countiesModal"}
            onClose={this.props.handleHide}
          >
            <Modal.Header>Counties ({this.props.stateName})</Modal.Header>
            <Modal.Content>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>County</Table.HeaderCell>
                    <Table.HeaderCell>Total</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {Object.keys(this.props.countiesSummary.countyTotals).length >
                    0 &&
                    Object.keys(this.props.countiesSummary.countyTotals).map(
                      (key, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Table.Row>
                              <Table.Cell>{index + 1}</Table.Cell>
                              <Table.Cell>{key}</Table.Cell>
                              <Table.Cell>
                                {this.props.countiesSummary.countyTotals[key]}
                              </Table.Cell>
                            </Table.Row>
                          </React.Fragment>
                        );
                      }
                    )}
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
    return <React.Fragment>{this.createCountiesModal()}</React.Fragment>;
  }
}

export default CountiesModal;
