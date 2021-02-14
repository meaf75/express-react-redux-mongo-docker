import { Request, Response, NextFunction, Router } from 'express';

// Modelos
import { PaginateModel, PaginateOptions } from 'mongoose';
import UserModel, { IUser } from '../models/user-model';

// Middlewares and utils
import { getFilter } from '../Classes/ReusableFunctions';
import { ValidateCreateUser, ValidateDeleteUser } from '../Classes/Validators/UserValidators';
import { validationResult } from 'express-validator';
import { FailedDependency, IResponseState, UserAlreadyExist, UserCreate, UserDeleteState, UserDeleteStateError, UserErrorCreate, UserErrorGet, UserErrorUpdate, UserNotExist, UserUpdate } from '../Classes/AppCodes';

class UserController{

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /** Get all users  */
    GetUsers(req: Request, res: Response){
        // /** Variable to store error values in validation form request */
        const errors = validationResult(req);

        // Verify request params
        if (!errors.isEmpty()) {
            return res.status(FailedDependency.http_code).json({message: FailedDependency.message, data: errors.array()});
        }

        const query = getFilter(req);
                
        /**levelModel el metodo find {} para poder traer todos los arreglos  */
        UserModel.find(query, (err, users) =>{
            
            if (err) 
                return res.status(UserErrorGet.http_code).send({message: UserErrorGet.message, data: err})

            return res.status(200).json({data: users})
        }); 
    }

    /** Create user */
    async AddUser(req: Request, res: Response){

        // Check for body errors
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(FailedDependency.http_code).json({ message: FailedDependency.message, data: errors.array() });
        }

        const userData : IUser = req.body;

        // Check if user is already registered
        const user = await UserModel.findOne({ user_id : req.body.user_id });
                
        req.body.user_id = userData.user_id.toLowerCase();

        /** New user model entity */
        let newUserModel = new UserModel(req.body);
        
        // Save date format
        newUserModel.birthDay = new Date(req.body.birthDay);

        let query : Promise<IUser>;
        let responseStatus : IResponseState;
        let errorResponseStatus : IResponseState;

        if(user){
            // query = newUserModel.updateOne({user_id: newUserModel.user_id},req.body).then();

            user.user_name = newUserModel.user_name;
            user.birthDay = newUserModel.birthDay;
            user.mail = newUserModel.mail;

            query = user.save();
            responseStatus = UserUpdate;
            errorResponseStatus = UserErrorUpdate;
        }else{
            query = newUserModel.save();
            responseStatus = UserCreate;
            errorResponseStatus = UserErrorCreate;
        }

        // Save new user
        query.then((result) => {
            // Return new user
            return res.status(responseStatus.http_code).json({message: responseStatus.message, data: result, updated: !!user});
        }).catch((err) => {
            // Return error
            return res.status(errorResponseStatus.http_code).json({message: errorResponseStatus.message, data: err});
        });
    }

    async DeleteUser(req: Request, res: Response){

        // Check for body errors
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(FailedDependency.http_code).json({ message: FailedDependency.message, data: errors.array() });
        }

        // Check if user is already registered
        const user = await UserModel.findOne({ user_id: req.query.user_id as string });

        if(!user){
            return res.status(UserNotExist.http_code).json({ message: UserNotExist.message });
        }
    
        // Save new user
        user.deleteOne().then((result) => {
            // Return new user
            return res.status(UserDeleteState.http_code).json({message: UserDeleteState.message, data: user});
        }).catch((err) => {
            // Return error
            return res.status(UserDeleteStateError.http_code).json({message: UserDeleteStateError.message, data: err});
        });
    }

    /**
     * Rutas del controlador
     */
    routes() {
        this.router.get('/user',this.GetUsers);
        this.router.post('/user', ValidateCreateUser,this.AddUser);
        this.router.delete('/user', ValidateDeleteUser,this.DeleteUser);
    }
    
}

const userController = new UserController();
export default userController.router;