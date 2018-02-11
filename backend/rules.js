var rules = [
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

module.exports = rules;