import React from 'react';
import {Spinner} from 'reactstrap'

export default function  LoadingScreen({}){
    return(
        <div className="loading">
            <Spinner className="spinner" color="primary" />
        </div>
    )
}