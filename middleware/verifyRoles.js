
const verifyRoles = (...args) => {
    return (req, res, next) => {
        const allowedRoles = [...args];
        if (!req?.roles) return res.sendStatus(401);
        console.log(allowedRoles);
        console.log(req.roles);
        const rolesArray = req.roles;
        const result = rolesArray.map(role => allowedRoles.includes(role)).find(value => value === true);
        if (!result) {
            return res.sendStatus(401);
        }
        next();
    }
}

module.exports = verifyRoles;