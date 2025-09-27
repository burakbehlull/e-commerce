import { RatingGroup } from "@chakra-ui/react"

const RatingUI = ({count, value, size, onValueChange, readOnly, color}) => {
  return (
    <RatingGroup.Root
		colorPalette={color}
		readOnly={readOnly}
		count={count} 
		value={value}
		onValueChange={onValueChange || null}
		size={size || "sm"}
	>
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}

export default RatingUI