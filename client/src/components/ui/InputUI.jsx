import { Field, Input, InputGroup } from "@chakra-ui/react"

const InputUI = ({required=false, label, helperText, errorText, group, ...props}) => {
  return (
    <Field.Root required={required}>
	  {label && <Field.Label>
		  {label} <Field.RequiredIndicator />
      </Field.Label>}
	  
	  {group ?
		<InputGroup {...group}>
			<Input {...props} />
		</InputGroup> : 
		<Input {...props} />
	  }
	  
	  
	  {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}

    </Field.Root>
  )
}

export default InputUI