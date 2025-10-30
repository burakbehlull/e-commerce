"use client"

import { createListCollection, Portal, Select } from "@chakra-ui/react"

const SelectUI = ({title, setValue,value, items, ...props}) => {
    const frameworks = createListCollection({
        items
    })
    return (
        <Select.Root collection={frameworks} size="sm" width="320px"  value={value}
        onValueChange={(e) => setValue(e.value)} {...props}>
            <Select.HiddenSelect />
            {title && <Select.Label>{title}</Select.Label>}
            <Select.Control>
                <Select.Trigger>
                <Select.ValueText placeholder="Select framework" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                <Select.Content zIndex={99999999}>
                    {frameworks?.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                        {item.label}
                        <Select.ItemIndicator />
                    </Select.Item>
                    ))}
                </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}

export default SelectUI