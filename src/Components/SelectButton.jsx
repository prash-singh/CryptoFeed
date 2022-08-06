import React from 'react'
import './SelectedButton.css'
function SelectButton({children, selected, onClick}) {
    return (
        <span onClick={onClick} className="button" style={{backgroundColor: selected?"gold":"", color: selected?"black":""}}>
            {children}
        </span>
    )
}

export default SelectButton