module.exports = {
    getInfoUser: (req) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_KEY);
            return decode;
        } catch (error) {
            return null;
        }
    }
}