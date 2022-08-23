import { message } from "antd";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { authService } from "../../../services/AuthService/AuthService";


function* registerSaga(action) {

    let { userRegister } = action;

    try {
        // yield put({
        //     type: DISPLAY_LOADING,
        // });

        const { data, status } = yield call(() => authService.register(userRegister));

        // yield delay(LOADING_DELAY);

        // yield put({
        //     type: HIDE_LOADING,
        // });

        if (data.status === 400 && data.message === 'Username already exists!') {
            message.error('Username already exists!');
        } else {
            // if account created successfully (status = 201)
            if (status === 200) {
                history.push('/login');
                message.success('Your account has been successfully created!');
            }
        }
    } catch (error) {
        console.log('Error Register Saga: ', error);
        message.error('Internal Server Error!')
    }

}

export function* registerEventListener() {
    yield takeLatest('REGISTER_SAGA', registerSaga);
}