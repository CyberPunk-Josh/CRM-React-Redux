import { Grid, TextField, Button, Link } from '@mui/material'
import { Link as RouterLink} from 'react-router-dom'

import { AuthLayout } from '../layout/AuthLayout'

export const RegisterPage = () => {
  return (
    <AuthLayout title="Create Account">
        <form>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2}}>
              <TextField
                label='Name'
                type='text'
                placeholder='Your Name'
                fullWidth
                name='name'
              />
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2}}>
              <TextField
                label='Email'
                type='email'
                placeholder='Correo@google.com'
                fullWidth
                name='email'
              />
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2}}>
              <TextField
                label='Password'
                type='password'
                placeholder='password'
                fullWidth
                name='password'
              />
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2}}>
              <TextField
                label='Repeat Password'
                type='password'
                placeholder='Repeat Password'
                fullWidth
                name='password'
              />
            </Grid>

            <Grid container  alignItems='center' justifyContent='center' spacing={2} sx={{ mb: 2, mt:1 }}>
              <Grid item xs={12} sm={6}>
                <Button 
                  type='submit' 
                  variant='contained' 
                  fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='end'>
              <Link component={RouterLink} color='inherit' to='/auth/login'>
                Login
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}
