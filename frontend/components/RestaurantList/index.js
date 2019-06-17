import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from "next/link";

import {
  Card,
  CardBody,
  CardImg,
} from "reactstrap";
import { CardText, CardTitle } from "reactstrap";

const GET_RESTAURANT_LIST = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

const RestaurantList = ({ search }) => (
  <Query query={GET_RESTAURANT_LIST}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      const restaurants = data.restaurants;
      if (!restaurants || !restaurants.length) return (<h1>No Restaurants Found</h1>);

      const searchQuery = restaurants.filter(query =>
        query.name.toLowerCase().includes(search)
      );
      if (searchQuery.length === 0) return (<h1>Searched, but no results</h1>);

      return (
        <div>
          <div className="h-100">
            {searchQuery.map(res => (
              <Card
                style={{ width: "30%", margin: "0 10px" }}
                className="h-100"
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
                  <Link
                    as={`/restaurants/${res.id}`}
                    href={`/restaurants?id=${res.id}`}
                  >
                    <a className="btn btn-primary">View</a>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </div>
      );
    }}
  </Query>
);

RestaurantList.displayName = 'components/RestaurantList/index';

export default RestaurantList;