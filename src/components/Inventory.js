import React, { useState } from 'react'
import InventoryCard from './Inventorycard'
import { useDispatch, useSelector } from 'react-redux';

const Inventory = () => {
    const [text, setText] = useState("")
    const todoList = useSelector(state => state.todo);
    const dispatch = useDispatch();

    const AddTodo = () => {
        if (text) {
            // dispatch(setAddTodo({ todo: text }));
            setText("");
        }
    };

    const changetext = (e) => {
        setText(e.target.value)
    }
    return (
        <div className='h-[550px] overflow-y-scroll mx-1'>
            <div className="mx-auto border-y-2">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-lef">
                        <thead className="text-xs uppercase">
                            <tr>
                                <th scope="col" className="px-4 py-3">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Item Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Item Code
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Stock Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Stock on hold
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Stock Value
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Purchase Value
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <InventoryCard />
                            <InventoryCard />
                            <InventoryCard />
                            <InventoryCard />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Inventory
