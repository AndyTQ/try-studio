import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import LinearDeterminate from './LinearDeterminate';

const useStyles = makeStyles({
  root: {
    height: 155,
    boxShadow: "0 0 14px 0 rgba(53,64,82,.05)",
    display: 'flex'
  },
  container: {
    display: "block",
    flexDirection: "row",
    margin: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    whiteSpace: "pre",
  },
  divider: {
    marginTop: '18px',
    marginBottom: '24px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  cardNumber: {
    marginTop: '10px', marginBottom: '10px'
  },
  cardIncrease: {
    color: 'green', display: 'inline-block'
  },
  cardInfo: {
    color: 'grey', display: 'inline-block', marginLeft: '10px'
  },
  content: {
    padding: '20px',
    flex: '1 0 auto'
  },
  cover: {
    width: 40,
    flexGrow: 1,
    marginRight: 10,
    overflowX: 'hidden'
  },
  space: {
    flexGrow: 1
  }
});

const NumberCard = props => {
  const { title, number, increase, info, imageName } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className={classes.cardTitle} variant="h6">
            {title}
          </Typography>
          <Typography className={classes.cardNumber} component="h6" variant="h4" color="textSecondary">
            {number}
          </Typography>
          <Typography className={classes.cardIncrease} component="subtitle1" variant="subtitle1" >
            {`+${increase}%`}
          </Typography>
          <Typography className={classes.cardInfo} component="subtitle1" variant="subtitle1" >
            {info}
          </Typography>
        </CardContent>
      </div>
      <Typography component="h1" variant="h6" color="textSecondary" noWrap className={classes.space}>
      </Typography>
      <CardMedia
        className={classes.cover}
        image={process.env.PUBLIC_URL + '/' + imageName + '.png'}
        title="Live from space album cover"
      />

    </Card>
  );
}

const ProgressCard = props => {
  const classes = useStyles();
  return (<Card className={classes.root}>
    <div className={classes.content}>
      <Typography variant="h6">
        Recent Application
            </Typography>
      <Typography component="subtitle1" variant="subtitle1" color="textSecondary" style={{ display: 'inline-block' }}>
        ID: 572829
            </Typography>
      <Typography component="subtitle1" variant="subtitle1" style={{ color: 'grey', display: 'inline-block', marginLeft: '10px' }}>
        SOCAN
            </Typography>
      <br></br>
      <Typography component="subtitle1" variant="subtitle1" color="textSecondary" style={{ display: 'inline-block' }}>
        Status: Under Review
            </Typography>
      <LinearDeterminate variant="determinate" value={75} style={{ marginTop: "20px" }} />
    </div>
    <CardMedia
      className={classes.cover}
      image={process.env.PUBLIC_URL + '/' + 'license' + '.png'}
      title="Live from space album cover"
    />
  </Card>);
}

export { NumberCard, ProgressCard };