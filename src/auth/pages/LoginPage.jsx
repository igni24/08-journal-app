import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';

import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';

const formData = {
  email: '',
  password: ''
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(startLoginWithEmailPassword(email, password));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              name='email'
              placeholder="correo@dominio.com"
              value={email}
              fullWidth
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              name='password'
              placeholder="Contraseña"
              value={password}
              fullWidth
              autoComplete="off"
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid
              item
              xs={12}
              display={!!errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type='submit'
                variant="contained"
                fullWidth
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link
              component={RouterLink}
              to="/auth/register"
              color="inherit"
            >
              Regístrate
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};