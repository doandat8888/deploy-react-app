import actionTypes from '../actions/actionTypes';

const initialcopyState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    dataTime: [],
    allRequiredData: [],
    allSpecialty: [],
    allClinic: [],
}

const adminReducer = (state = initialcopyState, action) => {
    let copyState = {...state} //Copy giá trị của initialcopyState => copyState là 1 object chứa genders, roles và positions
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoadingGender = false;
            copyState.genders = action.data;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILED: 
            state.isLoadingGender = false;
            return {
                ...copyState
            }
        case actionTypes.FETCH_POSITION_START:
            return {
                ...copyState
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            copyState.positions = action.data;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_POSITION_FAILED: 
            return {
                ...copyState
            }
        case actionTypes.FETCH_ROLE_START:
            return {
                ...copyState
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            copyState.roles = action.data;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ROLE_FAILED: 
            return {
                ...copyState
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataTopDoctors;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDoctors;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.allDoctors = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.dataTime = action.dataTime
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.dataTime = [];
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredData = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredData = [];
            return {
                ...state
            }
        case actionTypes.GET_ALL_SPECIALTY_SUCCESS:
            state.allSpecialty = action.data;
            return {
                ...state
            }
        case actionTypes.GET_ALL_SPECIALTY_FAILED:
            state.allSpecialty = [];
            return {
                ...state
            }
        case actionTypes.GET_ALL_CLINIC_SUCCESS: 
            state.allClinic = action.data
            return {
                ...state
            }
        case actionTypes.GET_ALL_SPECIALTY_FAILED:
            state.allClinic = [];
            return {
                ...state
            }
        default:
            return copyState;
        
    }
}

export default adminReducer;