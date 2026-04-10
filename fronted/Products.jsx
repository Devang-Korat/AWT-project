import { useEffect,useState } from "react";
import API from "../../services/api";

export default function StockManagement(){

  const[products,setProducts]=useState([]);

  const[form,setForm]=useState({
    productId:"",
    quantity:"",
    note:""
  });

  //Fetch products
  const fetchProducts=async()=>{
    try{
      const res=await API.get("/products");
      setProducts(res.data);
    }catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{fetchProducts();},[]);

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  //Submit stock update
  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(!form.productId || !form.quantity){
      return alert("All fields required");
    }

    try{
      await API.put("/products/add-stock",{
        productId:form.productId,
        quantity:Number(form.quantity),
        note:form.note
      });

      alert("Stock updated");

      setForm({productId:"",quantity:"",note:""});

      fetchProducts(); 

    }catch(err){
      console.log(err.response?.data||err.message);
      alert(err.response?.data?.message||"Error updating stock");
    }
  };

  return(
    <div className="container py-4">

      <h3 className="mb-4">Stock Management</h3>

      <div className="card mb-4">
        <div className="card-body">

          <h5 className="mb-3">Add Stock</h5>

          <form onSubmit={handleSubmit}>
            <div className="row">

              <div className="col-md-4 mb-3">
                <select
                  className="form-control"
                  name="productId"
                  value={form.productId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map(p=>(
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Note"
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2 mb-3">
                <button className="btn btn-dark w-100">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-body">

          <h5 className="mb-3">Current Stock</h5>

          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p,i)=>(
                <tr key={p._id}>
                  <td>{i+1}</td>
                  <td>{p.name}</td>
                  <td>{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}