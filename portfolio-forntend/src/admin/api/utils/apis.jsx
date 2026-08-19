const MAIN_PATH = import.meta.env.VITE_MAIN_PATH
const SUB_PATH = import.meta.env.VITE_SUB_PATH

const APIS = {
    GET: {
        checkAdminAuth: `${MAIN_PATH}${SUB_PATH}/get/check-admin-auth`,
    },
    POST: {
        adminLogin: `${MAIN_PATH}${SUB_PATH}/post/admin/login`,
    },
    DELETE: {},
    PUT: {}
}


export default APIS