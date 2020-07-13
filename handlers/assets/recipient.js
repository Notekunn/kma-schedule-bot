module.exports = {
    recipient_name: 'Trần Đức Cường',
    order_number: '1423',
    currency: 'VND',
    payment_method: 'Tiền mặt',
    order_url: 'http://petersapparel.parseapp.com/order?order_id=123456',
    timestamp: parseInt(new Date().getTime() / 1000),
    elements: [
        {
            title: 'Áo phông trắng',
            subtitle: '100% cotton mềm',
            quantity: 2,
            price: 50000,
            currency: 'VND',
            image_url: 'https://i2.wp.com/lhomme.vn/wp-content/uploads/2019/02/WHITE-SHIRT-080.jpg?fit=678%2C1059&ssl=1',
        },
        {
            title: 'Áo phông nâu',
            subtitle: '100% cotton mềm',
            quantity: 1,
            price: 25000,
            currency: 'VND',
            image_url: 'https://cf.shopee.ph/file/e34dfc3e41caa776c3c0fb059cfb1958',
        },
    ],
    address: {
        street_1: '141 Chiến Thắng',
        street_2: 'Xóm 6 Nghi Văn',
        city: 'Hà Nội',
        postal_code: '94025',
        state: 'HN',
        country: 'VN',
    },
    summary: {
        subtotal: 75000,
        shipping_cost: 4900,
        total_tax: 6190,
        total_cost: 56090,
    },
    adjustments: [
        {
            name: 'Giảm giá cho người mới',
            amount: 20000,
        },
        {
            name: 'Phiếu giảm giá 10VND',
            amount: 10000,
        },
    ],
}