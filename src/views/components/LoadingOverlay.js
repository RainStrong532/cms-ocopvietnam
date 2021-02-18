import React from 'react';
import { Spinner } from 'reactstrap'

export default function LoadingOverlay({ open }) {
    return (
        <div className={"loading overlay" + (open ? " " : " display-none")}>
            <div>
                <Spinner className="spinner" color="primary" />
            </div>
        </div>
    )
}