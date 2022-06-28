import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';
import {createNewUserService, getAllUsers, deleteUserService, editUserService, getTopDoctorHomeService, getAllDoctorsSerVice, saveInforDoctor, createNewSpecialty, getAllSpecialtyService, getAllClinicService} from '../../services/userService';
import {toast} from 'react-toastify';

//start doing end
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }else{
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("Fetch gender failed: ", e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    data: genderData,
    type: actionTypes.FETCH_GENDER_SUCCESS,
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START,
            })
            let res = await getAllCodeService("POSITION");
            if(res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }else{
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("Fetch position failed: ", e);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    data: positionData,
    type: actionTypes.FETCH_POSITION_SUCCESS,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }else{
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("Fetch role failed: ", e);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    data: roleData,
    type: actionTypes.FETCH_ROLE_SUCCESS,
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if(res && res.errCode === 0) {
                toast.success("Create a new user succeed !")
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            }else{
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("Fetch role failed: ", e);
        }
    }
}

export const saveUserSuccess = (userData) => ({
    data: userData,
    type: actionTypes.SAVE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.SAVE_USER_FAILED,
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            let res1 = await getTopDoctorHomeService(3);
            if(res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users));
            }else{
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: 'FETCH_ALL_USERS_SUCCESS',
    users: data,
});

export const fetchAllUsersFailed = () => ({
    type: 'FETCH_ALL_USERS_FAILED',
});

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0) {
                toast.success('Delete the user succeed')
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                toast.error('Delete the user failed')
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            console.log(e);
        }
    }
} 

export const editUser = (userData) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userData);
            if(res && res.errCode === 0) {
                toast.success('Edit the user succeed')
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                toast.error('Edit the user failed')
                dispatch(editUserFailed());
            }
        } catch (e) {
            console.log(e);
        }
    }
} 

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

export const fetchTopDoctors = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(6);
            if(res && res.errCode === 0) {
                dispatch(fetchTopDoctorsSuccess(res));
                console.log(res);
            }else{
                dispatch(fetchTopDoctorsFailed());
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const fetchAllDoctors = () => {
    return async(dispatch, getState) => {
        try {
            let response = await getAllDoctorsSerVice();
            if(response && response.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(response));
                console.log(response);
            }else{
                dispatch(fetchAllDoctorsFailed());
            }
        } catch (e) {
            console.log(e);
        }
    }
}



export const saveDetailedInforDoctor = (data) => {
    console.log(data);
    return async(dispatch, getState) => {
        try {
            let response = await saveInforDoctor(data);
            if(response && response.errCode === 0) {
                toast.success("Save infor doctor succeed")
                dispatch(saveInforDoctorSuccess(response));
            }else{
                toast.error("Save infor doctor failed");
                dispatch(saveInforDoctorFailed());
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async(dispatch, getState) => {
        try {
            let response = await getAllCodeService("TIME");
            if(response && response.errCode === 0) {
                dispatch(fetchAllScheduleTimeSuccess(response));
            }else{
                dispatch(fetchAllScheduleTimeFailed());
            }
        } catch (e) {
            console.log(e);
        }
    }
}
export const fetchTopDoctorsSuccess = (res) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    dataTopDoctors: res.data,
})

export const fetchTopDoctorsFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
})

export const fetchAllDoctorsSuccess = (res) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    dataDoctors: res.data,
})

export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

export const saveInforDoctorSuccess = () => ({
    type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS,
})
export const saveInforDoctorFailed = () => ({
    type: actionTypes.SAVE_INFOR_DOCTOR_FAILED,
})

export const getDetailInforDoctorSuccess = () => ({
    type: actionTypes.GET_DETAIL_INFOR_DOCTOR_SUCCESS,
})
export const getDetailInforDoctorFailed = () => ({
    type: actionTypes.GET_DETAIL_INFOR_DOCTOR_FAILED,
})
export const fetchAllScheduleTimeSuccess = (res) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataTime: res.data
})
export const fetchAllScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
})

export const getRequiredDoctorInfor = () => {
    return async(dispatch, getState) => {
        try {
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            //let resSpecialty = await getAllSpecialtyService();
            if(resPrice && resPrice.errCode === 0 || resPayment && resPayment.errCode === 0
                || resProvince && resProvince.errCode === 0 ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    //resSpecialty: resSpecialty.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));
            }else{
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData,
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});

export const createSpecialty = (data) => {
    try {
        console.log(data);
    } catch (e) {
        console.log(e);
    }
    
    // return async(dispatch, getState) => {
    //     try {
    //         let response = await saveInforDoctor(data);
    //         if(response && response.errCode === 0) {
    //             toast.success("Save infor doctor succeed")
    //             dispatch(saveInforDoctorSuccess(response));
    //         }else{
    //             toast.error("Save infor doctor failed");
    //             dispatch(saveInforDoctorFailed());
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}

export const createNewSpecialtySuccess = () => ({
    type: actionTypes.CREATE_NEW_SPECIALTY_SUCCESS,
});

export const createNewSpecialtyFailed = () => ({
    type: actionTypes.CREATE_NEW_SPECIALTY_FAILED,
})

export const getAllSpecialty = () => {
    return async(dispatch, getState) => {
        try {
            let response = await getAllSpecialtyService();
            if(response && response.errCode === 0) {
                dispatch(getAllSpecialtySuccess(response));
            }else{
                dispatch(getAllSpecialtyFailed());
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const getAllSpecialtySuccess = (res) => ({
    type: actionTypes.GET_ALL_SPECIALTY_SUCCESS,
    data: res.data
})

export const getAllSpecialtyFailed = () => ({
    type: actionTypes.GET_ALL_SPECIALTY_FAILED,
})

export const getAllClinic = () => {
    return async(dispatch, getState) => {
        try {
            let response = await getAllClinicService();
            if(response && response.errCode === 0) {
                dispatch(getAllClinicSuccess(response));
            }else{
                dispatch(getAllClinicFailed());
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const getAllClinicSuccess = (res) => ({
    type: actionTypes.GET_ALL_CLINIC_SUCCESS,
    data: res.data
})

export const getAllClinicFailed = () => ({
    type: actionTypes.GET_ALL_CLINIC_FAILED,
})



