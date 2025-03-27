import express from 'express';
const router = express.Router();
import {getPayment,getALLPayment,deletePayment,createPayment,updatePayment} from '../controllers/PaymentController.js';

router.get('/payment/getAll', getALLPayment);
router.get('/payment/get/:id', getPayment);
router.post('/payment/create', createPayment);
router.delete('/payment/delete/:id', deletePayment);
router.put('/payment/update/:id', updatePayment);


export default router;