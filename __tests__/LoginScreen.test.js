/* The issue right now lies in mock functions
and Jest incessantly refusing to mock console.log 

I believe that testing the console.log is the easiest way
to confirm if something works or not, e.g. after a successful
login, console.log displays "Logged In!" */

import LoginScreen from "../screens/LoginScreen";
jest.mock("../screens/LoginScreen");
jest.mock(global.console.log);

beforeEach(() => {
    LoginScreen.mockClear();
});

test('login is successful with correct username and password', () => {
    const myLoginScreen = new LoginScreen();
    myLoginScreen.login("test@test.com","password1");
    expect(global.console.log).toBeCalledWith("Logged In!");
});