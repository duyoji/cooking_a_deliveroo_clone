import gql from "graphql-tag";
import { Query } from 'react-apollo'
import { withContext } from "../components/Context/AppProvider";
import Cart from "../components/Cart/Cart";

import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row
} from "reactstrap";

const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;


const Restaurants = (props) => {
  const { isAuthenticated } = props;

  const addItem = (item) => {
    props.context.addItem(item);
  };

  return (
    <Query
      query={GET_RESTAURANT_DISHES}
      variables={{id: props.router.query.id}}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        const restaurant = data.restaurant;

        if ( !restaurant ) return (<h1>Not Found</h1>);

        return (
          <>
            <h1>{restaurant.name}</h1>
            <Row>
              <Col xs="9" style={{ padding: 0 }}>
                <div style={{ display: "inline-block" }} className="h-100">
                  {restaurant.dishes.map(res => (
                    <Card
                      style={{ width: "30%", margin: "0 10px" }}
                      key={res.id}
                    >
                      <CardImg
                        top={true}
                        style={{ height: 250 }}
                        src={`http://localhost:1337${res.image.url}`}
                      />
                      <CardBody>
                        <CardTitle>{res.name}</CardTitle>
                        <CardText>{res.description}</CardText>
                      </CardBody>
                      <div className="card-footer">
                        <Button
                          onClick={ addItem.bind(null, res) }
                          outline
                          color="primary"
                        >
                          + Add To Cart
                        </Button>

                        <style jsx>
                          {`
                            a {
                              color: white;
                            }
                            a:link {
                              text-decoration: none;
                              color: white;
                            }
                            .container-fluid {
                              margin-bottom: 30px;
                            }
                            .btn-outline-primary {
                              color: #007bff !important;
                            }
                            a:hover {
                              color: white !important;
                            }
                          `}
                        </style>
                      </div>
                    </Card>
                  ))}
                </div>
              </Col>
              <Col xs="3" style={{ padding: 0 }}>
                <div>
                <Cart
                  isAuthenticated={isAuthenticated}
                  router={props.router}
                />
                </div>
              </Col>
            </Row>
          </>
        );
      }}
    </Query>
  );
};

Restaurants.displayName = 'pages/restaurants';

export default withContext(Restaurants);