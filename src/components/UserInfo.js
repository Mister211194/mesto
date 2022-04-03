export default class UserInfo {
    constructor({ nameProfileSelector, infoProfileSelector, AvatarEditSelector }) {
        this._nameProfile = document.querySelector(nameProfileSelector);
        this._infoProfile = document.querySelector(infoProfileSelector);
        this._avatarProfile = document.querySelector(AvatarEditSelector);
    }

    getUserInfo() {
        return {
            name: this._nameProfile.textContent,
            about: this._infoProfile.textContent,
        }
    }

    setUserInfo({ name, about }) {
        this._nameProfile.textContent = name;
        this._infoProfile.textContent = about;
    }

    setUserId(id) {
        this._userId = id;
    }

    getUserId() {
        return this._userId
    }

    setAvatar({ avatar }) {
        this._avatarProfile.src = avatar
    }
}