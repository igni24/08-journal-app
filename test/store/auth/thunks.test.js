import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/JournalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('Debe invocar la función checkingAuthentication', async () => {
        await checkingAuthentication()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('"startGoogleSignIn" debe llamar "checkingCredentials" y "login" - Éxito', async () => {
        const loginData = {
            ok: true,
            ...demoUser
        };
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('"startGoogleSignIn" debe llamar "checkingCredentials" y "logout" - Error', async () => {
        // const loginData = {
        //     ok: false,
        //     errorMessage: 'Google Error'
        // };
        // await signInWithGoogle.mockResolvedValue(loginData);

        // await startGoogleSignIn()(dispatch);
        // console.log(logout(loginData.errorMessage));

        // expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        // expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
        const loginData = { ok: false, errorMessage: 'Un error en Google' };
        await signInWithGoogle.mockResolvedValue(loginData);

        // thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }));
    });

    test('"startLoginWithEmailPassword" debe llamar "checkingCredentials" y "login" - Exit', async () => {
        const loginData = {
            ok: true,
            ...demoUser
        };
        const formData = {
            email: demoUser.email,
            password: '123456'
        };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });
    
    test('Debe llamar la función logoutFirebase, clearNotes y logout', async () => {
        await startLogout()(dispatch);
        
        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });
});