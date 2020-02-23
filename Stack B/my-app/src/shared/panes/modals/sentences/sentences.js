import React from "react";
import { Table, Button, Modal, Grid, Dropdown } from "semantic-ui-react";

import { handleSort, generateYearsSelection } from "../../../shared-functions";
import { maxHeaderSize } from "http";

class SentencesModal extends React.Component {
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
    if (this.props.sentences !== prevProps.sentences) {
      this.setState({ data: this.props.sentences }, () => {
        this.generateSentencingData();
      });
    }
  }
  componentDidMount() {
    const maxYear = new Date().getFullYear() - 1;
    const { yearsDropdown } = generateYearsSelection(maxYear);
    console.log("years : ", yearsDropdown);
    this.setState({ dropdownYear: maxYear, yearsDropdown: yearsDropdown });
  }

  generateSentencingData = () => {
    const filteredSentences = this.props.sentences.map(sentence => {
      let sentences = 0;
      sentence.years.forEach(year => {
        if (year.year === this.state.dropdownYear) {
          sentences = year.sentence;
        }
      });

      return { state: sentence.state, sentences: sentences };
    });

    this.setState({ data: filteredSentences });
  };

  handleYearChange = (event, data) => {
    this.setState({ dropdownYear: data.value }, () => {
      this.generateSentencingData();
    });
  };

  createSentencesModal = () => {
    return (
      this.props.currentModal === "sentencingModal" && (
        <React.Fragment>
          <Modal
            closeIcon
            size={"large"}
            open={this.props.currentModal === "sentencingModal"}
            onClose={this.props.handleHide}
          >
            <Modal.Header>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={12}>
                    Sentencing by state ({this.props.stateName})
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
                        this.state.column === "sentences"
                          ? this.state.direction
                          : null
                      }
                      onClick={() =>
                        this.handleSort(
                          "sentences",
                          this.state.column,
                          this.state.data,
                          this.state.direction
                        )
                      }
                    >
                      Sentences
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.data.length > 0 &&
                    this.state.data.map((sentence, index) => {
                      return (
                        <React.Fragment key={index}>
                          <Table.Row>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{sentence.state}</Table.Cell>
                            <Table.Cell>{sentence.sentences}</Table.Cell>
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
    return <React.Fragment>{this.createSentencesModal()}</React.Fragment>;
  }
}

export default SentencesModal;
