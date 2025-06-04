import React from "react";
const AccordionItem = ({title, patientValue, otherValue, isEditable, showOther=true, children}) => {
    return (
        <div className={`grid ${showOther ? 'grid-cols-2': 'grid-cols'} border-b border-gray-300`}>
            <div className="bg-blue-100 px-2 py-1 flex flex-col ">
                <span className="text-gray-400 text-xs">{title}:</span>
                <span className="text-black">{patientValue}</span>
            </div>
            {
                showOther ?
                    <div className="px-2 py-1">
                        {
                            isEditable ? 
                            children
                            :
                                <p className="text-gray-300 ">{otherValue}</p>
                        }
                    </div>
                :null
            }
            
        </div>
    );
        
}

export default AccordionItem;