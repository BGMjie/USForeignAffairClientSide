import React, { useState } from 'react'

interface Props {
  label: string
}

const DateSlicer: React.FC<Props> = ({ label }) => {
  const [selectedDate, setSelectedDate] = useState<string>('')

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value)
  }

  return (
    <div>
      <label htmlFor="date-slicer">{label}</label>
      <input type="date" id="date-slicer" value={selectedDate} onChange={handleDateChange} />
    </div>
  )
}

export default DateSlicer
