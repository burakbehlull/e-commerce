import { Checkbox  } from "@chakra-ui/react"

const CheckboxUI = ({label, ...props}) => {
  return (
    <Checkbox.Root {...props}>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label>{label}</Checkbox.Label>
    </Checkbox.Root>
  )
}

export default CheckboxUI