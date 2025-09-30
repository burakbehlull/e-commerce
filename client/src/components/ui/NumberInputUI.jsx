import { NumberInput } from "@chakra-ui/react"

const NumberInputUI = ({control, ...props}) => {
  return (
    <NumberInput.Root {...props}>
		<NumberInput.Input />
		{control && <NumberInput.Control /> }
	</NumberInput.Root>
  )
}

export default NumberInputUI