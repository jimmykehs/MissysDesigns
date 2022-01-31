const { createUser } = require("./db/Users/userDBFunctions");

test("Creates a user and returns record", async () => {
  try {
    const userData = {
      first_name: "Joey",
      last_name: "Chestnut",
      email: "joey@chestnut.com",
      password: "joey",
    };
    const newUser = await createUser(userData);
    expect(newUser).toBe("");
  } catch (e) {
    expect(e).toBe("Error");
  }
});
