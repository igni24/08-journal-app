import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  displayName: '',
  email: '',
  password: ''
};

const formValidations = {
  displayName: [(value) => value.length > 0],
  email: [(value) => value.includes('@'), 'El correo no és correcto'],
  password: [(value) => value.length > 5, 'La contraseña debe contener más de 5 caracteres']
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const { formState, displayName, email, password, isFormValid, displayNameValid, emailValid, passwordValid, onInputChange } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Registro">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              type="text"
              name="displayName"
              fullWidth
              placeholder="Nombre"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              name="email"
              fullWidth
              placeholder="correo@dominio.com"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              name="password"
              fullWidth
              placeholder="Contraseña"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
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

            <Grid item xs={12}>
              <Button
                type='submit'
                variant="contained"
                fullWidth
                disabled={isCheckingAuthentication}
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link
              component={RouterLink}
              to="/auth/login"
              color="inherit"
            >
              Inicia sesión
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};