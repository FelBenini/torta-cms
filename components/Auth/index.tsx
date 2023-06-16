'use client'
import { signOut } from "next-auth/react";
import { Button, TextField } from "@mui/material";
import { IoLogOutOutline } from 'react-icons/io5'
import { useState } from 'react'
import InputAdornment from "@mui/material/InputAdornment";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import IconButton from "@mui/material/IconButton";
import styles from './styles.module.scss'
import Logo from '../SideMenu/tortacms.svg'
import Image from "next/image";
import { signIn } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <Button onClick={() => signOut()} startIcon={<IoLogOutOutline size={30} />} sx={{ color: '#52525b' }}>
      Logout
    </Button>
  )
}

export const LoginForm = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' })
  const [inputType, setInputType] = useState('password')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn("credentials", {
      username: formValues.username,
      password: formValues.password,
      callbackUrl: '/dashboard',
      redirect: true
    })
  }
  return (
    <main className={styles.loginPage}>
      <form onSubmit={handleSubmit}>
        <div className={styles.imgLogo}>
          <Image src={Logo.src} width={80} height={80} alt='tortaCMS logo'/>
          <h2>Log into <em>tortaCMS</em></h2>
        </div>
        <TextField sx={{width: '90%'}} placeholder='Type your username...' value={formValues.username} onChange={(e) => setFormValues({ username: e.target.value, password: formValues.password })} />
        <TextField sx={{width: '90%'}} placeholder='Type your password...' type={inputType} value={formValues.password} onChange={(e) => setFormValues({ username: formValues.username, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {inputType === 'password' ?
                  <IconButton onClick={() => setInputType('text')}>
                    <AiOutlineEye />
                  </IconButton> :
                  <IconButton onClick={() => setInputType('password')}>
                    <AiOutlineEyeInvisible />
                  </IconButton>}
              </InputAdornment>
            ),
          }} />
          <Button type='submit' variant='contained' sx={{width: '90%'}}>Sign In</Button>
      </form>
    </main>
  )
}