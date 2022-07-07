import {
    request
} from "./request"
export function collect(id) {
    return request({
        url: '/api/collects/goods/' + id,
        method: 'post'
    })
}
export function getCollect() {
    return request({
        url: '/api/collects'
    })
}