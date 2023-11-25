export const patterns = {
    User: {
        NAME: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}$/,
        LAST: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]{1,15}$/,
        EMAIL: /^([\w\.\-]+){1,3}@([\w\-]+)((\.(\w){2,3})+)$/,
        PASSWORD: /^(?=.*[0-9])(?=.*[a-z])(?=.*[~!@#$%^&*+\-/.,\\{ }[\\;:?<>"'_]).{8,}$/,
    },
    Role: {
        NAME: /^[A-Za-z0-1]{1,15}$/
    }
}

export const validateLogin = ({ username, password }: { username: string, password: string }) => {
    try {
        if (!new RegExp(patterns.User.EMAIL).test(username)) return false;
        if (!new RegExp(patterns.User.PASSWORD).test(password)) return false;
        return true;
    } catch (e) {
        return false;
    }
}

export const validateProfileUpdate = (user: any) => {
    try {
        if (!new RegExp(patterns.User.NAME).test(user.name)) return false;
        if (!new RegExp(patterns.User.LAST).test(user.last)) return false;
        if (!new RegExp(patterns.User.EMAIL).test(user.email)) return false;
        return true;
    } catch (e) {
        return false;
    }
}

export const validateUser = (user: any) => {
    try {
        if (!new RegExp(patterns.User.NAME).test(user.name)) return false;
        if (!new RegExp(patterns.User.LAST).test(user.last)) return false;
        if (!new RegExp(patterns.User.EMAIL).test(user.email)) return false;
        if (!new RegExp(patterns.User.PASSWORD).test(user.password)) return false;
        return true;
    } catch (e) {
        return false;
    }
}

export const validateRole = (role: any) => {
    try {
        if (!new RegExp(patterns.Role.NAME).test(role)) return false;
        return true;
    } catch (e) {
        return false;
    }
}