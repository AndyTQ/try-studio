import { addNewCard, mapStateToProps, mapDispatchToProps } from './Businesses';

const state = {
  firebase:{
    auth: "foo"
  },
  dash:{
    businesses: "bar"
  }
}

const correctmapping = {
  auth: state.firebase.auth,
  businesses: state.dash.businesses
};

it('mapStateToProps', () => {
  const mapping = mapStateToProps(state);
  expect(mapping).toStrictEqual(correctmapping);
}
)

const dispatch = () => {return null};
const getBusinesses = () => {return function getBusinesses(){return null}};
const dispatchMapping = {
  getBusinesses: getBusinesses()
};
