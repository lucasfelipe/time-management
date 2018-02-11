var roles = [
    {
        profile: 'ADMIN',
        routes: [
            '/users',
            '/tasks'
        ]
    },
    {
        profile: 'USER',
        routes: [
            '/tasks'
        ]
    },
    {
        profile: 'MANAGER',
        routes: [
            '/users',
            '/tasks'
        ]
    }
]

module.exports = roles;