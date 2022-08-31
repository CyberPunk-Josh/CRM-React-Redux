import { AdminLayout } from '../layout/AdminLayout'
import { Box, Button, Grid, InputLabel, Modal, Typography, Select, MenuItem, TextField} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startNewWarehouse } from '../../store/warehouse/thunks';
import { WareHouseTable } from '../components/WareHouseTable';


export const WareHouse = () => {

  const dispatch = useDispatch();

  const { wareHouses } = useSelector( state => state.warehouse );
  
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

  const handleSelectWarehouse = (e) => {
    setWareHouse({
      ...wareHouse,
      [e.target.name] : e.target.value
    })
  }

  const onHandleWarehouseSubmit = (e) => {
    e.preventDefault();
    if(country.trim() === '' || city.trim() === '' || name.trim() === '' || capacity.trim() === '' || officer.trim() === '' || category.trim() === '') {
      handleCloseModal()
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required',
      })
      return;
    }
    try {
      dispatch(startNewWarehouse({country, city, name, capacity, officer, category}));
      handleCloseModal()
      setWareHouse({
        country: '',
        city: '',
        name: '',
        capacity: '',
        officer: '',
        category: ''
      })
      Swal.fire({
        icon: 'success',
        title: 'Created Successfully',
        text: 'Warehouse Created Successfully',
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong, please try again later',
      })
    }
  }

  const onHandleCancelModal = (e) => {
    e.preventDefault();
    handleCloseModal()
    setWareHouse({
      country: '',
      city: '',
      name: '',
      capacity: '',
      officer: '',
      category: ''
    })
  }

  return (
    <AdminLayout>
      <Grid
        container
        direction='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Grid
          item
        >
          <Typography variant="h3" component='div' sx={{marginBottom: '10px'}}>
            Warehouses
          </Typography>
        </Grid>
        <Grid
          item
        >
          <Button 
            variant='outlined' 
            endIcon={<AddCircle/>}
            onClick={handleOpenModal}
          >
            Add
          </Button>
        </Grid>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Add a new WareHouse
            </Typography>
            <form
              onSubmit={onHandleWarehouseSubmit} 
              id='modal-modal-description' 
              sx={{ mt: 2}} 
            >
              <Grid container direction='row' alignItems='center' justifyContent='center' >
                <Grid item xs={ 6 } sx={{ mt: 2, width: 200}}>
                  <InputLabel id='country-select-label'>Country</InputLabel>
                  <Select
                    labelId='country-select-label'
                    id='country-select'
                    value={country}
                    name='country'
                    label='Country'
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
                  Create
                </Button>
                <Button
                  sx={{ mt: 1}}
                  variant="outlined" 
                  color="error"
                  fullWidth
                  onClick={onHandleCancelModal}
                >
                  Cancel
                </Button>
              </Grid>
            </form>
          </Box>
        </Modal>
        <WareHouseTable
          wareHouses={wareHouses}
        />
      </Grid>
      
    </AdminLayout>
  )
}
