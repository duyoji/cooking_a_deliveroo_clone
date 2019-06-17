import RestaurantList from "../components/RestaurantList";
import React from "react";

import {
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Container
} from "reactstrap";

class Index extends React.Component {
  static displayName = 'pages/index';
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  onChange(e) {
    this.setState({ query: e.target.value.toLowerCase() });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <div className="search">
              <InputGroup>
                <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                <Input onChange={this.onChange.bind(this)} />
              </InputGroup>
            </div>
            <RestaurantList search={this.state.query} />
          </Col>
        </Row>
        <style jsx>
          {`
            .search {
              margin: 20px;
              width: 500px;
            }
          `}
        </style>
      </Container>
    );
  }
};


export default Index;