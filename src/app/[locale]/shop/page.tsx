"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/ProductCatalog.module.css';

const products = [
    { id: 1, name: 'Printed T-Shirts', price: 270, category: 'T-shirts', image: '/assets/img/tshirt.png' },
    { id: 2, name: 'Caps', price: 270, category: 'Caps', image: '/assets/img/cap.png' },
    { id: 3, name: 'Calendar', price: 270, category: 'Calendar', image: '/assets/img/calender.png' },
    { id: 4, name: 'Patka', price: 270, category: 'Patka', image: '/assets/img/patka.png' },
    { id: 5, name: 'Sticker', price: 270, category: 'Stickers', image: '/assets/img/sticker.png' },
    { id: 6, name: 'Flag', price: 270, category: 'Flag', image: '/assets/img/flag.png' },
    { id: 7, name: 'Badge', price: 270, category: 'Badges', image: '/assets/img/badge.png' },
    { id: 8, name: 'Pen', price: 270, category: 'Pen', image: '/assets/img/pen.png' },
    { id: 9, name: 'Mug', price: 270, category: 'Mug', image: '/assets/img/mug.png' },
];

const ProductCatalog = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Get unique categories and prepend 'All'
    const categories = ['All', ...new Set(products.map(p => p.category))];

    // Filter products based on selected category
    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        // <>
        //     <div className="breadcrumb_section" style={{ background: "url(/assets/img/shop.png)" }}>
        //         <div className="container">
        //             <div className="page_bredcrumb_title">
        //                 <h1 className="text-center">Shop</h1>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="container-fluid">
        //         <div className="row">
        //             {/* Sidebar with Categories */}
        //             <div className={`col-5 col-lg-3 ${styles.sidebar}`}>
        //                 <h4 className="mt-4 mb-3">Product Categories</h4>
        //                 <ul className="nav flex-column">
        //                     {categories.map((category) => (
        //                         <li key={category} className="nav-item">
        //                             <a 
        //                                 href="#" 
        //                                 className={`nav-link fw-bold ${
        //                                     selectedCategory === category 
        //                                         ? 'primary_color ' 
        //                                         : 'text-muted'
        //                                 }`}
        //                                 onClick={(e) => {
        //                                     e.preventDefault();
        //                                     setSelectedCategory(category);
        //                                 }}
        //                             >
        //                                 {category}
        //                             </a>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>

        //             {/* Product Grid */}
        //             <div className={`col-7 col-lg-9 ${styles.productGrid}`}>
        //                 <div className="row g-4 p-md-4">
        //                     {filteredProducts.map((product) => (
        //                         <div key={product.id} className="col-12 col-md-6 col-lg-3">
        //                             <Link href={`/shop/${product.id}`} className='text-decoration-none'>
        //                                 <div className={`card h-100 ${styles.productCard}`}>
        //                                     <img
        //                                         src={product.image}
        //                                         className="card-img p-4"
        //                                         alt={product.name}
        //                                     />
        //                                     <div className='d-flex justify-content-around'>
        //                                         <hr className='w-75' />
        //                                     </div>
        //                                     <div className="card-body text-center">
        //                                         <h5 className="card-title">{product.name}</h5>
        //                                         <p className="card-text">₹ {product.price}</p>
        //                                     </div>
        //                                 </div>
        //                             </Link>
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>
        <div className="container text-center py-5">
            <h1 className="display-4">404 - Not Found</h1>
            <p className="lead">This page is temporarily unavailable.</p>
            <Link href="/" className="btn btn-primary mt-4">Go to Homepage</Link>
        </div>
    );
};

export default ProductCatalog;