import React from "react";
import { Link } from "react-router-dom";
import "./Error404.css"

export default function Error(){
    return (
        <div id="errorcomponent">
            <Link to="/home">
            <button className="btn-404">Go back</button>
            </Link>
        </div>
    )
}