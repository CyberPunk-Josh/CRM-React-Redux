import { logoutFirebase, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"

export const chekingAuthentication = ( email, password ) => {
    return  ( dispatch ) => {
        dispatch( checkingCredentials() );
    }
};

export const startGoogleSignIn = () => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
        const result = await signInWithGoogle();
        if ( !result.ok ) {
            dispatch(logout())
        }
        dispatch(login( result ));
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout());
    }
}