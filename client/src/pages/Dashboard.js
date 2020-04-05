import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { getBusinesses } from '../redux/actions/dashActions';
import { Redirect } from 'react-router-dom'; // for navigating back to sign-in page if there's no auth.

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
  card: {
    whiteSpace: "pre",
  }
});

const image = {
  cafe: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2862&q=80",
  karaoke: "https://images.unsplash.com/photo-1485579149621-3123dd979885?ixlib=rb-1.2.1&auto=format&fit=crop&w=2978&q=80",
}

const Dashboard = props => {
  const { auth, businesses, getBusinesses } = props;
  const classes = useStyles();

  useEffect(() => {
    getBusinesses();
  }, []);

  if (!auth.uid) {
    return <Redirect to='/' />;
  }

  return (
    <div className={classes.container}>
      {businesses.map(business => (
        <Card key={business.name} className={classes.root}>
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
            <Button size="small" color="primary">
              Licenses
            </Button>
            <Button size="small" color="primary">
              Edit
            </Button>
          </CardActions>
        </Card>
      ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
