import { signOut } from "next-auth/react";
import { Button } from "@mui/material";
import { IoLogOutOutline } from 'react-icons/io5'

export const LogoutButton = () => {
  return (
    <Button onClick={() => signOut()} startIcon={<IoLogOutOutline size={30}/>} sx={{color: '#52525b'}}>
      Logout
    </Button>
  )
}

export const LoginForm = () => {
  return (
    <main>
      
    </main>
  )
}