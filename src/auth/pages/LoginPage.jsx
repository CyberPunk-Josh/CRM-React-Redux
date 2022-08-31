import { Google } from '@mui/icons-material'
import { Grid, TextField, Button, Typography, Link } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Link as RouterLink} from 'react-router-dom'
import { startGoogleSignIn } from '../../store/auth/thunk'

import { AuthLayout } from '../layout/AuthLayout'

export const LoginPage = () => {

  const dispatch = useDispatch();

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">
        <form>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2}}>
              <TextField
                label='Correo'
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

            <Grid container spacing={2} sx={{ mb: 2, mt:1 }}>
              <Grid item xs={12} sm={6}>
                <Button 
                  type='submit' 
                  variant='contained' 
                  fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                 onClick={onGoogleSignIn}
                 variant='contained' 
                 fullWidth
                 >
                  <Google/>
                  <Typography sx={{ ml:1 }} >Google</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='end'>
              <Link component={RouterLink} color='inherit' to='/auth/register'>
                Create Account
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}
