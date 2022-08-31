import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { Box, Button, ButtonGroup, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'

import { startDeleteWarehouse, startUpdateWarehouse } from '../../store/warehouse/thunks';
import { useState } from 'react';


export const WareHouseTable = ({wareHouses}) => {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const [wareHouse, setWareHouse] = useState({
    country: '',
    city: '',
    name: '',
    capacity: '',
    officer: '',
    category: ''
  })

  const { country, city, name, capacity, officer, category } = wareHouse;


  const handleDeleteWareHouse = (wareHouse) => {
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
          dispatch(startDeleteWarehouse(wareHouse));
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

  const handleEditWareHouse = (wareHouse) => {
    handleOpenModal()
    setWareHouse({
      id: wareHouse.id,
      country: wareHouse.country,
      city: wareHouse.city,
      name: wareHouse.name,
      capacity: wareHouse.capacity,
      officer: wareHouse.officer,
      category: wareHouse.category
    })
  }

  const handleSelectWarehouse = (e) => {
    setWareHouse({
      ...wareHouse,
      [e.target.name] : e.target.value
    })
  }

  const handleSaveWarehouse = (e) => {
    e.preventDefault();
    dispatch(startUpdateWarehouse(wareHouse));
    Swal.fire({
      icon: 'success',
      title: 'Updated',
      text: 'Your information has been updated!',
    })
    handleCloseModal();
  }
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }
    
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

  return (
    <>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                  <TableRow>
                  <StyledTableCell>Country</StyledTableCell>
                  <StyledTableCell align="right">City</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Capacity</StyledTableCell>
                  <StyledTableCell align="right">Officer</StyledTableCell>
                  <StyledTableCell align="right">Category</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {wareHouses.map((wareHouse) => (
                  <StyledTableRow key={wareHouse.id}>
                      <StyledTableCell component="th" scope="row">
                      {wareHouse.country}
                      </StyledTableCell>
                      <StyledTableCell align="right">{wareHouse.city}</StyledTableCell>
                      <StyledTableCell align="right">{wareHouse.name}</StyledTableCell>
                      <StyledTableCell align="right">{wareHouse.capacity}</StyledTableCell>
                      <StyledTableCell align="right">{wareHouse.officer}</StyledTableCell>
                      <StyledTableCell align="right">{wareHouse.category}</StyledTableCell>
                      <StyledTableCell align="right">
                      <ButtonGroup variant="contained" aria-label="outlined primary button group">
                          <Tooltip title='Delete'>
                              <IconButton
                                onClick={ () => handleDeleteWareHouse(wareHouse)}
                              >
                              <DeleteOutline/>
                              </IconButton>
                          </Tooltip>
                          <Tooltip title='Edit'>
                              <IconButton
                                onClick={ () => handleEditWareHouse(wareHouse)}
                              >
                              <EditOutlined/>
                              </IconButton>
                          </Tooltip>
                          </ButtonGroup>
                      </StyledTableCell>
                  </StyledTableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-edit-title"
        aria-describedby="modal-edit-description"
      >
        <Box sx={style}>
          <Typography id="modal-edit-title" variant='h6' component='h2'>
            Edit Warehouse
          </Typography>
          <form
            id='modal-edit-description'
            sx={{ mt: 2 }}
            onSubmit={handleSaveWarehouse}
          >
            <Grid container direction='row' alignItems='center' justifyContent='center'>
              <Grid item xs={6} sx={{ mt: 2, width: 200}}>
                    <InputLabel id='country-edit-label' >Country</InputLabel>
                    <Select
                      labelId='country-edit-label'
                      id='country-edit'
                      name='country'
                      label='Country'
                      value={country}
                    onChange={handleSelectWarehouse}
                    >
                      <MenuItem value='Mexico'>Mexico</MenuItem>
                      <MenuItem value='Russia'>Russia</MenuItem>
                      <MenuItem value='China'>China</MenuItem>
                      <MenuItem value='Japan'>Japan</MenuItem>
                    </Select>
              </Grid>
              <Grid item xs={ 6 } sx={{ mt: 2, width: 200}}>
                <TextField
                  label='City'
                  type='text'
                  placeholder='City'
                  name='city'
                  value={city}
                  onChange={handleSelectWarehouse}
                />
              </Grid>
              <Grid item xs={ 6 } sx={{ mt: 2, width: 200}}>
                <TextField
                  label='Warehouse Name'
                  type='text'
                  placeholder='Warehouse Name'
                  name='name'
                  value={name}
                  onChange={handleSelectWarehouse}
                />
              </Grid>
              <Grid item xs={ 6 } sx={{ mt: 2, width: 200}}>
                <TextField
                  label='Capacity'
                  type='text'
                  placeholder='Capacity'
                  name='capacity'
                  value={capacity}
                  onChange={handleSelectWarehouse}
                />
              </Grid>
              <Grid item xs={ 6 } sx={{ mt: 2, width: 200}}>
                <TextField
                  label='Officer'
                  type='text'
                  placeholder='Officer'
                  name='officer'
                  value={officer}
                  onChange={handleSelectWarehouse}
                />
              </Grid>
              <Grid item xs={ 6 } sx={{ mt: 2, width: 200}}>
                <TextField
                  label='Category'
                  type='text'
                  placeholder='Category'
                  name='category'
                  value={category}
                  onChange={handleSelectWarehouse}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2}}>
                <Button
                  variant='contained' 
                  fullWidth
                  type='submit'
                >
                  Edit
                </Button>
                <Button
                  onClick={ () => handleCloseModal() }
                  sx={{ mt: 1}}
                  variant="outlined" 
                  color="error"
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
          </form>
        </Box>
      </Modal>
    </>
  )
}
