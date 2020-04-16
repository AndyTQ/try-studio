import React, { useEffect } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';

import { forwardRef } from 'react';


import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Add from '@material-ui/icons/Add'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Table = ({ title, licenses }) => {
 
  const [state, setState] = React.useState({
    columns: [
      { title: 'License ID', field: 'licenseId', type: 'string' },
      { title: 'Business', field: 'business', type: 'string' },
      { title: 'Expires', field: 'expires', type: 'string' },
      { title: 'Price', field: 'price', type: 'numeric' },
      { title: 'Plan', field: 'plan', type: 'string' }
    ],
    data: licenses,
  });

  useEffect(() => {
    setState({
      ...state,
      data: licenses,
    });
  }, [licenses]);

  return (
    <MaterialTable
      icons={tableIcons}
      title="Licenses"
      columns={state.columns}
      data={state.data}
      style={{
        boxShadow: 'rgba(53, 64, 82, 0.05) 0px 0px 14px 0px',
      }}
      components={{
        Pagination: props => (
          <div>
            <TablePagination
              {...props}
              rowsPerPageOptions={[]}
              rowsPerPage={10}
            />
          </div>
        ),
        Toolbar: props => ( // Override the original toolbar
          <div>
            <MTableToolbar {...props}
              title={
                <Typography component="h1" variant="h6" color="inherit">
                  {title}
                  {/* Attempted to use Redirect and history.push but did not work. */}
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Add />}
                    href="/newlicense"
                    style={{ marginLeft: '15px' }}
                  >
                    Add New
                  </Button>
                </Typography>
              }
            />
          </div>
        )
      }}
      options={{
        rowStyle: {
          backgroundColor: '#FFF',
        },
        headerStyle: {
          backgroundColor: '#FFF',
          color: 'primary',
        },
        exportButton: true,
        pageSize: 11, // Some number large enough so that it expands to the entire page...
      }}
    />
  );
};

export default Table;
