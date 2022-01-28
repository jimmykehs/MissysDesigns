const { deleteUser, updateUser } = require("./Users");

const update = async () => {
  await updateUser(
    {
      address: `1234 Main Street`,
      city: `Baltimore`,
      state: "MD",
      zip: "12345",
    },
    2
  );

  await deleteUser(1);
};

update();
