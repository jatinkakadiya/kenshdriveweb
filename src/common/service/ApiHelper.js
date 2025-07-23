import axios from "axios"
let Url = "http://localhost:8880"
// let Url = "https://kenshdrive.onrender.com"
export const Apihelper = {
    Register: (data) => {
        return axios.post(Url + "/user/register", data)
    },
    Login: (data) => {
        return axios.post(Url + "/user/login", data)
    },
    totelView: () => {
        return axios.get(Url + "/movise/totelview")
    },
    genreview: () => {
        return axios.get(Url + "/movise/genre-view-stats")
    },
    revenumovise: () => {
        return axios.get(Url + "/movise/movie-stats")
    },
    createMovise: (data) => {
        return axios.post(Url + "/movise/uplode", data)
    },
    AddSlider: (data) => {
        return axios.post(Url + "/slider/add", data)
    },
    ListSlider: () => {
        return axios.get(Url + "/slider/list")
    },
    DeleteMovise: (id) => {
        return axios.delete(Url + `/movise/delete/${id}`)
    },
    createplan: (data) => {
        return axios.post(Url + `/premium/create`, data)
    },
    Listplan: () => {
        return axios.get(Url + `/premium/all`,)
    },
    Activeplan: () => {
        return axios.get(Url + `/premium/active`,)
    },
    deleteplan: (id) => {
        return axios.delete(Url + `/premium/delete/${id}`,)
    },
    togalplan: (id) => {
        return axios.patch(Url + `/premium/toggle/${id}`,)
    },
    editpaln: (id, data) => {
        return axios.post(Url + `/premium/edit/${id}`, data)
    },
    editPlan: (id, data) => {
        return axios.put(Url + `/premium/edit/${id}`, data);
    },
    Liastorder: () => {
        return axios.get(Url + `/order/list`,);
    },
    totelearnings: () => {
        return axios.get(Url + "/order/total-earnings")
    },
    monthlypremium: () => {
        return axios.get(Url + "/order/monthly-premium-count")
    },
    premiumtypecounts: () => {
        return axios.get(Url + "/order/premium-type-counts")
    },

    monthlytotal: () => {
        return axios.get(Url + "/order/monthly-total-price")
    },

    toteluser: () => {
        return axios.get(Url + "/user/list")
    },



    // user api 
    ListMovise: () => {
        return axios.get(Url + "/movise/allmovies")
    },
    GetmoviseById: (id) => {
        return axios.get(Url + `/movise/movies/${id}`)
    },
    GettagByMovice: (tag) => {
        return axios.get(Url + `/movise/movies/by-tag?tag=${tag}`)
    },
    GetCategoryBymovise: (category) => {
        return axios.get(Url + `/movise/category?category=${category}`)
    },
    Addreting: (data) => {
        return axios.post(Url + "/movise/add-rating", data)
    },
    Register: (data) => {
        return axios.post(Url + "/user/register", data)
    },
    Login: (data) => {
        return axios.post(Url + "/user/login", data)
    },
    userInfo: (token) => {
        return axios.get(Url + `/user/userinfo/${token}`)
    },
    editUser: (data, id) => {
        return axios.put(Url + `/user/edit/${id}`, data)
    },
    support: (data) => {
        return axios.post(Url + "/support/create", data)
    },
    crearteorder: (data) => {
        return axios.post(Url + "/order/create", data)
    },
    upgradplan: (data) => {
        return axios.post(Url + `/order/upgrade-premium`, data)
    },

}