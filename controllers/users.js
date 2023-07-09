import User from "../models/User.js"

// READ
export const getUsers = async (req, res) => {
    try {
        console.log('getUsers');
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await User.find({ "_id": { $in: user.friends } });

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        )

        res.status(200).json(formattedFriends);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// UPDATE 

export const addRemoveFriend = async (req, res) => {
    console.log('hi');
    const { id, friendId } = req.params;
    let user = await User.findById(id);
    console.log(user);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== id);
    }
    else {
        user.friends.push(friendId);
        friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const friendsIds = user.friends;
    const friends = await User.find({ _id: { $in: friendsIds } });
    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        }
    )

    res.status(200).json(formattedFriends);
}