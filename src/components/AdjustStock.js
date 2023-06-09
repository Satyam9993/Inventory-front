import React, { useState } from 'react';
import './style.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setInvUpdate } from '../state/index';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdjustStock = ({ inv }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const token = useSelector((state) => state.token);

    const stockSchema = Yup.object().shape({
        remark: Yup.string(),
        adjuststock: isAdd?Yup.number().min(0, "Cannot be negitive"):Yup.number().min(0, "Cannot be negitive").max(inv.openstock),
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
                ...values,
                isAdd : isAdd,
                openstock: inv.openstock
            }
            const data = await fetch(`${BACKEND_URL}/api/inv/adjust/${inv._id}`,
                {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(body)
                }
            );
            const InvData = await data.json();
            dispatch(setInvUpdate({
                invUpdate : InvData.inv
            }));
            handleCloseModal();
        } catch (err) {
            console.log(err);
            alert(err);
        }
    };

    return (
        <>
            <div className="lg:flex cursor-pointer">
                <button
                    className="text-gray-800 hover:text-blue-600 hover:bg-gray-100 rounded-md text-sm border border-gray-300  font-medium p-2 inline-flex items-center"
                    onClick={handleShowModal}
                >
                    Adjust Stock
                </button>
            </div>
            {showModal && (
                <Formik
                    initialValues={{ remark: '', adjuststock: 0, isAdd: true }}
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
                                    <div className=" md:w-[50%] lg:w-[45%] modal-container dark:bg-[#000226] dark:text-white mx-auto rounded shadow-lg z-50">
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
                                                                <input id="checkbox1" checked={isAdd} type="checkbox" onChange={() => setIsAdd(!isAdd)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label htmlFor="checkbox1" className="sr-only">checkbox</label>
                                                                <label htmlFor="checkbox1" className='text-sm ml-2 font-bold'>Add More (+)</label>
                                                            </div>
                                                            <div className="flex items-center  w-1/2">
                                                                <input id="checkbox2" checked={!isAdd} type="checkbox" onChange={() => setIsAdd(!isAdd)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                        <div className="p-2 w-full">
                                                            <div className="relative w-1/2">
                                                                {isAdd ?
                                                                    <p className='font-bold'>Final Stock : {Number(inv.openstock) + Number(values.adjuststock)}</p> :
                                                                    <p className='font-bold'>Final Stock : {inv.openstock - values.adjuststock}</p>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="p-2 w-full">
                                                            <div className="relative">
                                                                <textarea
                                                                    type="text"
                                                                    name="remark"
                                                                    className="w-full dark:bg-[#000226] bg-opacity-50 border-2 border-gray-400 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                                    placeholder='Remark optional'
                                                                    onChange={handleChange('remark')}
                                                                ></textarea>
                                                            </div>
                                                            {touched.remark && errors.remark && (
                                                                <p className="text-[#ff0d10]">
                                                                    {errors.remark}
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