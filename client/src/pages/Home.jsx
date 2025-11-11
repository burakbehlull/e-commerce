import { useState } from 'react'

import { ProductCard, ProductsBar } from '@components'

function Home() {
	const [valuee, setValuee] = useState(0)
    return (
        <>
			
			<ProductsBar header="Today's" label="Products">
				<ProductCard
					name="Disc x64" price="15$" ratingCount="31" discountBadgeText="-%35"
					oldPrice="150"
					image="https://cdn.discordapp.com/attachments/1287336506008141907/1421472653788577802/image.png?ex=68da7a92&is=68d92912&hm=b22c6dd640d856caf331a0b77e30926f98c7622c2a37a668f9f83c9d9960fe89&"
				/>
				
				<ProductCard
					name="Disc x64" price="15$" ratingCount="31" discountBadgeText="-%35"
					oldPrice="150"
					image="https://cdn.discordapp.com/attachments/1287336506008141907/1421472653788577802/image.png?ex=68da7a92&is=68d92912&hm=b22c6dd640d856caf331a0b77e30926f98c7622c2a37a668f9f83c9d9960fe89&"
				/>
				
				<ProductCard
					name="Disc x64" price="15$" ratingCount="31" discountBadgeText="-%35"
					oldPrice="150"
					image="https://cdn.discordapp.com/attachments/1287336506008141907/1421472653788577802/image.png?ex=68da7a92&is=68d92912&hm=b22c6dd640d856caf331a0b77e30926f98c7622c2a37a668f9f83c9d9960fe89&"
				/>
			</ProductsBar>
        </>
    )
}

export default Home;