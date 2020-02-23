import React from "react";
import { Image, Grid, Header, Button } from "semantic-ui-react";
class HeaderOverall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentWillReceiveProps({ loading }) {
    this.setState({ ...this.state, loading });
  }

  // This header file is the file imported by all panes (both state and overall). It renders the name of the state and flag at the top and also provides
  // a button to the right. Setting it up this way means it can be re-used over and over again
  render() {
    return (
      <React.Fragment>
        <Grid.Row columns={2}>
          <Grid.Column width={13}>
            <Header size="huge">{this.props.stateName}</Header>

            {this.props.stateName === "Federal" ||
            this.props.stateName === "United States" ? (
              <Image src={`/images/flags/normal-res/usa.png`} size="small" />
            ) : (
              <Image
                src={`/images/flags/normal-res/${this.props.stateCode}.png`}
                size="small"
              />
            )}
          </Grid.Column>
          <Grid.Column width={3}>
            <Button
              id={`${this.props.modalToShow}Modal`}
              onClick={e => {
                e.persist();

                this.setState({ loading: true }, () => {
                  setTimeout(() => {
                    this.props.handleShow(e);
                  }, 1000);
                });
              }}
              primary
              loading={this.state.loading}
              disabled={this.props.currentPaneArray.length === 0 ? true : false}
            >
              Show {this.props.currentPane}
            </Button>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }
}

export default HeaderOverall;
