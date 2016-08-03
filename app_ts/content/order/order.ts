import { Address } from './address/address'
import { Client } from './client';
import { OrderForm } from './orderForm';
import {  PaymentDetailsForm } from './payment-details-form'
export class OrderModel{
    constructor(){
        // this.client = {enabled:false,fullName:'',id:0,mail:'',mailMessage:'',phone:'',rate:0,workTime:''}
        this.orderForm = new OrderForm();
        this.paymentDetailsForm = new  PaymentDetailsForm();
        // this.orderForm.loadingAddress=[];
        // this.orderForm.unloadingAddress=[];
        // this.client = new Client();
        // this.loadingAddress = [];
        // this.unloadingAddress = [];
        
    }

    client:Client;
    orderForm:OrderForm;
    paymentDetailsForm: PaymentDetailsForm;
    time:string;
    id:number;
    title:string;

    moveDate:Date;
    moveStart:string;
    moveEnd:string;
    allDay:boolean = true;
 
    orderNumber:number;
    company:string; 

    advertisement:string;
    sizeOfMove:string; //enums
    storageSize:string;
    isLabor:boolean;

    status:number; //enums
    truck:number; //enums
    movers:string; //enums
    orderDay:string;
    heavyItem:string; //enums
    serviceCharge:string;//enums
    shrink:string; //enums
    tape:string; //enums
    ddt:number;
    rateOrFlat:number;
    totalForFirstHours:number;
    addExtra:number;
    discount:number; //enums
    totalPricePerFirstHours:number;
    fieldForSalesmanComments:string;
    fieldForManagerComments:string;
    
    workTime:string;        // salaryCount
    paymentMethod:number; // SalaryCount
  
    endPickUpDate:number; // salaryConut

     
   boxDeliveredDate:string;

    //Date for observing and planning of movement by supervisor
   estimateDate:string;
   estimateStartTime:string;
   estimateEndTime:string;

   packageDate:string;
   packageStartTime:string;
   packageEndTime:string;
   

   followUpDate:string;
   pickUpDate:string;
   storageDate:string;

   isStored:boolean;
   durationStorage:string;

   boxQuantity:number; 
}
