import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const LinearDeterminate = withStyles({
  root: {
    height: 10,
    borderRadius: 20,
  },
  bar: {
    borderRadius: 20,
  },
})(LinearProgress);

export default LinearDeterminate;