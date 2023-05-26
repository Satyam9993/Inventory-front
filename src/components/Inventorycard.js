import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setselectedInvChange } from '../state';
import EditInventory from './EditInventory';
import AdjustStock from './AdjustStock';

const Inventorycard = ({ inv }) => {
    
    const selectedInv = useSelector(state => state.selectedInv);
    const dispatch = useDispatch();

    const removeInvFromSelected = () => {
        dispatch(setselectedInvChange({
            invId : inv._id
        }))
    };

    return (
        <tr>
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" checked={selectedInv.includes(inv._id)} onChange={removeInvFromSelected}  type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                {inv.itemName}
            </th>
            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                {inv.code}
            </th>
            <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                {inv.category}
            </th>
            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                {inv.openstock}{" "}{inv.unit}
            </th>
            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                {0}{" "}{inv.unit}
            </th>
            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                {inv.purchaseprice*inv.openstock} ₹
            </th>
            <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                {inv.purchaseprice} ₹
            </th>
            <th scope="row" className="py-2 font-medium text-gray-900 whitespace-nowrap">
                {(inv.stockwarning && (inv.openstock <= inv.lowstockunit)) && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>}
            </th>
            <th scope="row" className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap">
                <EditInventory inv={inv}/>
            </th>
            <td className="px-2 py-2 text-right">
                <AdjustStock inv={inv} />
            </td>
        </tr>
    )
}

export default Inventorycard;
