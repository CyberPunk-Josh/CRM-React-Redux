import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ButtonGroup, IconButton, Tooltip } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'


import {startDeleteStore} from '../../store/stores/thunks';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export const StoreTable = ({stores}) => {

  const dispatch = useDispatch();

  const handleDeleteStore = (store) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          dispatch(startDeleteStore(store));
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong, please try again later',
          })
        }
      }
    })
  }

  const handleEditStore = (store) => {
    console.log(store);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Country</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Officer</StyledTableCell>
            <StyledTableCell align="right">Warehouse</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stores.map((store) => (
            <StyledTableRow key={store.id}>
              <StyledTableCell component="th" scope="row">
                {store.country}
              </StyledTableCell>
              <StyledTableCell align="right">{store.city}</StyledTableCell>
              <StyledTableCell align="right">{store.name}</StyledTableCell>
              <StyledTableCell align="right">{store.officer}</StyledTableCell>
              <StyledTableCell align="right">{store.warehouse}</StyledTableCell>
              <StyledTableCell align="right">
                <ButtonGroup align="contained" aria-label="outlined primary button group">
                  <Tooltip title='Delete'>
                    <IconButton
                        onClick={ () => handleDeleteStore(store) }
                    >
                      <DeleteOutline/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Edit'>
                    <IconButton
                      onClick={ () => handleEditStore(store) }
                    >
                      <EditOutlined />
                    </IconButton>
                  </Tooltip>
                </ButtonGroup>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
