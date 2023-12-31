'use client'
import { Button, LinearProgress, TextField } from "@mui/material";
import { IoLogOutOutline } from 'react-icons/io5'
import { FiAlertCircle } from 'react-icons/fi'
import { useState } from 'react'
import InputAdornment from "@mui/material/InputAdornment";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import IconButton from "@mui/material/IconButton";
import styles from './styles.module.scss'
import { useSearchParams } from "next/navigation";
import Logo from '../SideMenu/tortacms.svg'
import Image from "next/image";
import { signIn } from "next-auth/react";
import axios from 'axios'
import { Prisma } from "@prisma/client";

export const LogoutButton = ({onClick}: {onClick: () => void}) => {
  return (
    <Button onClick={() => onClick()} startIcon={<IoLogOutOutline size={30} />} sx={{ color: '#52525b' }}>
      Logout
    </Button>
  )
}

export const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const callback = searchParams.get('callbackUrl')
  const [formValues, setFormValues] = useState({ username: '', password: '' })
  const [inputType, setInputType] = useState('password')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await signIn("credentials", {
      username: formValues.username,
      password: formValues.password,
      callbackUrl: '/dashboard',
      redirect: true
    })
  }
  return (
    <main className={styles.loginPage}>
      <form onSubmit={handleSubmit}>
        {loading ? <LinearProgress sx={{width: 'calc(100% + 12px)', borderRadius: '8px'}} />
        : <span aria-hidden style={{height: '4px'}}></span>}
        <div className={styles.imgLogo}>
          <Image src={Logo.src} width={80} height={80} alt='tortaCMS logo' />
          <h2>Log into <em>tortaCMS</em></h2>
        </div>
        <TextField sx={{ width: '90%' }} placeholder='Type your username...' value={formValues.username} onChange={(e) => setFormValues({ username: e.target.value, password: formValues.password })} required />
        <TextField sx={{ width: '90%' }} placeholder='Type your password...' type={inputType} value={formValues.password} onChange={(e) => setFormValues({ username: formValues.username, password: e.target.value })}
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
          }} required />
        <Button type='submit' variant='contained' sx={{ width: '90%' }}>Sign In</Button>
        {!callback ? <p className={styles.errorMsg}> </p> : <p className={styles.erroMsg}><FiAlertCircle size='16px' color='#9f1239' /> Incorrect username or password.</p>}
      </form>
    </main>
  )
}

export const RegisterForm = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '', email: '' })
  const [inputType, setInputType] = useState('password')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user: Prisma.UserCreateInput = {
      username: formValues.username,
      password: formValues.password,
      role: 'admin',
      email: formValues.email
    }
    const res = await axios.post('/api/register-first-user', user)
    await signIn("credentials", {
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
          <Image src={Logo.src} width={80} height={80} alt='tortaCMS logo' />
          <h2>Setup, <em>create your Admin account</em></h2>
        </div>
        <TextField sx={{ width: '90%' }} required placeholder='Choose your Username...' value={formValues.username} onChange={(e) => setFormValues({ ...formValues, username: e.target.value })} />
        <TextField sx={{ width: '90%' }} type='email' required placeholder='Type your e-mail...' value={formValues.email} onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} />
        <TextField sx={{ width: '90%' }} required placeholder='Type your password...' type={inputType} value={formValues.password} onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
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
        <Button type='submit' variant='contained' sx={{ width: '90%' }}>Sign In</Button>
      </form>
    </main>
  )
}