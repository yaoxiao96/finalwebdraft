import React from 'react';
import URLSearchParams from 'url-search-params';

import RecipeFilter from './RecipeFilter.jsx';
import RecipeTable from './RecipeTable.jsx';
// import graphQLFetch from './graphQLFetch.js';
import RecipeAddModal from './RecipeAddModal.jsx';

export default class ApartmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apartment: [],
    };
    this.createApartment = this.createApartment.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  async loadData() {
    // for home page, only need the author, img and title
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    let tags = [];
    if (params.get('housing')) {
      tags = tags.concat(params.get('housing').split(','));
    }
    if (params.get('model')) {
      tags = tags.concat(params.get('model').split(','));
    }
    if (params.get('facility')) {
      tags = tags.concat(params.get('facility').split(','));
    }
    const vars = {};
    if (tags.length !== 0) vars.tagfilter = tags;
    const query = `query apartmentList($tagfilter: [String]) {
      apartmentList(tagfilter: $tagfilter) {
        author{name} img title id
      }
    }`;

    // const data = await graphQLFetch(query, vars);
    // if (data) {
    //   this.setState({ recipes: data.recipeList });
    // }
  }

  async createApartment(apartment) {
    const query = `mutation createApartment($apartment: ApartmentInputs!){
      // createApartment(apartment: $apartment) {
      //   id
      // }
    }`;

    const data = await graphQLFetch(query, { apartment });
    if (data) {
      this.loadData();
    }
  }

  render() {
    const { apartments } = this.state;

    return (
      <div className="site-layout-content">
        <React.Fragment>
          <ApartmentFilter />
          <ApartmentTable apartments={apartments} />
          <div className="modal-list">
          </div>
        </React.Fragment>
      </div>
    );
  }
}