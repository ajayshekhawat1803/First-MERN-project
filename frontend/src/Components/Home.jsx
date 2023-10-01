import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  const [allproducts, setallproducts] = useState([])

  useEffect(() => {
    getproducts()
  }, [])

  const getproducts = async () => {
    let result = await axios.get("http://localhost:4000/allProducts")
    result = result.data
    setallproducts(result)
  }

  const deleteProduct = async (id) => {
    // console.log(id);
    let result = await axios.delete(`http://localhost:4000/product/${id}`)
    // console.log(result);
    if (result) {
      alert("Product has been deleted ")
      getproducts()
    }
  }
  return (
    <div className="home">
      <h1>Our Products</h1>
      {
        allproducts.length > 0 ?
          <table>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Company</th>
                <th>Actions</th>
                {/* <th>Added By</th> */}
              </tr>
            </thead>
            <tbody>
              {
                allproducts.map((product, index) => {
                  return (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.company}</td>
                      <td className='actions'>
                        <span id='deleteicon' onClick={() => deleteProduct(product._id)}>
                          Delete
                        </span>
                        <Link id='editicon' to={`/update/${product._id}`}>Edit</Link>
                        
                      </td>
                      {/* <td>{product.userId}</td> */}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          : <h4>NO Products Available</h4>
      }
    </div>
  )
}

export default Home
