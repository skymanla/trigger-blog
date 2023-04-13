import * as React from 'react';
import {PageSEO} from "../components/SEO";
import siteMetadata from "../data/siteMetaData";


function get_working_day() {
    const startWork: Date = new Date("2013-05-01")
    return startWork.toString()
}

export default function profile() {
    return (
        <>
            <PageSEO title={"profile"} description={siteMetadata.description} />
            경력: {get_working_day()}
        </>
    )
}