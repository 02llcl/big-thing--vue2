import request from '@/utils/request'

export const registerAPI= () => {
    return request({
        url: '/api/reg',
        method: 'POST',
        data: {
            username: "",
            password: "666666",
            repassword: "666666"
        }
    })
}
