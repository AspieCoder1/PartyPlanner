import {User, IUser} from '../../src/models/user';
import '../../src/db/mongoose';

afterEach(async () => {
    await User.remove({});
});

describe('User model tests', () => {
    it('Should correctly add a user to the db', async () => {
        const newUser = {
            email: 'test@example.com',
            password: '24355365644faf',
            username: 'test'
        }

        const user: IUser = new User(newUser)
        const savedUser = await user.save()
        expect(user).toEqual(savedUser)
    })
})