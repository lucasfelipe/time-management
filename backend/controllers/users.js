var User = require('../models/users');

index = async (req, res) => {
    let users = await User.find({});
    res.status(200).json({ success: {users} });
}

save = async (req, res) => {
    let { user } = req.body;
    user = new User(user);
    await user.save();
    res.status(200).json({ success: { user } });
}

getById = async (req, res) => {
    let { id } = req.params;
    let user =  await User.findById(id);
    res.status(200).json({ success: { user } });
}

update = async (req, res) => {
    let user = await User.findOneAndUpdate({_id: req.params.id}, req.body.user);
    res.status(200).json({ success: { user } });
}

remove = async (req, res) => {
    let { id } = req.params;
    await User.remove({ _id: id });
    res.status(200).json({success: {message: "removed"}});
}

module.exports = {
    index,
    save,
    getById,
    update,
    remove
}