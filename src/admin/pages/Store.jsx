import React, { useState } from 'react'
import { AddCircle } from '@mui/icons-material'
import { Box, Button, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'

import { AdminLayout } from '../layout/AdminLayout'
import {StoreTable} from '../components/StoreTable'
import { startNewStore } from '../../store/stores/thunks'

export const Store = () => {

  const dispatch = useDispatch();

  const { stores } = useSelector( state => state.store );
  const { wareHouses } = useSelector( state => state.warehouse );

  const [store, setStore] = useState({
    country: '',
    city: '',
    name: '',
    wareHouse: '',
    officer: '',
  })

  const { country, city, name, wareHouse, officer } = store;

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

  const handleSelectStore = (e) => {
    setStore({
      ...store,
      [e.target.name] : [e.target.value]
    })
  }

  const handleStoreSubmit = (e) => {
    e.preventDefault();
    if(country.length === 0 || city.length === 0 || name.length === 0  || wareHouse.length === 0  || officer.length === 0 ) {
      handleCloseModal()
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required',
      })
      return;
    }
    try {
      dispatch(startNewStore({ country, city, name, wareHouse, officer }));
      handleCloseModal()
      setStore({
        country: '',
        city: '',
        name: '',
        wareHouse: '',
        officer: '',
      })
      Swal.fire({
        icon: 'success',
        title: 'Created Successfully',
        text: 'Store Created Successfully',
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required',
      })
    }
  }

  const onHandleCancelModal = (e) => {
    e.preventDefault();
    handleCloseModal()
    setStore({
      country: '',
      city: '',
      name: '',
      wareHouse: '',
      officer: '',
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
          <Typography variant='h3' component='div' sx={{marginBottom: '10px'}}>
            Stores
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
            <Typography id="modal-modal-title" variant="h6" component='h2'>
              Add a new Store
            </Typography>
            <form
              onSubmit={handleStoreSubmit}
              id='modal-modal-description'
              sx={{ mt: 2 }}
            >
              <Grid container direction="row" alignItems='center' justifyContent='center'>
                <Grid item xs={ 6 } sx={{ mt: 2, width: 200}}>
                  <InputLabel id='warehouse-select-label'>WareHouse</InputLabel>
                    <Select
                      labelId='warehouse-select-label'
                      id='warehouse-select'
                      value={wareHouse}
                      name='wareHouse'
                      label='Warehouse'
                      onChange={handleSelectStore}
                    >
                    {wareHouses.map((warehouseData) => (
                      <MenuItem value={warehouseData.name} key={warehouseData.id}>{warehouseData.name}</MenuItem>
                    ))}
                    </Select>
                </Grid>
                <Grid item xs={ 6 } sx={{ mt: 2, width: 200}}>
                  <InputLabel id='warehouse-select-label'>Country</InputLabel>
                    <Select
                      labelId='warehouse-select-label'
                      id='warehouse-select'
                      value={country}
                      name='country'
                      label='Country'
                      onChange={handleSelectStore}
                    >
                    {wareHouses.map((warehouseData) => (
                      <MenuItem value={warehouseData.country} key={warehouseData.id}>{warehouseData.country}</MenuItem>
                    ))}
                    </Select>
                </Grid>
                <Grid item xs={ 6 } sx={{ mt: 2, width: 200}}>
                  <InputLabel id='warehouse-select-label'>City</InputLabel>
                    <Select
                      labelId='warehouse-select-label'
                      id='warehouse-select'
                      value={city}
                      name='city'
                      label='City'
                      onChange={handleSelectStore}
                    >
                    {wareHouses.map((warehouseData) => (
                      <MenuItem value={warehouseData.city} key={warehouseData.id}>{warehouseData.city}</MenuItem>
                    ))}
                    </Select>
                </Grid>
                <Grid item xs={ 6 } sx={{ mt: 2, width:200}}>
                    <TextField 
                      label='Name'
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={handleSelectStore}
                    />
                </Grid>
                <Grid item xs={ 12 } sx={{ mt: 2, width:200}}>
                    <TextField 
                      label='Officer'
                      type="text"
                      placeholder="Officer"
                      name="officer"
                      value={officer}
                      onChange={handleSelectStore}
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
                  onClick={ onHandleCancelModal }
                >
                  Cancel
                </Button>
              </Grid>
            </form>
          </Box>
        </Modal>
        <StoreTable
          stores={stores}
        />
      </Grid>
    </AdminLayout>
  )
}
