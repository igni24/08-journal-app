import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from '../../fixtures/authFixtures';

describe('Pruebas en authSlice', () => {
    test('Debe devolver el estado inicial y llamarse "auth"', () => {
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');
    });

    test('Debe autenticar un usuario', () => {
        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual(authenticatedState);
    });

    test('Debe des-autenticar un usuario', () => {
        const state = authSlice.reducer(authenticatedState, logout());

        expect(state).toEqual(notAuthenticatedState);
    });

    test('Debe des-autenticar un usuario y mostrar un error', () => {
        const errorMessage = 'Credenciales no són correctas';

        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
        
        expect(state.errorMessage).toEqual(errorMessage);
    });
    
    test('Debe cambiar el estado a checking', () => { 
        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        
        expect(state.status).toEqual('checking');
     })
});