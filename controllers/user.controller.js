const fs = require("fs");
const path = require("path");

const getUsers = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf-8")
  );
};

const writeUsers = (users) => {
  fs.writeFileSync(
    path.join(__dirname, "../data/users.json"),
    JSON.stringify(users, null, 3),
    "utf-8"
  );
};

module.exports = {
  usersList: (req, res) => {
    const users = getUsers();
    return res.render("usersList", { users });
  },

  userSearch: (req, res) => {
    const { keyword } = req.query;

    const users = getUsers();
    const usersFind = users.filter(
      (user) =>
        user.last_name.toLowerCase().includes(keyword.toLowerCase()) ||
        user.first_name.toLowerCase().includes(keyword.toLowerCase())
    );
    return res.render("usersList", { users: usersFind, title: "User Find" });
  },

  userAdd: (req, res) => {
    return res.render("userAdd");
  },

  userStore: (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const users = getUsers();
    const newId = users[users.length - 1].id + 1;
    const newUser = {
      id: newId,
      first_name,
      last_name,
      email,
      gender: "",
      password,
      avatar:
        "https://aaahockey.org/wp-content/uploads/2017/06/default-avatar-300x300.png",
      address: "",
    };
    const usersMoreOne = [...users, newUser];
    writeUsers(usersMoreOne);
    return res.redirect(`/#${newId}`);
  },

  userEdit: (req, res) => {
    const userIdParams = +req.params.id;
    const users = getUsers();
    const userFind = users.find((user) => user.id === userIdParams);
    return res.render("userEdit", { user: userFind });
  },

  userUpdated: (req, res) => {
    const users = getUsers();
    const userId = +req.params.id;
    const gallery =
      req.files["gallery"] !== undefined && req.files["gallery"][0];
    const avatar = req.files["avatar"] !== undefined && req.files["avatar"][0];
    const { first_name, last_name, gender, avatarText, address } = req.body;
    //  return res.send(req.files) // {}

    const usersUpdated = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          first_name: first_name.trim(),
          last_name: last_name.trim(),
          gender: gender.trim(),
          address: address.trim(),
          avatar: avatar?.filename || avatarText?.trim() || user?.avatar,
          gallery:
            gallery?.filename ||
            user?.gallery ||
            "https://aaahockey.org/wp-content/uploads/2017/06/default-avatar-300x300.png",
        };
      } else {
        return user;
      }
    });
    writeUsers(usersUpdated);
    return res.redirect(`/#${userId}`);
  },

  userDelete: (req, res) => {
    const userId = +req.params.id;
    const users = getUsers();
    const usersMinorOne = users.filter((user) => user.id !== userId);
    writeUsers(usersMinorOne);
    return res.redirect("/");
  },
};
