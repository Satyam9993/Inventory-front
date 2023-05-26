import React, { useState } from 'react';
import './style.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setInvAddNew } from '../state/index';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdjustStock = ({ inv }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const token = useSelector((state) => state.token);

    const stockSchema = Yup.object().shape({
        description: Yup.string(),
        adjuststock: Yup.number(),
    });

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false)
    };

    const handleAddInv = async (values) => {
        try {
            const body = {
                ...values
            }
            const data = await fetch(`${BACKEND_URL}/api/inv`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(body)
                }
            );
            const InvData = await data.json();
            dispatch(setInvAddNew({
                inv: InvData.inv
            }));
            handleCloseModal();
        } catch (err) {
            alert(err);
        }
    };

    return (
        <>
            <div className="lg:flex border border-gray-300 cursor-pointer rounded-md">
                <button
                    className="text-gray-800 hover:text-blue-600 hover:bg-gray-100 text-sm  font-medium p-2 inline-flex space-x-1 items-center"
                    onClick={handleShowModal}
                >
                    Adjust Stock
                </button>
            </div>
            {showModal && (
                <Formik
                    initialValues={{ description: '', adjuststock: 0, isAdd: true }}
                    validationSchema={stockSchema}
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
                                    <div className="modal-container dark:bg-[#000226] dark:text-white mx-auto rounded shadow-lg z-50">
                                        <div className='flex flex-row edit-form p-4 sm:mt-18'>
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
                                                                <p className='font-bold'>Item Name : {inv.itemName}</p>
                                                            </div>
                                                        </div>
                                                        <div className="p-2 w-full">
                                                            <div className="relative w-1/2">
                                                                <p className='font-bold'>Stock Quantity : {inv.openstock}</p>
                                                            </div>
                                                        </div>
                                                        <div className="p-2 w-full flex">
                                                            <div className="flex items-center w-1/2">
                                                                <input id="checkbox1" checked={true} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="checkbox1" className="sr-only">checkbox</label>
                                                                <label htmlFor="checkbox1" className='text-sm ml-2 font-bold'>Add More (+)</label>
                                                            </div>
                                                            <div className="flex items-center  w-1/2">
                                                                <input id="checkbox2" checked={true} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="checkbox2" className="sr-only">Reduce</label>
                                                                <label htmlFor="checkbox2" className='text-sm ml-2 font-bold'>Reduce (-)</label>
                                                            </div>
                                                        </div>
                                                        <div className="p-2 w-full">
                                                            <div className="relative">
                                                                <label
                                                                    htmlFor="name"
                                                                    className="block dark:bg-[#000226] font-medium mb-2 text-gray-400"
                                                                >
                                                                    Adjust Stock ({inv.unit.toUpperCase()})
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="adjuststock"
                                                                    name="adjuststock"
                                                                    className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 pt-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                    value={values.adjuststock}
                                                                    onChange={handleChange('adjuststock')}
                                                                />
                                                            </div>
                                                            {touched.adjuststock && errors.adjuststock && (
                                                                <p className="text-[#ff0d10]">
                                                                    {errors.adjuststock}
                                                                </p>
                                                            )}
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
                                                                    Adjust Now
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

export default AdjustStock;