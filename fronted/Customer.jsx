import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import API from "../../services/api";

export default function BillDetails(){
  const{id}=useParams();

  const[bill,setBill]=useState(null);
  const[items,setItems]=useState([]);

  const fetchBill=async()=>{
    try{
      const res=await API.get(`/bills/${id}`);
      setBill(res.data.bill);
      setItems(res.data.items);
    }catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{fetchBill();},[id]);

  if(!bill)return <div className="p-5">Loading...</div>;

  return(
    <div className="container py-4">
      <div className="card shadow-sm p-4" style={{background:"#f7f7f7"}}>

        <div className="text-center mb-3">
          <h3 className="fw-bold">WORKSTOCK ELECTRONIC SHOP</h3>
          <p className="mb-1">Owner: Devang Korat</p>
          <p className="mb-1">Rajkot, Gujarat</p>
          <p className="mb-0">GST: 24ABCDE1234F1Z5</p>
        </div>

        <hr style={{borderStyle:"dashed"}}/>

        <p><strong>Invoice:</strong>{bill.invoiceNumber}</p>
        <p><strong>Date:</strong>{new Date(bill.billDate).toLocaleDateString()}</p>

        <hr style={{borderStyle:"dashed"}}/>

        <h5>Customer Details</h5>
        <p><strong>Name:</strong>{bill.customerId?.name}</p>
        <p><strong>Employee:</strong>{bill.employeeId?.name}</p>

        <hr style={{borderStyle:"dashed"}}/>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th className="text-end">Price</th>
              <th className="text-end">Qty</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map(i=>(
              <tr key={i._id}>
                <td>{i.productName}</td>
                <td className="text-end">₹{i.price}</td>
                <td className="text-end">{i.quantity}</td>
                <td className="text-end">₹{i.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-end">
          <p>Subtotal: ₹{bill.totalAmount}</p>
          <p>GST: ₹{bill.taxAmount}</p>
          <p>Discount: ₹{bill.discount}</p>
          <h4 className="fw-bold">Final: ₹{bill.finalAmount}</h4>
        </div>

        <hr style={{borderStyle:"dashed"}}/>

        <strong>Payment:</strong> {bill.paymentMethod}

      </div>
    </div>
  );
}