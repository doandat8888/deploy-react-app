import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });    //Tương tự như: {email: email, password: password, do key và value trùng nhau nên có thể viết như vậy}
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    console.log(userId);
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        }
    });
}

const editUserService = (user) => {
    return axios.put('/api/edit-user', user);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctorsSerVice = () => {
    return axios.get('/api/get-all-doctors');
}

const saveInforDoctor = (data) => {
    return axios.post('/api/save-infor-doctor', data);
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-infor-doctor?id=${inputId}`);
}

const bulkCreateSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctor = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctor = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
}

const getAllSpecialtyService = () => {
    return axios.get(`/api/get-all-specialty`);
}

const getSpecialtyByIdService = (specialtyId) => {
    return axios.get(`/api/get-specialty-by-id?id=${specialtyId}`);
}

const getDoctorBySpecialtyIdService = (specialtyId) => {
    return axios.get(`/api/get-doctor-by-specialty-id?specialtyId=${specialtyId}`);
}

const getAllDoctorByProvince = (specialtyId, provinceId) => {
    return axios.get(`/api/get-all-doctor-by-province?specialtyId=${specialtyId}&provinceId=${provinceId}`);
}

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
}

const getAllClinicService = () => {
    return axios.get(`/api/get-all-clinic`);
}

const getAllDoctorByClinic = (clinicId, provinceId) => {
    return axios.get(`/api/get-all-doctor-by-clinic?clinicId=${clinicId}&provinceId=${provinceId}`);
}

const getClinicByIdService = (clinicId) => {
    return axios.get(`/api/get-clinic-by-id?id=${clinicId}`);
}

const getBookingInfor = (doctorId, date) => {
    return axios.get(`/api/get-infor-booking?doctorId=${doctorId}&date=${date}`);
}

const sendBill = (data) => {
    return axios.post(`/api/send-bill`, data);
}

export { 
    handleLoginApi, getAllUsers, createNewUserService, deleteUserService, 
    editUserService, getAllCodeService, getTopDoctorHomeService, 
    getAllDoctorsSerVice, saveInforDoctor, getDetailInforDoctor, bulkCreateSchedule, 
    getScheduleByDate, getExtraInforDoctor, getProfileDoctor, postPatientBookAppointment, 
    createNewSpecialty, getAllSpecialtyService, getSpecialtyByIdService, 
    getDoctorBySpecialtyIdService, getAllDoctorByProvince, createNewClinic, getAllClinicService,
    getAllDoctorByClinic, getClinicByIdService, getBookingInfor, sendBill
} 
