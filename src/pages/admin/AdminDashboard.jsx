import React, { useState, useEffect } from 'react';
import { createProductApi, deleteProduct, getAllProducts } from '../../api/Api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import './css/AdminDashboard.css';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.name) {
            setUserName(capitalizeFirstLetter(user.name));
        }
    }, []);

    const capitalizeFirstLetter = (str) => {
        if (!str) return '';  // If the string is undefined or empty, return an empty string
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    useEffect(() => {
        getAllProducts().then((res) => {
            setProducts(res.data.products);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productRating, setProductRating] = useState('');
    const [productType, setProductType] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleDelete = (id) => {
        const confirmDialog = window.confirm("Are you sure you want to delete?");
        if (confirmDialog) {
            deleteProduct(id)
                .then((res) => {
                    if (res.status === 201) {
                        toast.success(res.data.message);
                        // Refresh the page
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 500) {
                            toast.error("Internal server error");
                        } else if (error.response.status === 400) {
                            toast.error(error.response.data.message);
                        }
                    } else {
                        toast.error("An error occurred.");
                    }
                });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', capitalizeFirstLetter(productName));
        formData.append('productPrice', productPrice);
        formData.append('productCategory', capitalizeFirstLetter(productCategory));
        formData.append('productDescription', capitalizeFirstLetter(productDescription));
        formData.append('productRating', productRating);
        formData.append('productType', productType);
        if (productImage) {
            formData.append('productImage', productImage);
        }
        createProductApi(formData).then((res) => {
            if (res.status === 201) {
                toast.success(res.data.message);
                window.location.reload(); // Refresh the page
            } else {
                toast.error("Something went wrong in frontend!");
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else if (error.response.status === 500) {
                    toast.error("Internal server error");
                } else {
                    toast.error("No response!!");
                }
            }
        });
    };

    return (
        <>
            <div className='container'>
                <div className='d-flex justify-content-between mt-5'>
                    <h2 className='text-center'>Welcome to GAS! Admin Dashboard, {userName}</h2>
                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Product
                    </button>
                    <Link to="/admin/order" className="btn btn-blue ms-1">
            View Orders
            </Link>
            <Link to="/admin/contact" className="btn btn-blue ms-1">
            View Contacts
        </Link>


                </div>

                {/* Modal for adding a new product */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create a new product!</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <label>Product Name</label>
                                    <input onChange={(e) => setProductName(e.target.value)} type="text" className='form-control' placeholder='Enter product Name' />

                                    <label className='mt-2'>Product Price</label>
                                    <input onChange={(e) => setProductPrice(e.target.value)} type="number" className='form-control' placeholder='Enter product Price' />


                                    <label className='mt-2'>Product Rating</label>
                                    <select onChange={(e) => setProductRating(e.target.value)} className='form-control'>
                                        <option value="" disabled selected>--Select Rating--</option>
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <option key={rating} value={rating}>{rating}</option>
                                        ))}
                                    </select>
                                    <label className="mt-2">Product Type</label>
                                    <select
                                        onChange={(e) => setProductType(e.target.value)}
                                        className="form-control"
                                    >
                                        <option value="" disabled selected>
                                            --Select Product Type--
                                        </option>
                                        <option value="Best Selling">Best Selling</option>
                                        <option value="Normal">Normal</option>
                                    </select>


                                    <div className='mt-2'>
                                        <label>Select Category</label>
                                        <select onChange={(e) => setProductCategory(e.target.value)} className='form-control'>
                                            <option value="Select" disabled selected>--Select--</option>
                                            <option value="Wheels">Wheels</option>
                                            <option value="Carbon parts">Carbon parts </option>
                                            <option value="Android player">Android player</option>
                                            <option value="Audio System">Audio System</option>
                                            <option value="Seat Cover">Seat Cover</option>
                                            <option value="Lights ">Lights</option>
                                            <option value="Exhaust">Exhaust</option>
                                        </select>
                                    </div>

                                    <label className='mt-2'>Type product description</label>
                                    <textarea onChange={(e) => setProductDescription(e.target.value)} className='form-control'></textarea>

                                    <label className='mt-2'>Product Image</label>
                                    <input onChange={handleImageUpload} type="file" className='form-control' />

                                    {previewImage && (
                                        <div>
                                            <img src={previewImage} alt="preview image" className='img-fluid rounded object-fit-cover mt-3' />
                                        </div>
                                    )}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleSubmit} type="button" className="btn btn-primary">Create</button>
                            </div>
                        </div>
                    </div>
                </div>

                <table className='table mt-3'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Rating</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((singleProduct) => (
                            <tr key={singleProduct._id}>
                                <td>
                                    <img height={'40px'} width={'40px'} src={`http://localhost:5000/products/${singleProduct.productImage}`} alt="" />
                                </td>
                                <td>{capitalizeFirstLetter(singleProduct.productName || '')}</td>
                                <td>NPR.{singleProduct.productPrice}</td>
                                <td>{capitalizeFirstLetter(singleProduct.productCategory || '')}</td>
                                <td>{capitalizeFirstLetter(singleProduct.productDescription || '')}</td>
                                <td>{singleProduct.productRating}</td>
                                <td>{capitalizeFirstLetter(singleProduct.productType || '')}</td>

                                <td>
                                    <div className='btn-group' role='group'>
                                        <Link to={`/admin/update/${singleProduct._id}`} className='btn btn-success'>Edit</Link>
                                        <button onClick={() => handleDelete(singleProduct._id)} className='btn btn-danger'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminDashboard;
