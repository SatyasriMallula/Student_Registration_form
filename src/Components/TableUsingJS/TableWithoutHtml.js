import React from 'react'
import { heading } from './TableData'
import { data } from './TableData'
export const TableWithoutHtml = () => {
    return (
        <div style={{
            marginLeft: "10%"
        }}>
            <h1 style={{ marginRight: "40%" }}>Table WithOut HTML</h1>
            <div style={{ border: "1px solid black", width: "60%", display: "flex" }}>
                {heading.map((item, index) => {
                    //th using div 
                    return <div key={index} style={{ borderLeft: "1px solid black", width: "20%", fontWeight: "bolder", padding: "10px" }}>{item}</div>
                })}
            </div>

            {
                data.map((item) => {
                    //table data using div
                    return <div style={{ border: "1px solid black", width: "60%", display: "flex" }}>
                        <div key={item.id} style={{ borderLeft: "1px solid black", width: "20%", padding: "10px" }}>{item.id}</div>
                        <div key={item.id} style={{ borderLeft: "1px solid black", width: "20%", padding: "10px" }}>{item.name}</div>
                        <div key={item.id} style={{ borderLeft: "1px solid black", width: "20%", padding: "10px" }}>{item.age}</div>
                        <div key={item.id} style={{ borderLeft: "1px solid  black", width: "20%", padding: "10px" }}>{item.email}</div>
                        <div key={item.id} style={{ borderLeft: "1px solid black", width: "20%", padding: "10px" }}>{item.phone}</div>
                    </div>


                })
            }
        </div >

    )
}
