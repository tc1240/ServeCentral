/* Conditions for successful registration:
    1. All fields must be filled
    2. Email must be valid
    3. Password must contain at least 1 number
    4. Password must be at least 6 characters
    5. Password and ConfirmPassword must be identical
*/

// This rough code draft is being pushed, despite Jest being uncooperative.
// Consider this a rough outline of possible tests.

test('registration fails with missing email', () => {
    expect(signup("","password1","Test","McMeme","password1")).toThrow(error);
});

test('registration fails with missing password', () => {
    expect(signup("test@test.com","","Test","McMeme","password1")).toThrow(error);
});

test('registration fails with missing Firstname', () => {
    expect(signup("test@test.com","password1","","McMeme","password1")).toThrow(error);
});

test('registration fails with missing Lastname', () => {
    expect(signup("test@test.com","password1","Test","","password1")).toThrow(error);
});

test('registration fails with missing ConfirmPassword', () => {
    expect(signup("test@test.com","password1","Test","McMeme","")).toThrow(error);
});

test('registration fails when Password and ConfirmPassword are different', () => {
    expect(signup("test@test.com","password1","Test","McMeme","wrongPassword1")).toThrow(error);
});

test('registration fails when password is less than 6 characters', () => {
    expect(signup("test@test.com","meme1","Test","McMeme","meme1")).toThrow(error);
});

test('registration fails when password does not have at least 1 number', () => {
    expect(signup("test@test.com","password","Test","McMeme","password")).toThrow(error);
});

test('registration fails when email is invalid', () => {
    expect(signup("invalidEmail","password1","Test","McMeme","password1")).toThrow(error);
});