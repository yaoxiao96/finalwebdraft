import React from 'react';
import {
  List, Tag, Typography, Card, Divider, Descriptions, Row, Col, Steps,
} from 'antd';
import graphQLFetch from './graphQLFetch.js';
import './styles/antStyle.less';

const { Title } = Typography;
const { Step } = Steps;

export default class ApartmentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apartment: {},
    };
  }

  componentDidMount() {
    this.loadData();
  }

  // TODO: add description
  //need to adjust according to the content in json file
  async loadData() {
    const query = `query apartmentInfo($id: ID!){
      apartmentInfo(id: $id) {
        // id author{name} title img created
        // description ingredients steps tags
      }
    }`;
     //need to change to hook
    const { match: { params: { id } } } = this.props;
    // const data = await graphQLFetch(query, { id });
    // this.setState({ recipe: data.recipeInfo });
  }

  render() {
    const {  apartment: { id } } = this.state;
    // const { match: { params: { id: propsId } } } = this.props;

    if (id == null) {
      // if (propsId != null) {
      //   return <h3>{`Recipe with ID ${propsId} not found.`}</h3>;
      // }
      return null;
    }

    const { apartment } = this.state;

    return (
      <div className="site-layout-content">
        <div className="detail-section">
          <div className="item">
            <div className="title-layout">
              <Title level={2} className="title">{apartment.title}</Title>
            </div>
            <Row justify="space-around" align="middle">
              <Col lg={12}>
                <img src={apartment.img} alt="img" />
              </Col>
              <Col lg={12}>
                <p>
                  Title:
                  {'   '}
                  {apartment.title}
                </p>
                <p>
                  Price:
                  {'   '}
                  {apartment.price}
                </p>
                <p>
                 Date:
                  {'   '}
                  {apartment.date}
                </p>
                <p>
                 Neighborhood Info:
                  {'   '}
                  {apartment.neighborhood}
                </p>
                 <p>
                 Housing:
                  {'   '}
                  {apartment.housing}
                </p>
                 <p>
                 Address:
                  {'   '}
                  {apartment.mapaddress}
                </p>
                 <p>
                 Note:
                  {'   '}
                  {apartment.attrgroup}
                </p>

                <p>
                  Tags:
                  {'   '}
                  {
                    apartment.tags.map((tag, index) => (
                      <Tag key={index} color="magenta">{tag}</Tag>
                    ))
                  }
                </p>
                <div className="description">
                  <Descriptions title="Description">
                    <Descriptions.Item>{apartment.description}</Descriptions.Item>
                  </Descriptions>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}