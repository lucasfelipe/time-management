var User = require('./models/users')

const configureDefaultUser = async () => {
        let users = await User.find({});
        if(users[0]) return;
        let userDefault = new User({ 
            username: 'admin', 
            password: 'admin',
            preferedHoursPerDay: 8,
            role: 'ADMIN' 
            });
        await userDefault.save();
        console.info('Default User created');
}

module.exports = {
    configureDefaultUser
}