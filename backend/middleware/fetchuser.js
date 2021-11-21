var jwt = require('jsonwebtoken');
const JWT_SECRET = 'HARRRAAA%$77'; //to creat SALT for auth

const fetchuser = (req, res, next) => {
    //get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);//match the token and decode the token
        req.user = data.user;//add user to request body 

        next();//move to next function
    } catch (error) {
        res.status(401).send({ error: "Please authenticate valid token" });
    }



}

module.exports = fetchuser;