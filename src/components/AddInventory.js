import React, { useState } from 'react'
import './style.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from './ImageUpload';
// import { setEmployees } from '../state';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AddEmployeeCard = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const token = useSelector((state) => state.token);
    const [location, setLocation] = useState({
        name: "India",
        lng: 78.96288,
        lat: 20.593684
    })

    const RegisterSchema = Yup.object().shape({
        adminId: Yup.number("Id should be number").required("adminId is Required"),
        password: Yup.string()
            .min(4, 'Should be at least 4')
            .max(16, 'Should be at most 16')
            .required('password is Required!!'),
        itemName: Yup.string()
            .min(4, 'Should be at least 4')
            .max(16, 'Should be at most 16')
            .required('password is Required!!'),
        description: Yup.string(),
        item: Yup.string().required('item is Required!!'),

    });

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false)
    };

    return (
        <>
            <div className="lg:flex border border-sky-500 cursor-pointer">
                <button
                    className="text-gray-200 hover:text-blue-600 text-lg  font-medium px-4 py-2 inline-flex space-x-1 items-center"
                    onClick={handleShowModal}
                >
                    <span>
                        Add
                    </span>
                </button>
            </div>
            {showModal && (
                <Formik
                    initialValues={{ itemName: '', category: '', code: '', description: '', unit: 'unit', openstock: 0 }}
                    validationSchema={RegisterSchema}
                    onSubmit={(values) => {
                        // handleLogin(values);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit
                    }) => (
                        <div>
                            <div className="fixed top-0 right-0 bottom-0 left-0 z-50 overflow-scroll sm:mt-28">
                                <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center overflow-scroll">
                                    <div
                                        className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
                                        onClick={handleCloseModal}
                                    />
                                    <div className="modal-container dark:bg-[#000226] dark:text-white w-11/12 mx-auto rounded shadow-lg z-50">
                                        <div className='flex flex-row edit-form p-4 sm:mt-18 card-st'>

                                            <div className="modal-content text-left px-6">
                                                <div className="flex flex-row justify-between">
                                                    <p className="text-2xl font-bold mb-2">Add items</p>
                                                    <div className='flex justify-center'>
                                                        <button
                                                            className="text-gray-200 hover:text-blue-600 text-sm  font-medium py-2 inline-flex space-x-1 items-center"
                                                            onClick={handleCloseModal}
                                                        >
                                                            <span>
                                                                <svg
                                                                    className="fill-current text-gray-200 hover:text-blue-600 h-7 w-7"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="lg:w-2/2 md:w-5/5 mx-auto">
                                                    <div className="flex flex-wrap">
                                                        <div className="p-2 w-full">
                                                            <ImageUpload />
                                                        </div>
                                                        <div className="p-2 w-full">
                                                            <div className="relative">
                                                                <input
                                                                    type="text"
                                                                    id="itemName"
                                                                    name="itemName"
                                                                    className="w-full dark:bg-[#000226] bg-opacity-50 text-gray-200 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                    placeholder='Item Name'
                                                                    onChange={handleChange('itemName')}
                                                                />
                                                            </div>
                                                            {touched.itemName && errors.itemName && (
                                                                <p className="text-[#ff0d10]">
                                                                    {errors.itemName}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="p-2 w-full">
                                                            <div className="relative">
                                                                <select
                                                                    id="category"
                                                                    className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                    name="category"
                                                                    onChange={handleChange('category')}
                                                                >
                                                                    <option>Category</option>
                                                                    <option value="Panel">Panel</option>
                                                                    <option value="Inverter">Inverter</option>
                                                                    <option value="Wire">Wire</option>
                                                                    <option value="MC4 Connector">MC4 Connector</option>
                                                                    <option value="others">others</option>
                                                                </select>
                                                            </div>
                                                            {touched.category && errors.category && (
                                                                <p className="text-[#ff0d10]">
                                                                    {errors.category}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="p-2 w-full flex">
                                                            <div className="relative w-3/5">
                                                                <input
                                                                    type="text"
                                                                    id="code"
                                                                    name="code"
                                                                    className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                    placeholder='Item Code'
                                                                    onChange={handleChange('code')}
                                                                />
                                                            </div>
                                                            {touched.code && errors.code && (
                                                                <p className="text-[#ff0d10]">
                                                                    {errors.code}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="p-2 w-full flex">
                                                            <div className="relative w-full">
                                                                <textarea
                                                                    type="text"
                                                                    id="description"
                                                                    name="description"
                                                                    className="w-full dark:bg-[#000226] bg-opacity-50 border-2 border-gray-400 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                    placeholder='Item Description'
                                                                    onChange={handleChange('description')}
                                                                ></textarea>
                                                            </div>
                                                            {touched.description && errors.description && (
                                                                <p className="text-[#ff0d10]">
                                                                    {errors.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="modal-content text-left px-6">
                                                <div className="flex flex-row justify-between">
                                                    <p className="text-2xl font-bold mb-2">Add items</p>
                                                    <div className='flex justify-center'>
                                                        <button
                                                            className="text-gray-200 hover:text-blue-600 text-sm  font-medium py-2 inline-flex space-x-1 items-center"
                                                            onClick={handleCloseModal}
                                                        >
                                                            <span>
                                                                <svg
                                                                    className="fill-current text-gray-200 hover:text-blue-600 h-7 w-7"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="lg:w-2/2 md:w-5/5 mx-auto">
                                                    <div className="flex flex-wrap">
                                                        <div className="p-2 w-full">
                                                            <div className='flex'>
                                                                <div className="relative w-1/2">
                                                                    <select
                                                                        id="item"
                                                                        className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                        name="item"
                                                                        onChange={handleChange('item')}
                                                                    >
                                                                        <option value="unit">Units(UNT)</option>
                                                                        <option value="feet">Feet(FT)</option>
                                                                        <option value="feet">Inches(IN)</option>
                                                                        <option value="pieces">Pieces(PCS)</option>
                                                                        <option value="number">Number(NOM)</option>
                                                                        <option value="millimeter">Millimeter(MM)</option>
                                                                        <option value="number">Centimeter(CMS)</option>
                                                                        <option value="number">Meter(CMS)</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="p-2 w-full">
                                                                <div className="relative">
                                                                    <label
                                                                        htmlFor="name"
                                                                        className="block dark:bg-[#000226] font-medium mb-2 text-gray-700"
                                                                    >
                                                                        Open Stock
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="openstock"
                                                                        name="openstock"
                                                                        className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 pt-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                        value={values.openstock}
                                                                        onChange={handleChange('openstock')}
                                                                    />
                                                                </div>
                                                                {touched.openstock && errors.openstock && (
                                                                    <p className="text-[#ff0d10]">
                                                                        {errors.openstock}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="p-2 w-full">
                                                            <div className="relative">
                                                                <input
                                                                    type="text"
                                                                    id="itemName"
                                                                    name="itemName"
                                                                    className="w-full dark:bg-[#000226] bg-opacity-50 text-gray-200 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                    placeholder='Item Name'
                                                                    onChange={handleChange('itemName')}
                                                                />
                                                            </div>
                                                            {touched.itemName && errors.itemName && (
                                                                <p className="text-[#ff0d10]">
                                                                    {errors.itemName}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="p-2 w-full">
                                                            <div className="relative w-3/5">
                                                                <input
                                                                    type="text"
                                                                    id="code"
                                                                    name="code"
                                                                    className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                    placeholder='Item Code'
                                                                    onChange={handleChange('code')}
                                                                />
                                                            </div>
                                                            {touched.code && errors.code && (
                                                                <p className="text-[#ff0d10]">
                                                                    {errors.code}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="p-2 w-full flex">
                                                            <div className="relative w-full">
                                                                <textarea
                                                                    type="text"
                                                                    id="description"
                                                                    name="description"
                                                                    className="w-full dark:bg-[#000226] bg-opacity-50 border-2 border-gray-400 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                    placeholder='Item Description'
                                                                    onChange={handleChange('description')}
                                                                ></textarea>
                                                            </div>
                                                            {touched.description && errors.description && (
                                                                <p className="text-[#ff0d10]">
                                                                    {errors.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Formik>

            )}
        </>
    )
}

export default AddEmployeeCard