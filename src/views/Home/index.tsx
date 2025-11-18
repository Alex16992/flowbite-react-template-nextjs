import React, { FC } from 'react'

interface HomeProps {
  className?: string;
}

const Home: FC<HomeProps> = ({ className }) => {
  return (
    <div className={className}>
      Home
    </div>
  )
}

export default Home;