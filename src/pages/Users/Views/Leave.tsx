import { Box, Container, Typography } from '@mui/material'
import React from 'react'

export default function Leave() {
  return (
    <Container className='flex flex-col gap-5'>
      <Box>
        <Typography sx={{fontSize: 30}}>
          Leave
        </Typography>

      </Box>
      <div className="flex justify-between border rounded-xl bg-white shadow-1 p-6 gap-6">
        <div className="border-r-2 w-full">
          <p className="text-3xl text-black">890</p>
          <p className="text-[15px] text-gray-500">Aктивные пользователи</p>
        </div>
        <div className="w-full border-r-2">
          <p className="text-3xl text-black">313/23</p>
          <p className="text-[15px] text-gray-500">Успешные/неуспешные</p>
        </div>
        <div className="w-full">
          <p className="text-3xl text-black">313/23</p>
          <p className="text-[15px] text-gray-500">Успешные/неуспешные</p>
        </div>
      </div>
    </Container>
  )
}
