import { RatingUI } from '@ui'
import { useState } from 'react'

function Home() {
	const [valuee, setValuee] = useState(0)
    return (
        <>
            Home {valuee}
			<RatingUI 
			value={valuee} 
			count={5}
			onValueChange={(e)=> setValuee(e.value)}
				
			/>
        </>
    )
}

export default Home;