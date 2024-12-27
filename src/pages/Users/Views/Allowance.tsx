import { Box, Container, Typography } from '@mui/material';
import React from 'react'

export default function Allowance() {
    return (
        <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Box
            sx={{
              padding: 3,
              display: 'flex',
              gap: 2,
              flexDirection: 'column',
              borderWidth: 1,
              borderColor: 'gray',
              borderStyle: 'solid',
              borderRadius: 2,
            }}
          >
            <Typography fontSize={24}>Paid Casual</Typography>
            <div className="flex flex-col">
              <span>Paid</span>
              <span className="text-sm font-normal text-gray-400">Type</span>
            </div>
            <div className="flex flex-col">
              <span>07.00</span>
              <span className="text-sm font-normal text-gray-400">Allowance</span>
            </div>
            <div className="flex flex-col">
              <span>07.00</span>
              <span className="text-sm font-normal text-gray-400">Allowance</span>
            </div>
            <div className="flex flex-col">
              <span>07.00</span>
              <span className="text-sm font-normal text-gray-400">Allowance</span>
            </div>
            <div className="flex flex-col">
              <span>07.00</span>
              <span className="text-sm font-normal text-gray-400">Allowance</span>
            </div>
          </Box>
        </Container>
      );
}
