import { Flex, RadioGroup } from "@chakra-ui/react"

const RadioGroupUI = ({items, nestedStyle, ...props}) => {
  return (
    <RadioGroup.Root {...props}>
      <Flex gap="6" {...nestedStyle}>
        {items?.map((item) => (
          <RadioGroup.Item key={item.value} value={item.value} display="flex" direction="column">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </Flex>
    </RadioGroup.Root>
  )
}

export default RadioGroupUI
