import React from "react";

export function CardHeader(props){
    return (
        <div className="card-header">
            <h3 className="card-title">{props.title}</h3>
        </div>
    )
}