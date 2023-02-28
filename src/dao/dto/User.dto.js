export default class UserDTO {
    static getDbDTO = (user) => {
        return{
            id: user._id,
            role: user.role,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            avatar: user.avatar,
            idCart : ''
        }
    }
}