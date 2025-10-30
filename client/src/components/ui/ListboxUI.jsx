"use client"

import { Listbox, createListCollection } from "@chakra-ui/react"

const ListboxUI = ({title, setValue, value, items}) => {
    const frameworks = createListCollection({
        items
    })
    return (
         <Listbox.Root 
			collection={frameworks} 
			selectionMode="multiple" 
			maxW="320px"
			value={value}
			onValueChange={(e) => setValue(e.value)}
		>
		  <Listbox.Label>{title}</Listbox.Label>
		  <Listbox.Content>
			{frameworks.items.map((framework) => (
			  <Listbox.Item item={framework} key={framework.value}>
				<Listbox.ItemText>{framework.label}</Listbox.ItemText>
				<Listbox.ItemIndicator />
			  </Listbox.Item>
			))}
		  </Listbox.Content>
		</Listbox.Root>
    )
}

export default ListboxUI