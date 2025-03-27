import express from 'express';
const routes=express.Router();
import {createMessage,getMessage,getMessageByID,updateMessage,deleteMessage} from '../controllers/MessagingController'

routes.post("/message/createMessage",createMessage);
routes.get("/message/getMessage",getMessage)
routes.get("/message/getMessagebyId/:id",getMessageByID)
routes.put("/message/updateMessage/:id",updateMessage)
routes.delete("/message/deleteMessage/:id",deleteMessage)


export default routes;