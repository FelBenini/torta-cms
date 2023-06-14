
import React from 'react'
import styles from './sidemenu.module.scss'
import Logo from './tortacms.svg'
import Image from 'next/image'
import Link from 'next/link'
import { RiListSettingsLine, RiArticleLine, RiPagesLine } from 'react-icons/ri'
import { AiOutlineCluster } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa'

const SideMenu = () => {
  return (
    <section className={styles.SideMenu}>
      <nav>
        <Image src={Logo.src} className={styles.logoSideMenu} alt='tortaCMS logo' width={60} height={60} />
        <h4>tortaCMS</h4>
      </nav>
      <nav>
        <Link href="#">
          <RiArticleLine size={40} />
          <h5>Posts</h5>
        </Link>
      </nav>
      <nav>
        <Link href="#">
          <RiPagesLine size={40} />
          <h5>Pages</h5>
        </Link>
      </nav>
      <nav>
        <Link href="#">
          <AiOutlineCluster size={40} />
          <h5>API ref</h5>
        </Link>
      </nav>
      <nav>
        <Link href="#">
          <FaRegUser size={35} />
          <h5>User</h5>
        </Link>
      </nav>
      <nav>
        <Link href="#">
          <RiListSettingsLine size={35} />
          <h5>Settings</h5>
        </Link>
      </nav>
    </section>
  )
}

export default SideMenu