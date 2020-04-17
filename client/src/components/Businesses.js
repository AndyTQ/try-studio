import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { getBusinesses } from '../redux/actions/dashActions';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from './Table';
import Modal from './Modal';
import BusinessIcon from '@material-ui/icons/Business';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  content: {
    width: 345,
    margin: 20,
    boxShadow: "0 0 14px 0 rgba(53,64,82,.1)",
  },
  card: {
    whiteSpace: "pre",
  },
});

const image = {
  cafe: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2862&q=80",
  karaoke: "https://images.unsplash.com/photo-1485579149621-3123dd979885?ixlib=rb-1.2.1&auto=format&fit=crop&w=2978&q=80",
}

const Businesses = props => {
  const { businesses, getBusinesses } = props;

  const [ showLicense, setShowLicense ] = useState(false);
  const [ showNewBusiness, setShowNewBusiness ] = useState(false);

  const classes = useStyles();



  useEffect(() => {
    getBusinesses();
  }, []);

  return (
    <div className={classes.root}>
      {businesses.map(business => (
        <Card key={business.name} className={classes.content}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Café"
              height="140"
              image={image[business.type]}
              title="Café"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {business.name}
              </Typography>
              <Typography className={classes.card} variant="body2" color="textSecondary" component="p">
                {`${business.address}\n`}
                {`Licenses: ${business.licenses.length}`}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button variant='outlined' color='primary' onClick={() => {setShowLicense(true);}}> Licenses </Button>
            <Modal name="Licenses" open={showLicense} handleClose={() => {setShowLicense(false);}}> 
              <Table title="Licenses"></Table>
            </Modal>
          </CardActions>
        </Card>
      ))}
      <Card className={classes.content}>
        <Button onClick={() => {setShowNewBusiness(true);}} style={{height: '100%', width: '100%'}}>
          <div align='center'>
            <BusinessIcon style={{ fontSize: '150px', color: 'grey'}}/>
            <Typography align='center' style={{color: 'grey'}}gutterBottom variant="h5" component="h2">
            Add A New Business
            </Typography>
          </div>
        </Button>
        <Modal name="Licenses" open={showNewBusiness} handleClose={() => {setShowNewBusiness(false);}}> 
          <Table title="Licenses"></Table>
        </Modal>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    businesses: state.dash.businesses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinesses: () => dispatch(getBusinesses())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
