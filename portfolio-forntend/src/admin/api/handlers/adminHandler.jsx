import APIS from "../utils/apis";
import SendRequest from "../utils/requester";

const handleAdminLogin = async ({ username, password }) => {
    return await SendRequest({ url: APIS.POST.adminLogin, method: "POST", data: { username, password } });
};

const checkAdminAuths = async () => {
    return await SendRequest({ url: APIS.GET.checkAdminAuth, method: "GET" });
}

export { handleAdminLogin, checkAdminAuths };