export default class UserDTO {
    static getDbDTO = (user) => {
        return{
            _id: user._id,
            role: user.role,
            name: `${user.firstName} ${user.lastName}` ,
            email: user.email,
            avatar: user.avatar,
            idCart : ''
        }
    }
    static newGetDbDTO = (user, idCart) => {
        return{
            _id: user._id,
            role: user.role,
            name: `${user.name}`,
            email: user.email,
            avatar: user.avatar,
            idCart : idCart
        }
    }
}