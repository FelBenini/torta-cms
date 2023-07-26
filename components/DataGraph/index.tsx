'use client'
import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js'
import styles from './styles.module.scss'
import axios from 'axios'
import bytesToSize from '@/lib/byte-size'

Chart.register(ArcElement, Tooltip, Legend);

const DataGraph = () => {
  const [info, setInfo] = useState({
    sizeOfImg: 0,
    sizeOfDb: 0,
    total: 0
  })
  const fetchData = async () => {
    const {data} = await axios.get('/api/size-of-data')
    const totalPostgres = data.postgresSize.userCollection + data.postgresSize.postCollection + data.postgresSize.categoryCollection
    setInfo({sizeOfImg: data.sizeOfImg, sizeOfDb: totalPostgres, total: data.total})
  }
  useEffect(() => {
    fetchData()
  }, [])
  const data = {
    labels: [`Images Collection: ${bytesToSize(info.sizeOfImg)}`, `Database: ${bytesToSize(info.sizeOfDb)}`],
    datasets: [
      {
        label: 'Bytes used',
        data: [info.sizeOfImg, info.sizeOfDb],
        backgroundColor: [
          '#86198f',
          '#c026d3',
          '#f9a8d4',
        ],
        borderColor: [
          '#86198f',
          '#c026d3',
          '#f9a8d4',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom"
      },
    },
  };
  return (
    <div className={styles.graphSection}>
      <h2>Size of Data</h2>
        {/*@ts-ignore*/}
        <Pie data={data} options={options} />
      <h3>Total size: {bytesToSize(info.total)}</h3>
    </div>
  )
}

export default DataGraph