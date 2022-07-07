import {
    request
} from './request'

//创建订单
export function createOrder(params) {
    return request({
        url: '/api/orders',
        method: 'post',
        params
    })
}
//订单详情
export function getOrederDetail(oreder) {
    return request({
        url: '/api/orders/' + oreder,
        method: 'get',
        params: {
            include: 'user,orderDetails.goods'
        }
    })
}
//获取订单列表 {page:1,status:2,include:'goods,user,orderDetail'}
export function getOrederList(params) {
    return request({
        url: '/api/orders',
        method: 'get',
        params
    })
}
//获取订单预览
export function getOrderPreview() {
    return request({
        url: '/api/orders/preview',
        method: 'get',
    })
}
//订单支付
export function payOreder(order, params) {
    return request({
        url: `/api/orders/${order}/pay`,
        method: 'get',
        params
    })
}
//查询支付状态
export function payOrederStatus(order) {
    return request({
        url: `/api/orders/${order}/status`,
        method: 'get',
    })
}
//确认收货
export function confirmOrder(order) {
    return request({
        url: `/api/orders/${order}/confirm`,
        method: 'patch',
    })
}
//获取物流信息
export function getExpress(order) {
    return request({
        url: `/api/orders/${order}/express`,
        method: 'get',
    })
}