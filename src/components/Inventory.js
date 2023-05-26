import React, { useEffect, useState } from 'react'
import InventoryCard from './Inventorycard'
import { useDispatch, useSelector } from 'react-redux';
import { setselectedInvAll, setselectedRemoveAll } from '../state';

const Inventory = () => {
    const selectedInv = useSelector(state => state.selectedInv);
    const invtory = useSelector(state => state.inv);
    const inventory = useSelector(state => state.inv);
    const [isSelectedAll, setisSelectedAll] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        setisSelectedAll(selectedAllInventory())
    }, [selectedInv])

    useEffect(() => {
        setisSelectedAll(selectedAllInventory())
    }, [invtory])




    const selectedAllInventory = () => {
        if (selectedInv.length === invtory.length) {
            return true;
        } else {
            return false;
        }
    };

    const selectAll = (e) => {
        dispatch(setselectedInvAll());
    };
    const removeAll = (e) => {
        dispatch(setselectedRemoveAll());
    };
    return (
        <div className='h-[550px] overflow-y-scroll mx-1'>
            <div className="mx-auto border-y-2">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-lef">
                        <thead className="text-xs uppercase">
                            <tr>
                                <th scope="col" className="px-4 py-3">
                                    {isSelectedAll===true ? <div className="flex items-center">
                                        <input id="checkbox" type="checkbox" checked={true} onChange={removeAll} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div> : <div className="flex items-center">
                                        <input id="checkbox" type="checkbox" checked={false} onChange={selectAll} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>}
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Item Name
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Item Code
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Stock Quantity
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Stock on hold
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Stock Value
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Purchase Value
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory?.map((inv) => (
                                <InventoryCard inv={inv} key={inv._id} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Inventory
