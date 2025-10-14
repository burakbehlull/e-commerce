import { HStack, RadioGroup } from "@chakra-ui/react"

const RadioGroupUI = ({items, ...props}) => {
  return (
    <RadioGroup.Root {...props}>
      <HStack gap="6">
        {items?.map((item) => (
          <RadioGroup.Item key={item.value} value={item.value}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </HStack>
    </RadioGroup.Root>
  )
}

export default RadioGroupUI
