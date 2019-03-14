/* Conditions for successful registration:
    1. All fields must be filled
    2. Email must be valid
    3. Password must contain at least 1 number
    4. Password must be at least 6 characters
    5. Password and ConfirmPassword must be identical

The issue right now lies in mock functions
and Jest incessantly refusing to mock console.log 

I believe that testing the console.log is the easiest way
to confirm if something works or not, e.g. after successful registration,
console.log will be called with "Account created" */

import RegisterScreen from "../screens/RegisterScreen";
jest.mock("../screens/RegisterScreen");
jest.mock(global.console.log);

beforeEach(() => {
    RegisterScreen.mockClear();
});

test('registration is successful with correct information', () => {
    const myRegisterScreen = new RegisterScreen();
    myRegisterScreen.signup("meme@meme.com","password1","Test","McMeme","password1","Memeville");
    expect(global.console.log).toBeCalledWith("Account created");
});