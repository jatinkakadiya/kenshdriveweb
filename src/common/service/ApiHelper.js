import axios from "axios"
let Url = "http://localhost:8880"
// let Url = "https://kenshdrive.onrender.com"
export const Apihelper = {
    Register: (data) => {
       return axios.post(Url+"/user/register",data)
    },
    Login:(data)=>{
        return axios.post(Url+"/user/login",data)
    },
    totelView:()=>{
        return  axios.get(Url+"/movise/totelview")
    },
    genreview:()=>{
        return  axios.get(Url+"/movise/genre-view-stats")
    },
    revenumovise:()=>{
        return axios.get(Url+"/movise/movie-stats")
    },
    createMovise:(data)=>{
        return axios.post(Url+"/movise/uplode",data)
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
    editUser:(data,id)=>{
        return  axios.put(Url +`/user/edit/${id}`,data)
    },
    support:(data)=>{
        return axios.post(Url+"/support/create",data)
    }

}