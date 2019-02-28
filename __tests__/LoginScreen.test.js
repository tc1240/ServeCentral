/* The correct login information is as follows:
Username: dev@dev.com
password: meme

The wrong login information is as follows:
Username: wrongEmail@wrong.com
password: meme

This rough code draft is being pushed, despite Jest being uncooperative.
Consider this a rough outline of possible tests.
*/

test('login is successful with correct username and password', () => {
    expect(login("dev@dev.com","password")).not.toThrow(error);
});

test('login fails with correct username and wrong password', () => {
    expect(login("dev@dev.com","meme")).toThrow(error);
});

test('login fails with correct username and missing password', () => {
    expect(login("dev@dev.com","")).toThrow(error);
});

test('login fails with wrong username and correct password', () => {
    expect(login("wrongEmail@wrong.com","password")).toThrow(error);
});

test('login fails with wrong username and wrong password', () => {
    expect(login("wrongEmail@wrong.com","meme")).toThrow(error);
});

test('login fails with wrong username and missing password', () => {
    expect(login("wrongEmail@wrong.com","")).toThrow(error);
});

test('login fails with missing username and correct password', () => {
    expect(login("","password")).toThrow(error);
});

test('login fails with missing username and wrong password', () => {
    expect(login("","meme")).toThrow(error);
});

test('login fails with missing username and missing password', () => {
    expect(login("","")).toThrow(error);
});