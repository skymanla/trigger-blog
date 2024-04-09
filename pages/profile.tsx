import * as React from 'react';
import {PageSEO} from "../components/SEO";
import siteMetadata from "../data/siteMetaData";
import {toStringByFormatting} from "../lib/date-format"

function get_working_day() {
    const startWork: Date = new Date("2013-05-01")
    return toStringByFormatting(startWork)
}

export default function profile() {
    return (
        <>
            <PageSEO title={"profile"} description={siteMetadata.description} />
        </>
    )
}