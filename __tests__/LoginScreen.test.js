import LoginScreen from './LoginScreen'

test('login is successful with correct information', () => {
    expect(login("dev@dev.com","password")).not.toThrow(error);
})

test('login fails with incorrect information', () => {
    expect(login("dev@dev.com","meme")).toThrow(error);
    expect(login("dev@dev.com","")).toThrow(error);
    expect(login("wrongEmail@wrong.com","meme")).toThrow(error);
    expect(login("wrongEmail@wrong.com","")).toThrow(error);
    expect(login("","password")).toThrow(error);
    expect(login("","meme")).toThrow(error);
    expect(login("","")).toThrow(error);
})