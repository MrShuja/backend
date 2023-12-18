import jwt from "jsonwebtoken";
import user from "../models/user.model.js";

// Middleware to verify JWT token and check user role
export const verifyTokenAndRole = (roles) =>{
  return (req, res, next) =>{
    // const token = req.header("Authorization");
        req.headers.authentication && req.headers.authorization.startsWith("bearer");
        const token = req.headers.authorization.split(" ")[1];


    console.log(token, "this is mu token")
    // if (!token) {
    //   return res.status(401).json({ message: 'Unauthorized: No token provided' });
    // }
    console.log(process.env.PRIVATE_KEY)
    jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      console.log(user.roles)
      if(!roles.includes(user.role)){
        return res.status(403).json({ message: 'Forbidden: you are not admin' });
      }
      req.user= user;
      next();
  });
};
}

 

  

 

//     const userRole = decoded.role;

//     // Check if the user has the required role
//     if (requiredRole && userRole !== requiredRole) {
//       return res.status(403).json({ message: 'Forbidden: you are not admin' });
//     }

//     req.user = decoded; // Store the decoded user information in the request object
//     next();
//   });
// };
