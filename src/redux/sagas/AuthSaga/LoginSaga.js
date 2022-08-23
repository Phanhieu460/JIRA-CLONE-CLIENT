import { call, delay, put, takeLatest } from "redux-saga/effects";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { authService } from "../../../services/AuthService/authService";


function* LoginSaga(action) {
    let { userLogin } = action;
    const history = useHistory()

    // yield put({
    //     type: DISPLAY_LOADING,
    // });

    try {
        // call api login to retrieving token
        const { data, status } = yield call(() => authService.login(userLogin));

        // if token has been successfully created
        if (status === 200) {
            localStorage.setItem('token', data.accessToken);
            // const userLogin = yield call(() => accountService.getCurrentUserLogin());
            yield put({
                type: 'LOGIN',
                user: data,
            })
            localStorage.setItem('user', JSON.stringify(userLogin.data));;
        }

        history.push('/board');
    } catch (error) {
        console.log('Error Login Saga: ', error);   
        message.error( 'Username or password incorrect!')
    }

    // yield delay(LOADING_DELAY);

    // yield put({
    //     type: HIDE_LOADING,
    // });

}

export function* loginEventListener() {
    yield takeLatest('LOGIN_SAGA', LoginSaga);
}