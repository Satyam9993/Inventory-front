import React, { useState } from 'react'
import './style.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from './ImageUpload';
// import { setEmployees } from '../state';
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AddEmployeeCard = () => {
    // const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    // const token = useSelector((state) => state.token);

    const RegisterSchema = Yup.object().shape({
        itemName: Yup.string()
            .min(2, 'Should be at least 4')
            .max(16, 'Should be at most 16')
            .required('itemName is Required!!'),
        category: Yup.string().required("category is Required"),
        code: Yup.string(),
        description: Yup.string(),

        // stock details
        unit: Yup.string("Unit be number").required("unit is Required"),
        openstock: Yup.number(),
        // date
        stockwarning: Yup.boolean(),
        lowstockunit: Yup.boolean(),

        // price details
        purchaseprice: Yup.number(),
        inclusivetax: Yup.boolean(),
        taxrate: Yup.number(),
    });

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false)
    };

    const handleAddInv = (values) => {
        console.log(values);
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
                    initialValues={{ itemName: '', category: '', code: '', description: '', lowstockunit: 0, unit: 'unit', openstock: 0, stockwarning: false, purchaseprice: 0, inclusivetax: false, taxrate: NaN }}
                    validationSchema={RegisterSchema}
                    onSubmit={(values) => {
                        handleAddInv(values);
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
                                                    <p className="text-2xl font-bold mb-2">Genral Detail</p>
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
                                                                    className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
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
                                                    <p className="text-2xl font-bold mb-2">Stock Items</p>
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
                                                            <div className="relative w-1/2">
                                                                <select
                                                                    id="unit"
                                                                    className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                    name="item"
                                                                    onChange={handleChange('unit')}
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
                                                            {touched.unit && errors.unit && (
                                                                <p className="text-[#ff0d10]">
                                                                    {errors.unit}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="p-2 w-full">
                                                            <div className="relative">
                                                                <label
                                                                    htmlFor="name"
                                                                    className="block dark:bg-[#000226] font-medium mb-2 text-gray-400"
                                                                >
                                                                    Open Stock ({values.unit.toUpperCase()})
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
                                                        <div className="p-2 w-full">
                                                            <div className="relative">

                                                                <label className="relative inline-flex items-center cursor-pointer">
                                                                    <input type="checkbox" value={true} checked={values.stockwarning} className="sr-only peer" onChange={handleChange('stockwarning')} />
                                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable Low Stock Warning.</span>
                                                                </label>

                                                            </div>
                                                        </div>
                                                        {values.stockwarning && <div className="p-2 w-1/2">
                                                            <div className="relative">
                                                                <label
                                                                    htmlFor="name"
                                                                    className="block dark:bg-[#000226] font-medium mb-2 text-gray-400"
                                                                >
                                                                    Low Stock ({values.unit.toUpperCase()})
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="lowstockunit"
                                                                    name="lowstockunit"
                                                                    className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 pt-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                    value={values.lowstockunit}
                                                                    onChange={handleChange('lowstockunit')}
                                                                />
                                                            </div>
                                                            {touched.lowstockunit && errors.lowstockunit && (
                                                                <p className="text-[#ff0d10]">
                                                                    {errors.lowstockunit}
                                                                </p>
                                                            )}
                                                        </div>}
                                                        <div className='border-2 border-gray-300 w-full py-6 px-2'>
                                                            <div className='text-xl text-gray-200'>
                                                                <p>Pricing detail</p>
                                                            </div>
                                                            <div className="p-2 w-full flex">
                                                                <div className="relative w-1/2 mr-5">
                                                                    <label
                                                                        htmlFor="purchaseprice"
                                                                        className="block dark:bg-[#000226] font-medium mb-2 text-gray-400"
                                                                    >
                                                                        Purchase Price (₹)
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="purchaseprice"
                                                                        name="purchaseprice"
                                                                        className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                        value={values.purchaseprice}
                                                                        onChange={handleChange('purchaseprice')}
                                                                    />
                                                                    {touched.purchaseprice && errors.purchaseprice && (
                                                                        <p className="text-[#ff0d10]">
                                                                            {errors.purchaseprice}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <div className="relative w-1/2 mt-10">
                                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                                        <input type="checkbox" value={true} checked={values.inclusivetax} className="sr-only peer" onChange={handleChange('inclusivetax')} />
                                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Inclusive Tax</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="p-2 w-1/2">
                                                                <div className="relative">
                                                                    <select
                                                                        id="taxrate"
                                                                        className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                        name="taxrate"
                                                                        onChange={handleChange('taxrate')}
                                                                    >
                                                                        <option>GST Tax Rate (%)</option>
                                                                        <option value="NaN">None</option>
                                                                        <option value="0">GST @ 0%</option>
                                                                        <option value="0.1">GST @ 0.1%</option>
                                                                        <option value="0.25">GST @ 0.25%</option>
                                                                        <option value="3">GST @ 3%</option>
                                                                        <option value="5">GST @ 5%</option>
                                                                        <option value="12">GST @ 12%</option>
                                                                    </select>
                                                                </div>
                                                                {touched.taxrate && errors.taxrate && (
                                                                    <p className="text-[#ff0d10]">
                                                                        {errors.taxrate}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex mt-4 w-full">
                                                            <div className="w-full mb-5">
                                                                <button
                                                                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                                                                    onClick={() => {
                                                                        handleSubmit()
                                                                    }}
                                                                    type='submit'
                                                                >
                                                                    Login NOW
                                                                </button>
                                                            </div>
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