import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import {PageSEO} from "@/components/SEO"
import siteMetadata from "@/interfaces/siteMetaData"

export default function PaginationOutlined() {
    return (
        <>
            <PageSEO title={"mui pagination"} description={siteMetadata.description} />
            <Stack spacing={2}>
                <Pagination count={10} variant="outlined" />
                <Pagination count={10} variant="outlined" color="primary" />
                <Pagination count={10} variant="outlined" color="secondary" />
                <Pagination count={10} variant="outlined" disabled />
            </Stack>
        </>
    )
}