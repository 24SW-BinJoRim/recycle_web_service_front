import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation, Link } from 'react-router-dom';

const columns = [
  { id: 'id', 
    label: 'NO.', 
    minWidth: 10,
    align: 'center',
  },
  {
    id: 'title',
    label: 'TITLE',
    minWidth: 200,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US'),
    isLink: true,
  },
  {
    id: 'user_id',
    label: 'WRITER',
    minWidth: 10,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'createdAt',
    label: 'DATE',
    minWidth: 10,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'likes',
    label: 'LIKES',
    minWidth: 10,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];

export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const location = useLocation();

  const rows = props.data;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', }}>
      <TableContainer sx={{ maxHeight: 518 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.isLink ? (
                            <Link 
                              to={`${location.pathname}/${row.id}`} 
                              state={{ rowData: row }}
                              onClick={() => console.log(row)}
                              style={{ textDecoration: 'none', color: 'inherit' }}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </Link>
                          ) : (
                            column.format && typeof value === 'number' ? column.format(value) : value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton={true}
        showLastButton={true}
        sx={{
          '.MuiTablePagination-displayedRows': {
            marginTop: '15px',
          },
        }}
      />
    </Paper>
  );
}