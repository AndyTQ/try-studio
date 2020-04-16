import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  wrapper: {
    padding: 10,
    width: 600,
    borderRadius: '15px',
    backgroundColor: 'white',
    boxShadow: "0 0 14px 0 rgba(53,64,82,.05)",
  },

  table: {
    borderColor: 'transparent'
  },
  cell: {
    borderColor: 'transparent'
  }
});

function createData(key, value) {
  return { key, value };
}

const rows = [
  createData('License ID', '1CR482FZCVM'),
  createData('Licensing Company', 'SOCAN'),
  createData('Validity', '1 year'),
  createData('Type of license', 'Dance Studio'),
  createData('Location', 'Bahen Centre for Information Techonology, Toronto, ON, Canada'),
  createData('Price', '39.99 CAD')
];

export default function LicenseSummary() {
  const classes = useStyles();

  return (
    <div align='center' className={classes.content}>
      <div className={classes.wrapper}>
        <Table className={classes.table} >
          {rows.map((row) => (
            <TableRow>
              <TableCell className={classes.cell} component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell className={classes.cell} align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>

  );
}