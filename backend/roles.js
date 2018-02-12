var roles = [
    {
        role: 'ADMIN',
        routes: [
            '/users',
            '/tasks'
        ]
    },
    {
        role: 'USER',
        routes: [
            '/tasks'
        ]
    },
    {
        role: 'MANAGER',
        routes: [
            '/users',
            '/tasks'
        ]
    }
]

module.exports = roles;