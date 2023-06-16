import { signOut } from "next-auth/react";
import { Button, TextField } from "@mui/material";
import { IoLogOutOutline } from 'react-icons/io5'
import { useState } from 'react'

export const LogoutButton = () => {
  return (
    <Button onClick={() => signOut()} startIcon={<IoLogOutOutline size={30}/>} sx={{color: '#52525b'}}>
      Logout
    </Button>
  )
}

export const LoginForm = () => {
  const [formValues, setFormValues] = useState({username: '', password: ''})
  return (
    <main>
      <form>
        <TextField />
      </form>
    </main>
  )
}