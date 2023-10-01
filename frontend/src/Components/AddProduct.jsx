import React, { useState } from 'react'
import './AddProduct.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [err, seterr] = useState(false);
    const navigate = useNavigate()


    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            seterr(true);
            return false;
        }
        let userId = JSON.parse(localStorage.getItem("userdata"))._id;
        let result = await axios.post("http://localhost:4000/add-product", { name, price, category, company, userId })
        result = result.data
        // console.log(result);
        navigate("/")

    }
    return (
        <div className='add-products'>
            <h1>Add your Product</h1>

            <input type="text" placeholder='Name of Product' value={name} onChange={(e) => setName(e.target.value)} />
            {err && !name && <span className='Invalid'>Enter valid Name</span>}

            <input type="text" placeholder='Price of Product' value={price} onChange={(e) => setPrice(e.target.value)} />
            {err && !price && <span className='Invalid'>Enter valid Name</span>}

            <input type="text" placeholder='Category of Product' value={category} onChange={(e) => setCategory(e.target.value)} />
            {err && !category && <span className='Invalid'>Enter valid category</span>}

            <input type="text" placeholder='Company of product' value={company} onChange={(e) => setCompany(e.target.value)} />
            {err && !company && <span className='Invalid'>Enter valid company</span>}

            <button onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct
