import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProviderDashboard() {

const { providerId } = useParams

  return (
    <div>
      ProviderDashboard
    </div>
  )
}
