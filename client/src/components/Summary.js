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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export default function Summary({data, summaryType}) {
  const classes = useStyles();
  const keys = Object.keys(data);
  const rows = [];


  // Object.keys(data).foreach((key) => {
  //   rows.push(createData(key, data[key]))
  // });
  keys.forEach(function (key){
    switch (key){
      case "licenses":
        break;
      case "cmo":
        rows.push(createData(capitalizeFirstLetter("Licensing Company"), data[key]));
        break;
      default:
        rows.push(createData(capitalizeFirstLetter(key), data[key]));
        break;
    }
  })

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